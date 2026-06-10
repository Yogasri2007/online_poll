import { v4 as uuid } from 'uuid';

const STORAGE_KEYS = {
  users: 'timesync_users',
  polls: 'timesync_polls',
  current: 'timesync_current_user',
  notifications: 'timesync_notifications',
  theme: 'timesync_theme',
};

const defaultState = () => ({
  users: [],
  polls: [],
  notifications: [],
});

const read = (key) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : null;
};

const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const getAll = (key) => read(key) || [];

export const storage = {
  getTheme: () => read(STORAGE_KEYS.theme),
  setTheme: (theme) => write(STORAGE_KEYS.theme, theme),
  getCurrentUser: () => {
    const currentId = localStorage.getItem(STORAGE_KEYS.current);
    if (!currentId) return null;
    const user = getAll(STORAGE_KEYS.users).find((item) => item.id === currentId);
    return user || null;
  },
  setCurrentUser: (id) => localStorage.setItem(STORAGE_KEYS.current, id),
  clearCurrentUser: () => localStorage.removeItem(STORAGE_KEYS.current),
  findUser: (email, password) => getAll(STORAGE_KEYS.users).find((user) => user.email === email && user.password === password),
  findUserByEmail: (email) => getAll(STORAGE_KEYS.users).find((user) => user.email === email),
  createUser: ({ name, email, password }) => {
    const users = getAll(STORAGE_KEYS.users);
    const newUser = {
      id: uuid(),
      name,
      email,
      password,
      avatar: name.charAt(0).toUpperCase(),
      stats: { polls: 0, votes: 0, comments: 0, bookmarks: 0 },
      bookmarks: [],
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    write(STORAGE_KEYS.users, users);
    return newUser;
  },
  saveUser: (user) => {
    const users = getAll(STORAGE_KEYS.users).map((item) => (item.id === user.id ? user : item));
    write(STORAGE_KEYS.users, users);
  },
  getAllPolls: () => getAll(STORAGE_KEYS.polls),
  getPoll: (id) => getAll(STORAGE_KEYS.polls).find((poll) => poll.id === id),
  createPoll: (poll) => {
    const polls = getAll(STORAGE_KEYS.polls);
    const newPoll = { ...poll, id: uuid(), createdAt: new Date().toISOString(), votesCount: 0, comments: [], reactions: { like: 0, love: 0, fire: 0, party: 0, clap: 0 }, bookmarks: [], activity: [] };
    polls.unshift(newPoll);
    write(STORAGE_KEYS.polls, polls);
    return newPoll;
  },
  updatePoll: (id, updates) => {
    const polls = getAll(STORAGE_KEYS.polls).map((poll) => (poll.id === id ? { ...poll, ...updates } : poll));
    write(STORAGE_KEYS.polls, polls);
    return polls.find((poll) => poll.id === id);
  },
  deletePoll: (id) => {
    const polls = getAll(STORAGE_KEYS.polls).filter((poll) => poll.id !== id);
    write(STORAGE_KEYS.polls, polls);
  },
  votePoll: (pollId, slotIds, voter) => {
    const polls = getAll(STORAGE_KEYS.polls).map((poll) => {
      if (poll.id !== pollId) return poll;
      const updatedSlots = poll.slots.map((slot) => ({
        ...slot,
        votes: slotIds.includes(slot.id) ? slot.votes + 1 : slot.votes,
      }));
      return {
        ...poll,
        slots: updatedSlots,
        votesCount: poll.votesCount + slotIds.length,
        activity: [{ id: uuid(), type: 'vote', user: voter.name, message: `${voter.name} voted`, createdAt: new Date().toISOString() }, ...poll.activity],
      };
    });
    write(STORAGE_KEYS.polls, polls);
  },
  addComment: (pollId, comment) => {
    const polls = getAll(STORAGE_KEYS.polls).map((poll) => {
      if (poll.id !== pollId) return poll;
      return {
        ...poll,
        comments: [{ id: uuid(), createdAt: new Date().toISOString(), likes: 0, replies: [], ...comment }, ...poll.comments],
        activity: [{ id: uuid(), type: 'comment', user: comment.author, message: `${comment.author} commented`, createdAt: new Date().toISOString() }, ...poll.activity],
      };
    });
    write(STORAGE_KEYS.polls, polls);
  },
  updateComment: (pollId, commentId, updates) => {
    const polls = getAll(STORAGE_KEYS.polls).map((poll) => {
      if (poll.id !== pollId) return poll;
      return {
        ...poll,
        comments: poll.comments.map((comment) => (comment.id === commentId ? { ...comment, ...updates } : comment)),
      };
    });
    write(STORAGE_KEYS.polls, polls);
  },
  deleteComment: (pollId, commentId) => {
    const polls = getAll(STORAGE_KEYS.polls).map((poll) => {
      if (poll.id !== pollId) return poll;
      return {
        ...poll,
        comments: poll.comments.filter((comment) => comment.id !== commentId),
      };
    });
    write(STORAGE_KEYS.polls, polls);
  },
  addReaction: (pollId, reaction, user) => {
    const polls = getAll(STORAGE_KEYS.polls).map((poll) => {
      if (poll.id !== pollId) return poll;
      return {
        ...poll,
        reactions: { ...poll.reactions, [reaction]: (poll.reactions[reaction] || 0) + 1 },
        activity: [{ id: uuid(), type: 'reaction', user: user.name, message: `${user.name} reacted`, createdAt: new Date().toISOString() }, ...poll.activity],
      };
    });
    write(STORAGE_KEYS.polls, polls);
  },
  toggleBookmark: (pollId, userId) => {
    const users = getAll(STORAGE_KEYS.users).map((user) => {
      if (user.id !== userId) return user;
      const hasBookmark = user.bookmarks.includes(pollId);
      const bookmarks = hasBookmark ? user.bookmarks.filter((id) => id !== pollId) : [pollId, ...user.bookmarks];
      return { ...user, bookmarks, stats: { ...user.stats, bookmarks: bookmarks.length } };
    });
    write(STORAGE_KEYS.users, users);
    const currentId = localStorage.getItem(STORAGE_KEYS.current);
    if (currentId) {
      const updatedCurrent = users.find((current) => current.id === currentId);
      if (updatedCurrent) {
        localStorage.setItem(STORAGE_KEYS.current, updatedCurrent.id);
      }
    }
  },
  exportData: () => {
    return JSON.stringify({ users: getAll(STORAGE_KEYS.users), polls: getAll(STORAGE_KEYS.polls), notifications: getAll(STORAGE_KEYS.notifications) }, null, 2);
  },
  importData: (json) => {
    try {
      const data = JSON.parse(json);
      if (data.users && data.polls) {
        write(STORAGE_KEYS.users, data.users);
        write(STORAGE_KEYS.polls, data.polls);
        if (data.notifications) write(STORAGE_KEYS.notifications, data.notifications);
        return { success: true };
      }
      return { success: false, message: 'Invalid JSON structure.' };
    } catch (error) {
      return { success: false, message: 'Unable to parse imported file.' };
    }
  },
  getNotifications: () => getAll(STORAGE_KEYS.notifications),
  addNotification: (notification) => {
    const notifications = getAll(STORAGE_KEYS.notifications);
    notifications.unshift({ id: uuid(), createdAt: new Date().toISOString(), read: false, ...notification });
    write(STORAGE_KEYS.notifications, notifications.slice(0, 20));
  },
  resetStorage: () => {
    localStorage.removeItem(STORAGE_KEYS.polls);
    localStorage.removeItem(STORAGE_KEYS.users);
    localStorage.removeItem(STORAGE_KEYS.current);
    localStorage.removeItem(STORAGE_KEYS.notifications);
    localStorage.removeItem(STORAGE_KEYS.theme);
  },
};
