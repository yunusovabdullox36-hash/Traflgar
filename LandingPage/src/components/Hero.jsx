import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HiOutlinePlay, HiArrowRight } from 'react-icons/hi';
import { FaShieldAlt, FaUserMd, FaChartLine } from 'react-icons/fa';
import { HiBuildingOffice2 } from 'react-icons/hi2';

export default function Hero() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const floatingIcons = [
    { Icon: FaShieldAlt, x: '10%', y: '20%', delay: 0, color: '#00B4D8' },
    { Icon: FaUserMd, x: '80%', y: '15%', delay: 1.5, color: '#48CAE4' },
    { Icon: FaChartLine, x: '85%', y: '70%', delay: 3, color: '#0096C7' },
  ];

  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg-gradient" />
      <div className="hero-bg-grid" />

      {floatingIcons.map(({ Icon, x, y, delay, color }, i) => (
        <motion.div
          key={i}
          className="floating-icon"
          style={{ left: x, top: y, color }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.2, 0.15],
            scale: [0, 1, 1],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            delay,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <Icon size={32} />
        </motion.div>
      ))}

      <motion.div
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-badge" variants={itemVariants}>
          <span className="badge-dot" />
          <HiBuildingOffice2 size={16} />
          {t('features.title')}
        </motion.div>

        <motion.h1 className="hero-title" variants={itemVariants}>
          {t('hero.title')}
          <span className="title-accent">.</span>
        </motion.h1>

        <motion.p className="hero-subtitle" variants={itemVariants}>
          {t('hero.subtitle')}
        </motion.p>

        <motion.div className="hero-actions" variants={itemVariants}>
          <button className="btn-primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            {t('hero.cta')}
            <HiArrowRight className="btn-icon" />
          </button>
          <button className="btn-secondary" onClick={() => document.getElementById('workflow')?.scrollIntoView({ behavior: 'smooth' })}>
            <HiOutlinePlay className="btn-icon" />
            {t('hero.demo')}
          </button>
        </motion.div>

        <motion.div className="hero-stats-preview" variants={itemVariants}>
          <div className="preview-stat">
            <span className="preview-number">50+</span>
            <span className="preview-label">{t('stats.doctors')}</span>
          </div>
          <div className="preview-divider" />
          <div className="preview-stat">
            <span className="preview-number">10K+</span>
            <span className="preview-label">{t('stats.patients')}</span>
          </div>
          <div className="preview-divider" />
          <div className="preview-stat">
            <span className="preview-number">5+</span>
            <span className="preview-label">{t('stats.experience')}</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
