import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { storage } from '../../services/storage.js';

const categories = ['Meeting', 'Classroom', 'Event', 'Interview', 'Study Group', 'Team Planning'];

const defaultSlot = () => ({ id: crypto.randomUUID(), label: '9:00 AM – 10:00 AM', votes: 0 });

export default function CreatePoll() {
  const { user } = useAuth();
  const [title, setTitle] = useState('Quarterly planning sync');
  const [description, setDescription] = useState('Choose the best time slot for our next team planning session.');
  const [banner, setBanner] = useState('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80');
  const [category, setCategory] = useState('Meeting');
  const [tags, setTags] = useState('Planning,Team,Time');
  const [slots, setSlots] = useState([defaultSlot(), defaultSlot(), defaultSlot()]);
  const [anonymous, setAnonymous] = useState(false);
  const [multiple, setMultiple] = useState(true);
  const [isPrivate, setPrivate] = useState(false);
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  const [reactionsEnabled, setReactionsEnabled] = useState(true);
  const [hideResults, setHideResults] = useState(false);
  const [expiry, setExpiry] = useState(new Date(Date.now() + 86400000).toISOString().slice(0, 16));
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const tagList = useMemo(() => tags.split(',').map((tag) => tag.trim()).filter(Boolean), [tags]);

  const handleAddSlot = () => setSlots((prev) => [...prev, defaultSlot()]);
  const handleRemoveSlot = (id) => setSlots((prev) => prev.filter((slot) => slot.id !== id));
  const handleSlotChange = (id, value) => setSlots((prev) => prev.map((slot) => (slot.id === id ? { ...slot, label: value } : slot)));
  const handleDuplicateSlot = (id) => {
    const slot = slots.find((slot) => slot.id === id);
    if (slot) {
      setSlots((prev) => [...prev, { ...slot, id: crypto.randomUUID() }]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPoll = storage.createPoll({
      title,
      description,
      banner,
      category,
      tags: tagList,
      slots,
      settings: { anonymous, multiple, isPrivate, commentsEnabled, reactionsEnabled, hideResults },
      expiry,
      creatorId: user.id,
      creatorName: user.name,
    });
    storage.addNotification({ title: `Poll created: ${newPoll.title}` });
    setMessage('Poll created successfully!');
    navigate(`/poll/${newPoll.id}`);
  };

  return (
    <motion.main className="page-shell create-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="glass-card shadow-sm create-header">
        <div>
          <p className="eyebrow">Create a new poll</p>
          <h1>Build your time-based poll with premium settings.</h1>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleAddSlot}>Add Slot</button>
      </section>
      <form className="glass-card poll-form shadow-sm" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="field-group">
            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4" />
            <label>Banner Image URL</label>
            <input value={banner} onChange={(e) => setBanner(e.target.value)} />
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((cat) => <option key={cat}>{cat}</option>)}
            </select>
            <label>Tags</label>
            <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Meeting, Remote, Team" />
          </div>
          <div className="field-group slots-panel">
            <div className="panel-header">
              <h3>Time Slots</h3>
              <p>Drag, duplicate, or remove slots to curate the best possible schedule.</p>
            </div>
            {slots.map((slot) => (
              <div key={slot.id} className="slot-row">
                <input value={slot.label} onChange={(e) => handleSlotChange(slot.id, e.target.value)} />
                <div className="slot-actions">
                  <button type="button" className="btn btn-soft btn-sm" onClick={() => handleDuplicateSlot(slot.id)}>Duplicate</button>
                  <button type="button" className="btn btn-soft btn-sm text-danger" onClick={() => handleRemoveSlot(slot.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="settings-grid">
          <div className="setting-card glass-card">
            <h4>Poll Settings</h4>
            <label><input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} /> Anonymous Voting</label>
            <label><input type="checkbox" checked={multiple} onChange={(e) => setMultiple(e.target.checked)} /> Multiple Selection</label>
            <label><input type="checkbox" checked={isPrivate} onChange={(e) => setPrivate(e.target.checked)} /> Private Poll</label>
            <label><input type="checkbox" checked={commentsEnabled} onChange={(e) => setCommentsEnabled(e.target.checked)} /> Enable Comments</label>
            <label><input type="checkbox" checked={reactionsEnabled} onChange={(e) => setReactionsEnabled(e.target.checked)} /> Enable Reactions</label>
            <label><input type="checkbox" checked={hideResults} onChange={(e) => setHideResults(e.target.checked)} /> Hide Results Until End</label>
          </div>
          <div className="setting-card glass-card">
            <h4>Expiry</h4>
            <label>End Date & Time</label>
            <input type="datetime-local" value={expiry} onChange={(e) => setExpiry(e.target.value)} required />
            <div className="preview-card">
              <p>Preview</p>
              <strong>{title}</strong>
              <span>{category}</span>
            </div>
          </div>
        </div>
        <div className="form-footer">
          {message && <p className="success-text">{message}</p>}
          <button type="submit" className="btn btn-primary btn-lg">Publish Poll</button>
        </div>
      </form>
    </motion.main>
  );
}
