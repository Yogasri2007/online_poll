import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <motion.main className="page-shell auth-page" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
      <section className="auth-card glass-card shadow-lg">
        <h2>Welcome back</h2>
        <p>Sign in to manage your polls, analytics, and themes.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <p className="minor-text">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </section>
    </motion.main>
  );
}
