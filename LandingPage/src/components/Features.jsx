import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import {
  HiOutlineClipboardDocumentList,
  HiOutlineArrowsRightLeft,
  HiOutlineChartBarSquare,
  HiOutlineLanguage,
  HiOutlineShieldCheck,
} from 'react-icons/hi2';
import { FaHeadset } from 'react-icons/fa';

const featureIcons = {
  digital: HiOutlineClipboardDocumentList,
  workflow: HiOutlineArrowsRightLeft,
  analytics: HiOutlineChartBarSquare,
  multi: HiOutlineLanguage,
  secure: HiOutlineShieldCheck,
  support: FaHeadset,
};

const featureColors = {
  digital: '#00B4D8',
  workflow: '#48CAE4',
  analytics: '#0B4F6C',
  multi: '#0077B6',
  secure: '#00B4D8',
  support: '#48CAE4',
};

export default function Features() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const features = ['digital', 'workflow', 'analytics', 'multi', 'secure', 'support'];

  return (
    <section id="features" className="features-section" ref={ref}>
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="section-badge">{t('features.title')}</span>
          <h2 className="section-title">{t('features.subtitle')}</h2>
        </motion.div>

        <div className="features-grid">
          {features.map((key, index) => {
            const Icon = featureIcons[key];
            const color = featureColors[key];
            return (
              <motion.div
                key={key}
                className="feature-card"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="feature-icon" style={{ background: `${color}15`, color }}>
                  <Icon />
                </div>
                <h3 className="feature-title">{t(`features.items.${key}.title`)}</h3>
                <p className="feature-desc">{t(`features.items.${key}.desc`)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
