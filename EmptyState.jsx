import { motion } from 'framer-motion';

export default function EmptyState({ title, description, action }) {
  return (
    <motion.div className="empty-state glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="empty-illustration">🌈</div>
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </motion.div>
  );
}
