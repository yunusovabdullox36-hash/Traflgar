import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { FaUserMd, FaUsers, FaCalendarCheck, FaAward } from 'react-icons/fa';

function Counter({ end, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const statItems = [
  { key: 'doctors', icon: FaUserMd, end: 50, suffix: '+', color: '#00B4D8' },
  { key: 'patients', icon: FaUsers, end: 10000, suffix: '+', color: '#48CAE4' },
  { key: 'experience', icon: FaAward, end: 5, suffix: '+', color: '#0B4F6C' },
  { key: 'appointments', icon: FaCalendarCheck, end: 50000, suffix: '+', color: '#00B4D8' },
];

export default function Stats() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="stats-section" ref={ref}>
      <div className="stats-container">
        <div className="stats-grid">
          {statItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                className="stat-card"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="stat-icon" style={{ background: `${item.color}15`, color: item.color }}>
                  <Icon />
                </div>
                <div className="stat-number" style={{ color: item.color }}>
                  <Counter end={item.end} suffix={item.suffix} />
                </div>
                <div className="stat-label">{t(`stats.${item.key}`)}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
