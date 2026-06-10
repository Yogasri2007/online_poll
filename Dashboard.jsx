import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { storage } from '../../services/storage.js';
import { FaClipboardList, FaChartPie, FaComments, FaCog, FaPlusCircle, FaChartLine } from 'react-icons/fa';
import { formatDate } from '../../utils/date.js';

export default function Dashboard() {
  const { user } = useAuth();
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    setPolls(storage.getAllPolls());
  }, []);

  const summary = useMemo(() => {
    const active = polls.filter((poll) => new Date(poll.expiry) > new Date());
    const expired = polls.length - active.length;
    const totalVotes = polls.reduce((sum, poll) => sum + poll.votesCount, 0);
    const bookmarked = user?.bookmarks.length || 0;
    const comments = polls.reduce((sum, poll) => sum + poll.comments.length, 0);
    return { active: active.length, expired, totalVotes, bookmarked, comments };
  }, [polls, user]);

  const activity = useMemo(() => {
    return polls.flatMap((poll) => poll.activity.map((item) => ({ ...item, pollTitle: poll.title }))).slice(0, 8);
  }, [polls]);

  return (
    <motion.main className="page-shell dashboard-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="dashboard-hero glass-card shadow-sm">
        <div>
          <p className="eyebrow">Hello, {user?.name}</p>
          <h1>Welcome back to your TimeSync workspace.</h1>
          <p>Monitor poll performance, launch new events, and keep your team aligned in one polished dashboard.</p>
        </div>
        <div className="dashboard-actions">
          <Link to="/create" className="btn btn-primary btn-lg"><FaPlusCircle /> Create Poll</Link>
          <Link to="/polls" className="btn btn-soft">View All Polls</Link>
        </div>
      </div>
      <section className="dashboard-summary grid-4">
        <motion.div className="stat-card glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span>Total Polls</span>
          <h3>{polls.length}</h3>
        </motion.div>
        <motion.div className="stat-card glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <span>Active Polls</span>
          <h3>{summary.active}</h3>
        </motion.div>
        <motion.div className="stat-card glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <span>Expired Polls</span>
          <h3>{summary.expired}</h3>
        </motion.div>
        <motion.div className="stat-card glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <span>Total Votes</span>
          <h3>{summary.totalVotes}</h3>
        </motion.div>
      </section>
      <section className="dashboard-grid">
        <div className="glass-card stats-panel shadow-sm">
          <div className="panel-header">
            <h3><FaChartPie /> Quick Actions</h3>
          </div>
          <div className="action-grid">
            <Link to="/create" className="action-box"><FaPlusCircle /> Create Poll</Link>
            <Link to="/polls" className="action-box"><FaClipboardList /> View Polls</Link>
            <Link to="/analytics" className="action-box"><FaChartLine /> Analytics</Link>
            <Link to="/settings" className="action-box"><FaCog /> Settings</Link>
          </div>
        </div>
        <div className="glass-card activity-panel shadow-sm">
          <div className="panel-header">
            <h3><FaComments /> Recent Activity</h3>
          </div>
          <div className="activity-list">
            {activity.length === 0 ? (
              <p className="text-muted">Your activity feed will populate as polls are created and votes arrive.</p>
            ) : (
              activity.map((item) => (
                <div key={item.id} className="activity-item">
                  <span className="activity-time">{formatDate(item.createdAt)}</span>
                  <div>
                    <strong>{item.message}</strong>
                    <p>{item.pollTitle}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </motion.main>
  );
}
