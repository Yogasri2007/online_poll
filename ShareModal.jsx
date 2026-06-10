import { motion } from 'framer-motion';

export default function ShareModal({ show, onClose, url }) {
  if (!show) return null;
  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
  };

  return (
    <div className="modal-backdrop custom-backdrop" onClick={onClose}>
      <motion.div className="custom-modal glass-card" onClick={(e) => e.stopPropagation()} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <div className="modal-header">
          <h5 className="modal-title">Share Poll</h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
        </div>
        <div className="modal-body">
          <p>Share this poll link with participants so they can vote instantly.</p>
          <div className="share-box">
            <input readOnly value={url} />
            <button type="button" className="btn btn-primary" onClick={handleCopy}>Copy Link</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
