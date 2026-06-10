import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <motion.footer className="footer-shell glass-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div>
        <p>TimeSync Poll &copy; 2026</p>
        <small>Premium voting experience, analytics, and collaboration.</small>
      </div>
      <div className="footer-links">
        <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /></a>
        <a href="https://github.com" target="_blank" rel="noreferrer"><FaGithub /></a>
      </div>
    </motion.footer>
  );
}
