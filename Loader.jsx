import { motion } from 'framer-motion';

export default function Loader({ message = 'Loading...' }) {
  return (
    <motion.div className="loader-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="spinner-border text-primary" role="status"></div>
      <p>{message}</p>
    </motion.div>
  );
}
