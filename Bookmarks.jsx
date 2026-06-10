import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext.jsx';
import { storage } from '../../services/storage.js';
import PollCard from '../../components/PollCard/PollCard.jsx';
import EmptyState from '../../components/Common/EmptyState.jsx';

export default function Bookmarks() {
  const { user, refreshUser } = useAuth();
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    setPolls(storage.getAllPolls());
  }, []);

  const bookmarked = polls.filter((poll) => user?.bookmarks.includes(poll.id));

  const handleBookmark = (pollId) => {
    storage.toggleBookmark(pollId, user.id);
    setPolls(storage.getAllPolls());
    refreshUser();
  };

  return (
    <motion.main className="page-shell bookmarks-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="page-header glass-card shadow-sm">
        <div>
          <p className="eyebrow">Bookmarked polls</p>
          <h1>Your curated agenda for quick access.</h1>
        </div>
      </section>
      {bookmarked.length === 0 ? (
        <EmptyState title="No bookmarks yet" description="Bookmark your favorite polls for quick access." action={<p>Browse the polls page to save the ones you care about.</p>} />
      ) : (
        <div className="polls-list grid-view">
          {bookmarked.map((poll) => (
            <PollCard key={poll.id} poll={poll} onBookmark={handleBookmark} bookmarked />
          ))}
        </div>
      )}
    </motion.main>
  );
}
