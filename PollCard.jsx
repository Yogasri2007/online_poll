import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatDate } from '../../utils/date.js';
import { FaClock, FaStar, FaChartBar } from 'react-icons/fa';

export default function PollCard({ poll, onBookmark, bookmarked }) {
  const expired = new Date(poll.expiry) < new Date();
  const totalVotes = poll.slots.reduce((sum, slot) => sum + slot.votes, 0);
  return (
    <motion.article className="poll-card glass-card shadow-sm" whileHover={{ y: -6 }}>
      <div className="poll-card-image" style={{ backgroundImage: `linear-gradient(180deg, rgba(124,58,237,.4), rgba(15,23,42,.8)), url(${poll.banner})` }}>
        <span className={`badge ${expired ? 'badge-danger' : 'badge-success'}`}>{expired ? 'Expired' : 'Active'}</span>
      </div>
      <div className="poll-card-body">
        <div className="poll-card-meta">
          <span>{poll.category}</span>
          <span>{formatDate(poll.createdAt)}</span>
        </div>
        <h4>{poll.title}</h4>
        <p>{poll.description}</p>
        <div className="poll-card-stats">
          <span><FaChartBar /> {totalVotes} votes</span>
          <span><FaClock /> {formatDate(poll.expiry)}</span>
        </div>
        <div className="poll-card-actions">
          <Link to={`/poll/${poll.id}`} className="btn btn-primary btn-sm">
            Open Poll
          </Link>
          <button type="button" className={`btn btn-soft btn-sm ${bookmarked ? 'active' : ''}`} onClick={() => onBookmark(poll.id)}>
            <FaStar /> {bookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
