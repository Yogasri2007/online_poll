import { useMemo } from 'react';
import { motion } from 'framer-motion';

const reactions = [
  { id: 'like', emoji: '👍', label: 'Like' },
  { id: 'love', emoji: '❤️', label: 'Love' },
  { id: 'fire', emoji: '🔥', label: 'Fire' },
  { id: 'party', emoji: '🎉', label: 'Celebrate' },
  { id: 'clap', emoji: '👏', label: 'Clap' },
];

export default function ReactionPicker({ onReact, counts }) {
  const totals = useMemo(() => counts || {}, [counts]);

  return (
    <div className="reaction-picker glass-card">
      <h5>Reactions</h5>
      <div className="reaction-list">
        {reactions.map((reaction) => (
          <motion.button
            type="button"
            key={reaction.id}
            className="reaction-button"
            whileTap={{ scale: 0.9 }}
            onClick={() => onReact(reaction.id)}
          >
            <span>{reaction.emoji}</span>
            <small>{totals[reaction.id] || 0}</small>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
