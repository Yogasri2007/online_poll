import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBolt, FaChartLine, FaShareAlt, FaPalette } from 'react-icons/fa';

const stats = [
  { label: 'Total Polls', value: '1.2K' },
  { label: 'Votes Cast', value: '24K' },
  { label: 'Active Polls', value: '315' },
  { label: 'User Engagement', value: '98%' },
];

const features = [
  { icon: <FaBolt />, title: 'Easy Poll Creation', description: 'Build time-based polls in seconds with premium templates.' },
  { icon: <FaChartLine />, title: 'Live Analytics', description: 'Track votes and engagement with sleek charts.' },
  { icon: <FaShareAlt />, title: 'Shareable Links', description: 'Send polls securely with a copy-to-clipboard experience.' },
  { icon: <FaPalette />, title: 'Custom Themes', description: 'Switch between glass, neon, dark, and cyberpunk modes.' },
];

const testimonials = [
  { author: 'Mia K.', quote: 'I love the animated dashboard and the ease of creating meeting polls.' },
  { author: 'Noah L.', quote: 'Voting flows feel premium, and shared links are perfect for quick collaboration.' },
  { author: 'Ava R.', quote: 'The analytics page is beautiful and gives instant insights.' },
];

const faqs = [
  { question: 'Is this platform frontend-only?', answer: 'Yes, everything is stored in LocalStorage so you can use TimeSync anywhere offline.' },
  { question: 'Can I import and export poll data?', answer: 'Absolutely. Save JSON backups and restore them from the settings panel.' },
  { question: 'How many time slots can I add?', answer: 'Unlimited slots with full reorder, duplicate, and remove controls.' },
];

export default function Landing() {
  return (
    <main className="page-shell landing-page">
      <section className="landing-hero">
        <motion.div className="hero-copy" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
          <p className="eyebrow">TimeSync Poll</p>
          <h1>
            Plan smarter with <span className="gradient-text">time polls</span> that feel premium.
          </h1>
          <p>Create intuitive polls, collect votes, analyze results, and share instantly — all in one polished workspace.</p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">Get Started</Link>
            <Link to="/login" className="btn btn-outline-light btn-lg">Experience Demo</Link>
          </div>
        </motion.div>
        <motion.div className="hero-visual" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
          <div className="visual-card glass-card shadow-lg">
            <div className="visual-panel">
              <div className="visual-title">Schedule vote summary</div>
              <div className="visual-row">
                <span>9:00 AM – 10:00 AM</span>
                <strong>23 votes</strong>
              </div>
              <div className="visual-row">
                <span>11:00 AM – 12:00 PM</span>
                <strong>17 votes</strong>
              </div>
              <div className="visual-row highlight">
                <span>2:00 PM – 3:00 PM</span>
                <strong>34 votes</strong>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      <section className="landing-stats glass-card shadow-sm">
        {stats.map((item) => (
          <motion.div key={item.label} className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h3>{item.value}</h3>
            <p>{item.label}</p>
          </motion.div>
        ))}
      </section>
      <section className="landing-features">
        <h2>Everything you need to run time polls beautifully</h2>
        <div className="feature-grid">
          {features.map((feature) => (
            <motion.article key={feature.title} className="feature-card glass-card" whileHover={{ y: -6 }}>
              <div className="feature-icon">{feature.icon}</div>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </motion.article>
          ))}
        </div>
      </section>
      <section className="landing-testimonials glass-card shadow-sm">
        <h2>Trusted by planners worldwide</h2>
        <div className="testimonial-slider">
          {testimonials.map((item) => (
            <motion.div key={item.author} className="testimonial-card" initial={{ opacity: 0.8 }} animate={{ opacity: 1 }}>
              <p>“{item.quote}”</p>
              <strong>{item.author}</strong>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="landing-faqs">
        <h2>Frequently asked questions</h2>
        <div className="faq-grid">
          {faqs.map((faq) => (
            <details key={faq.question} className="glass-card faq-card">
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
