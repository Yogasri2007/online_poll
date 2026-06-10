import { motion } from 'framer-motion';
import { FaHeart, FaReply, FaEdit, FaTrash } from 'react-icons/fa';
import { formatDate } from '../../utils/date.js';
import { useAuth } from '../../context/AuthContext.jsx';

export default function CommentList({ comments, onDelete, onLike, onReply, onEdit }) {
  const { user } = useAuth();

  return (
    <div className="comment-list">
      {comments.length === 0 ? (
        <p className="text-muted">No comments yet. Start the conversation.</p>
      ) : (
        comments.map((comment) => (
          <motion.div key={comment.id} className="comment-card glass-card" initial={{ opacity: 0.8, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <div className="comment-author">
              <div className="avatar-circle">{comment.author.charAt(0)}</div>
              <div>
                <strong>{comment.author}</strong>
                <small>{formatDate(comment.createdAt)}</small>
              </div>
            </div>
            <p>{comment.text}</p>
            <div className="comment-actions">
              <button type="button" className="btn btn-soft btn-sm" onClick={() => onLike(comment.id)}>
                <FaHeart /> {comment.likes}
              </button>
              <button type="button" className="btn btn-soft btn-sm" onClick={() => onReply(comment.id)}>
                <FaReply /> Reply
              </button>
              {user?.name === comment.author && (
                <>
                  <button type="button" className="btn btn-soft btn-sm" onClick={() => onEdit(comment.id)}>
                    <FaEdit /> Edit
                  </button>
                  <button type="button" className="btn btn-soft btn-sm text-danger" onClick={() => onDelete(comment.id)}>
                    <FaTrash /> Delete
                  </button>
                </>
              )}
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}
