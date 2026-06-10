import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { BsBell, BsFillMoonStarsFill, BsSun } from 'react-icons/bs';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, updateTheme } = useTheme();
  const navigate = useNavigate();

  const toggleTheme = () => {
    const next = theme.palette === 'dark' ? 'light' : 'dark';
    updateTheme({ palette: next });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.nav className="main-nav glass-card shadow-sm" initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <div className="nav-brand">
        <Link to="/" className="brand-logo">
          <span>TimeSync</span> Poll
        </Link>
      </div>
      <ul className="nav-links">
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/polls">Polls</NavLink></li>
        <li><NavLink to="/analytics">Analytics</NavLink></li>
        <li><NavLink to="/templates">Templates</NavLink></li>
      </ul>
      <div className="nav-actions">
        <button type="button" className="theme-switch" onClick={toggleTheme} aria-label="Toggle theme">
          {theme.palette === 'light' ? <BsFillMoonStarsFill /> : <BsSun />}
        </button>
        <button type="button" className="icon-button" aria-label="Notifications">
          <BsBell />
        </button>
        {user ? (
          <div className="user-chip" onClick={() => navigate('/profile')}>
            <span className="avatar">{user.avatar}</span>
            <div>
              <strong>{user.name}</strong>
              <small>{user.email}</small>
            </div>
          </div>
        ) : (
          <Link to="/login" className="btn btn-outline-light btn-sm">Login</Link>
        )}
        {user && (
          <button type="button" className="btn btn-soft" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </motion.nav>
  );
}
