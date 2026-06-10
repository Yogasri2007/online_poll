import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import PollCard from '../../components/PollCard/PollCard.jsx';
import { storage } from '../../services/storage.js';
import { useAuth } from '../../context/AuthContext.jsx';
import EmptyState from '../../components/Common/EmptyState.jsx';

export default function Polls() {
  const { user, refreshUser } = useAuth();
  const [polls, setPolls] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('active');
  const [sort, setSort] = useState('latest');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    setPolls(storage.getAllPolls());
  }, []);

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    const now = new Date();
    return polls
      .filter((poll) => poll.title.toLowerCase().includes(query) || poll.category.toLowerCase().includes(query) || poll.tags.join(' ').toLowerCase().includes(query))
      .filter((poll) => {
        if (filter === 'active') return new Date(poll.expiry) > now;
        if (filter === 'expired') return new Date(poll.expiry) <= now;
        if (filter === 'trending') return poll.votesCount > 10;
        return true;
      })
      .sort((a, b) => {
        if (sort === 'latest') return new Date(b.createdAt) - new Date(a.createdAt);
        if (sort === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
        if (sort === 'votes') return b.votesCount - a.votesCount;
        if (sort === 'alpha') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [polls, search, filter, sort]);

  const handleBookmark = (pollId) => {
    storage.toggleBookmark(pollId, user.id);
    setPolls(storage.getAllPolls());
    refreshUser();
  };

  const bookmarked = user?.bookmarks || [];

  return (
    <motion.main className="page-shell polls-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="page-header glass-card shadow-sm">
        <div>
          <p className="eyebrow">Explore polls</p>
          <h1>Your shared scheduling workspace</h1>
        </div>
        <div className="filter-controls">
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title, category, tags" />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="trending">Trending</option>
            <option value="all">All</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="votes">Most Votes</option>
            <option value="alpha">Alphabetical</option>
          </select>
          <button type="button" className="btn btn-soft" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>{viewMode === 'grid' ? 'List view' : 'Grid view'}</button>
        </div>
      </section>
      {filtered.length === 0 ? (
        <EmptyState title="No matching polls" description="Try different keywords or create a new poll to get started." action={<button type="button" className="btn btn-primary" onClick={() => setSearch('')}>Reset Search</button>} />
      ) : (
        <div className={`polls-list ${viewMode}`}>
          {filtered.map((poll) => (
            <PollCard key={poll.id} poll={poll} onBookmark={handleBookmark} bookmarked={bookmarked.includes(poll.id)} />
          ))}
        </div>
      )}
    </motion.main>
  );
}
