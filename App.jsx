import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Landing from './pages/Landing/Landing.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import CreatePoll from './pages/CreatePoll/CreatePoll.jsx';
import Polls from './pages/Polls/Polls.jsx';
import PollDetails from './pages/PollDetails/PollDetails.jsx';
import Analytics from './pages/Analytics/Analytics.jsx';
import Bookmarks from './pages/Bookmarks/Bookmarks.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Settings from './pages/Settings/Settings.jsx';
import Templates from './pages/Templates/Templates.jsx';
import NotFound from './pages/NotFound.jsx';
import NotificationDropdown from './components/Notifications/NotificationDropdown.jsx';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="app-shell">
            <Navbar />
            <NotificationDropdown />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/create" element={<ProtectedRoute><CreatePoll /></ProtectedRoute>} />
                <Route path="/polls" element={<ProtectedRoute><Polls /></ProtectedRoute>} />
                <Route path="/poll/:id" element={<ProtectedRoute><PollDetails /></ProtectedRoute>} />
                <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                <Route path="/bookmarks" element={<ProtectedRoute><Bookmarks /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/templates" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
