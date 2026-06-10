import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../services/storage.js';
import { useAuth } from '../../context/AuthContext.jsx';
import TemplateCard from '../../components/Templates/TemplateCard.jsx';

const templates = [
  { id: 'meeting', type: 'Meeting', title: 'Team Standup Availability', description: 'Collect the best time slots for your daily or weekly standup with a sleek poll template.', banner: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80', tags: ['Standup', 'Team'] },
  { id: 'classroom', type: 'Classroom', title: 'Lecture Scheduling', description: 'Perfect for scheduling study sessions, classes, or extra tutorials with your group.', banner: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80', tags: ['Classroom', 'Study'] },
  { id: 'event', type: 'Event', title: 'Networking Event Planning', description: 'A polished event planning template for social meetups and guest sessions.', banner: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80', tags: ['Event', 'Networking'] },
  { id: 'interview', type: 'Interview', title: 'Interview Slot Selection', description: 'Collect candidate availability faster with this interview poll template.', banner: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80', tags: ['Interview', 'Hiring'] },
  { id: 'study', type: 'Study Group', title: 'Study Group Session', description: 'Coordinate the best times for study groups and project reviews.', banner: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=900&q=80', tags: ['Study', 'Group'] },
];

export default function Templates() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    setPolls(storage.getAllPolls());
  }, []);

  const handleSelect = (template) => {
    const newPoll = storage.createPoll({
      title: template.title,
      description: template.description,
      banner: template.banner,
      category: template.type,
      tags: template.tags,
      slots: [
        { id: crypto.randomUUID(), label: '9:00 AM – 10:00 AM', votes: 0 },
        { id: crypto.randomUUID(), label: '11:00 AM – 12:00 PM', votes: 0 },
        { id: crypto.randomUUID(), label: '2:00 PM – 3:00 PM', votes: 0 },
      ],
      settings: { anonymous: false, multiple: true, isPrivate: false, commentsEnabled: true, reactionsEnabled: true, hideResults: false },
      expiry: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 16),
      creatorId: user.id,
      creatorName: user.name,
    });
    storage.addNotification({ title: `Template poll created: ${newPoll.title}` });
    navigate(`/poll/${newPoll.id}`);
  };

  return (
    <motion.main className="page-shell templates-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="page-header glass-card shadow-sm">
        <div>
          <p className="eyebrow">Templates</p>
          <h1>Launch a ready-made poll in seconds.</h1>
        </div>
      </section>
      <section className="template-grid">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} onSelect={handleSelect} />
        ))}
      </section>
    </motion.main>
  );
}
