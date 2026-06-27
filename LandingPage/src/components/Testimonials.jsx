import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { FaQuoteRight } from 'react-icons/fa';

export default function Testimonials() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [current, setCurrent] = useState(0);
  const items = t('testimonials.items', { returnObjects: true });

  if (!Array.isArray(items) || items.length === 0) return null;

  const next = () => setCurrent((prev) => (prev + 1) % items.length);
  const prev = () => setCurrent((prev) => (prev - 1 + items.length) % items.length);

  return (
    <section className="testimonials-section" ref={ref}>
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="section-badge">{t('testimonials.title')}</span>
          <h2 className="section-title">{t('testimonials.subtitle')}</h2>
        </motion.div>

        <div className="testimonials-carousel">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="testimonial-card"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4 }}
            >
              <FaQuoteRight className="testimonial-quote" />
              <p className="testimonial-text">"{items[current]?.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ background: `hsl(${current * 120}, 60%, 50%)` }}>
                  {items[current]?.name?.charAt(0)}
                </div>
                <div>
                  <h4 className="author-name">{items[current]?.name}</h4>
                  <p className="author-role">{items[current]?.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="testimonial-controls">
            <button className="control-btn" onClick={prev}>
              <HiChevronLeft />
            </button>
            <div className="control-dots">
              {items.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === current ? 'active' : ''}`}
                  onClick={() => setCurrent(i)}
                />
              ))}
            </div>
            <button className="control-btn" onClick={next}>
              <HiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
