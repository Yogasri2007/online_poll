import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext.jsx';
import { storage } from '../../services/storage.js';
import { formatDate, formatTime, countdown } from '../../utils/date.js';
import CommentForm from '../../components/Comments/CommentForm.jsx';
import CommentList from '../../components/Comments/CommentList.jsx';
import ReactionPicker from '../../components/Reactions/ReactionPicker.jsx';
import PieChart from '../../components/Charts/PieChart.jsx';
import BarChart from '../../components/Charts/BarChart.jsx';
import ShareModal from '../../components/Modals/ShareModal.jsx';

export default function PollDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [poll, setPoll] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [showShare, setShowShare] = useState(false);
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  useEffect(() => {
    const current = storage.getPoll(id);
    if (!current) {
      navigate('/polls');
      return;
    }
    setPoll(current);
  }, [id, navigate]);

  useEffect(() => {
    const updateTimer = () => {
      if (poll?.expiry) setTimer(countdown(poll.expiry));
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [poll]);

  const totalVotes = useMemo(() => poll?.slots.reduce((sum, slot) => sum + slot.votes, 0) || 0, [poll]);
  const slotLabels = useMemo(() => poll?.slots.map((slot) => slot.label) || [], [poll]);
  const voteData = useMemo(() => poll?.slots.map((slot) => slot.votes) || [], [poll]);
  const winner = useMemo(() => poll?.slots.reduce((best, slot) => (!best || slot.votes > best.votes ? slot : best), null), [poll]);

  if (!poll) return null;

  const toggleSlot = (slotId) => {
    if (poll.settings.multiple) {
      setSelectedSlots((prev) => prev.includes(slotId) ? prev.filter((id) => id !== slotId) : [...prev, slotId]);
    } else {
      setSelectedSlots([slotId]);
    }
  };

  const handleVote = () => {
    if (!selectedSlots.length) {
      setMessage('Select at least one slot to vote.');
      return;
    }
    storage.votePoll(poll.id, selectedSlots, user);
    setPoll(storage.getPoll(poll.id));
    setMessage('Vote submitted. Thanks for participating!');
    storage.addNotification({ title: `${user.name} voted in ${poll.title}` });
    setSelectedSlots([]);
  };

  const handleComment = (text) => {
    storage.addComment(poll.id, { author: user.name, text, likes: 0 });
    setPoll(storage.getPoll(poll.id));
    storage.addNotification({ title: `${user.name} commented on ${poll.title}` });
  };

  const handleLikeComment = (commentId) => {
    const comment = poll.comments.find((item) => item.id === commentId);
    if (comment) {
      storage.updateComment(poll.id, commentId, { likes: comment.likes + 1 });
      setPoll(storage.getPoll(poll.id));
    }
  };

  const handleDeleteComment = (commentId) => {
    storage.deleteComment(poll.id, commentId);
    setPoll(storage.getPoll(poll.id));
  };

  const handleReact = (reaction) => {
    storage.addReaction(poll.id, reaction, user);
    setPoll(storage.getPoll(poll.id));
  };

  return (
    <motion.main className="page-shell poll-details-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="detail-header glass-card shadow-sm">
        <div className="detail-banner" style={{ backgroundImage: `url(${poll.banner})` }}>
          <span className="detail-badge">{poll.category}</span>
        </div>
        <div className="detail-copy">
          <p className="eyebrow">Poll details</p>
          <h1>{poll.title}</h1>
          <p>{poll.description}</p>
          <div className="detail-meta">
            <span>Created by {poll.creatorName}</span>
            <span>Ends {formatDate(poll.expiry)} {formatTime(poll.expiry)}</span>
            <span>Countdown {timer.days}d {timer.hours}h {timer.minutes}m {timer.seconds}s</span>
          </div>
          <div className="detail-actions">
            <button type="button" className="btn btn-primary" onClick={handleVote}>Submit Vote</button>
            <button type="button" className="btn btn-soft" onClick={() => setShowShare(true)}>Share Poll</button>
          </div>
          {message && <p className="success-text">{message}</p>}
        </div>
      </section>
      <section className="poll-options grid-2">
        <div className="glass-card slot-card shadow-sm">
          <h3>Vote for your preferred slots</h3>
          <div className="slot-list">
            {poll.slots.map((slot) => {
              const progress = totalVotes ? Math.round((slot.votes / totalVotes) * 100) : 0;
              return (
                <button key={slot.id} type="button" className={`slot-item ${selectedSlots.includes(slot.id) ? 'selected' : ''}`} onClick={() => toggleSlot(slot.id)}>
                  <div>
                    <strong>{slot.label}</strong>
                    <span>{slot.votes} votes</span>
                  </div>
                  <div className="slot-progress"><span style={{ width: `${progress}%` }} /></div>
                </button>
              );
            })}
          </div>
        </div>
        <div className="glass-card result-card shadow-sm">
          <h3>Results overview</h3>
          <div className="chart-grid">
            <PieChart labels={slotLabels} data={voteData} />
            <BarChart labels={slotLabels} data={voteData} />
          </div>
          <div className="winner-banner">
            <span>Winner</span>
            <strong>{winner?.label || 'No votes yet'}</strong>
          </div>
        </div>
      </section>
      <section className="activity-section grid-2">
        <div className="glass-card comments-card shadow-sm">
          <div className="panel-header">
            <h3>Comments</h3>
          </div>
          {poll.settings.commentsEnabled ? (
            <>
              <CommentForm onSubmit={handleComment} />
              <CommentList comments={poll.comments} onDelete={handleDeleteComment} onLike={handleLikeComment} onReply={() => {}} onEdit={() => {}} />
            </>
          ) : (
            <p className="text-muted">Comments are disabled for this poll.</p>
          )}
        </div>
        <div className="glass-card reaction-panel shadow-sm">
          <div className="panel-header">
            <h3>Reactions</h3>
          </div>
          {poll.settings.reactionsEnabled ? (
            <ReactionPicker onReact={handleReact} counts={poll.reactions} />
          ) : (
            <p className="text-muted">Reactions are disabled for this poll.</p>
          )}
        </div>
      </section>
      <ShareModal show={showShare} onClose={() => setShowShare(false)} url={window.location.href} />
    </motion.main>
  );
}
