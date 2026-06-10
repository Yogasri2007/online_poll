import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext.jsx';
import { storage } from '../../services/storage.js';

export default function Settings() {
  const { theme, updateTheme } = useTheme();
  const [message, setMessage] = useState('');
  const fileInputRef = useRef();

  const handleExport = () => {
    const data = storage.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'timesync-backup.json';
    link.click();
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const text = await file.text();
    const result = storage.importData(text);
    setMessage(result.success ? 'Data imported successfully.' : result.message);
  };

  const handleReset = () => {
    storage.resetStorage();
    setMessage('Application reset. Please refresh to continue.');
  };

  return (
    <motion.main className="page-shell settings-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="page-header glass-card shadow-sm">
        <div>
          <p className="eyebrow">Settings</p>
          <h1>Customize the look and manage your data.</h1>
        </div>
      </section>
      <section className="settings-grid">
        <div className="glass-card shadow-sm setting-panel">
          <h3>Appearance</h3>
          <label>Theme</label>
          <select value={theme.palette} onChange={(e) => updateTheme({ palette: e.target.value })}>
            <option value="glass">Glass</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="neon">Neon</option>
            <option value="cyberpunk">Cyberpunk</option>
          </select>
          <label>Accent Color</label>
          <select value={theme.accent} onChange={(e) => updateTheme({ accent: e.target.value })}>
            <option value="purple">Purple</option>
            <option value="blue">Blue</option>
            <option value="pink">Pink</option>
            <option value="orange">Orange</option>
            <option value="green">Green</option>
          </select>
          <label>Font size</label>
          <select value={theme.fontSize} onChange={(e) => updateTheme({ fontSize: e.target.value })}>
            <option value="16px">Normal</option>
            <option value="18px">Large</option>
            <option value="20px">Extra Large</option>
          </select>
          <label><input type="checkbox" checked={theme.motion} onChange={(e) => updateTheme({ motion: e.target.checked })} /> Enable animations</label>
        </div>
        <div className="glass-card shadow-sm setting-panel">
          <h3>Data</h3>
          <button type="button" className="btn btn-primary" onClick={handleExport}>Export JSON</button>
          <div className="import-row">
            <input type="file" accept="application/json" ref={fileInputRef} onChange={handleImport} />
          </div>
          <button type="button" className="btn btn-soft text-danger" onClick={handleReset}>Reset Application</button>
          {message && <p className="success-text">{message}</p>}
        </div>
      </section>
    </motion.main>
  );
}
