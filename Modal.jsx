import { motion } from 'framer-motion';

export default function Modal({ show, title, onClose, children }) {
  if (!show) return null;
  return (
    <div className="modal-backdrop custom-backdrop" onClick={onClose}>
      <motion.div className="custom-modal glass-card" onClick={(e) => e.stopPropagation()} initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }}>
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
        </div>
        <div className="modal-body">{children}</div>
      </motion.div>
    </div>
  );
}
