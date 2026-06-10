import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import PieChart from '../../components/Charts/PieChart.jsx';
import LineChart from '../../components/Charts/LineChart.jsx';
import BarChart from '../../components/Charts/BarChart.jsx';
import { storage } from '../../services/storage.js';

export default function Analytics() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    setPolls(storage.getAllPolls());
  }, []);

  const totalVotes = polls.reduce((sum, poll) => sum + poll.votesCount, 0);
  const averageVotes = polls.length ? Math.round(totalVotes / polls.length) : 0;
  const categories = [...new Set(polls.map((poll) => poll.category))];
  const categoryCounts = categories.map((category) => polls.filter((poll) => poll.category === category).length);
  const popular = [...polls].sort((a, b) => b.votesCount - a.votesCount).slice(0, 3);
  const trending = polls.filter((poll) => poll.votesCount > 15).length;

  const insights = [
    { label: 'Most popular poll', value: popular[0]?.title || 'Create more polls' },
    { label: 'Best engagement', value: trending || 'Keep encouraging votes' },
    { label: 'Top category', value: categories[0] || 'Set categories' },
  ];

  const votesByDate = polls.map((poll) => poll.votesCount);
  const dates = polls.map((poll) => new Date(poll.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));

  return (
    <motion.main className="page-shell analytics-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="page-header glass-card shadow-sm">
        <div>
          <p className="eyebrow">Analytics</p>
          <h1>Actionable insights from your poll performance.</h1>
        </div>
      </section>
      <section className="analytics-summary grid-4">
        <motion.div className="stat-card glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span>Total Votes</span>
          <h3>{totalVotes}</h3>
        </motion.div>
        <motion.div className="stat-card glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <span>Average Votes</span>
          <h3>{averageVotes}</h3>
        </motion.div>
        <motion.div className="stat-card glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <span>Popular Polls</span>
          <h3>{popular.length}</h3>
        </motion.div>
        <motion.div className="stat-card glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <span>Engagement</span>
          <h3>{trending}</h3>
        </motion.div>
      </section>
      <section className="analytics-grid">
        <div className="glass-card shadow-sm chart-panel">
          <h3>Category Distribution</h3>
          <PieChart labels={categories} data={categoryCounts} />
        </div>
        <div className="glass-card shadow-sm chart-panel">
          <h3>Votes Over Time</h3>
          <LineChart labels={dates} data={votesByDate} />
        </div>
      </section>
      <section className="insights-panel glass-card shadow-sm">
        <h3>Insights</h3>
        <div className="insights-grid">
          {insights.map((item) => (
            <div key={item.label} className="insight-card">
              <h4>{item.label}</h4>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </section>
    </motion.main>
  );
}
