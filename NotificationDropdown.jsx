import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { storage } from '../../services/storage.js';
import { BsBell } from 'react-icons/bs';

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(storage.getNotifications());
  }, []);

  return (
    <div className="notification-widget">
      <button type="button" className="icon-button" onClick={() => setOpen((open) => !open)} aria-label="Open notifications">
        <BsBell />
        {notifications.length > 0 && <span className="badge-dot" />}
      </button>
      {open && (
        <motion.div className="notification-panel glass-card shadow-lg" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="panel-header">
            <h5>Notifications</h5>
            <button className="btn-close" aria-label="Close" onClick={() => setOpen(false)} />
          </div>
          <div className="notification-list">
            {notifications.length === 0 ? (
              <p className="text-muted">No new activity yet.</p>
            ) : (
              notifications.map((note) => (
                <div key={note.id} className="notification-item">
                  <span>{note.title}</span>
                  <small>{new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
