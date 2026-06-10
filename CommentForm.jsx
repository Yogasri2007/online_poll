import { useState } from 'react';
export default function CommentForm({ onSubmit, placeholder = 'Share your thoughts...' }) {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText('');
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={placeholder} rows="3" />
      <button type="submit" className="btn btn-primary mt-2">Post Comment</button>
    </form>
  );
}
