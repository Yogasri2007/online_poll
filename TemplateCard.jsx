import { motion } from 'framer-motion';

export default function TemplateCard({ template, onSelect }) {
  return (
    <motion.article className="template-card glass-card shadow-sm" whileHover={{ y: -6 }}>
      <div className="template-top">
        <span className="badge badge-secondary">{template.type}</span>
        <h4>{template.title}</h4>
      </div>
      <p>{template.description}</p>
      <div className="template-actions">
        <button type="button" className="btn btn-primary" onClick={() => onSelect(template)}>
          Use Template
        </button>
      </div>
    </motion.article>
  );
}
