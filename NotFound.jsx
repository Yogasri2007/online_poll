import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <motion.main className="page-shell notfound-page" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <section className="hero-card glass-card shadow-lg">
        <h1>404</h1>
        <p>That page is lost in the schedule. Return to TimeSync to continue building better polls.</p>
        <Link to="/" className="btn btn-primary btn-lg mt-3">
          Back to Home
        </Link>
      </section>
    </motion.main>
  );
}
