import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext.jsx';
import { storage } from '../../services/storage.js';
import { formatDate } from '../../utils/date.js';

export default function Profile() {
  const { user, refreshUser } = useAuth();
  const [polls] = useState(storage.getAllPolls());

  const ownPolls = useMemo(() => polls.filter((poll) => poll.creatorId === user.id), [polls, user.id]);

  if (!user) return null;

  return (
    <motion.main className="page-shell profile-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="glass-card profile-card shadow-sm">
        <div className="profile-top">
          <div className="avatar-large">{user.avatar}</div>
          <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <span>Member since {formatDate(user.createdAt)}</span>
          </div>
        </div>
        <div className="profile-stats grid-3">
          <div>
            <span>{ownPolls.length}</span>
            <small>Polls created</small>
          </div>
          <div>
            <span>{user.stats.votes}</span>
            <small>Votes cast</small>
          </div>
          <div>
            <span>{user.stats.bookmarks}</span>
            <small>Bookmarks</small>
          </div>
        </div>
      </section>
      <section className="glass-card own-polls-card shadow-sm">
        <h3>Your polls</h3>
        {ownPolls.length === 0 ? (
          <p className="text-muted">You haven’t created any polls yet — start one now on the Create Poll page.</p>
        ) : (
          <div className="profile-polls">
            {ownPolls.map((poll) => (
              <div key={poll.id} className="mini-poll-card">
                <strong>{poll.title}</strong>
                <span>{poll.category}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </motion.main>
  );
}
