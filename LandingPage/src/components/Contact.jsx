import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="section-container">
        <div className="contact-grid">
          <motion.div
            className="contact-cta"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="cta-title">{t('cta.title')}</h2>
            <p className="cta-subtitle">{t('cta.subtitle')}</p>
            <button className="cta-button">
              {t('cta.button')}
              <HiArrowRight className="cta-icon" />
            </button>
          </motion.div>

          <motion.div
            className="contact-info"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="info-card">
              <div className="info-icon"><FaPhone /></div>
              <div>
                <h4>Telefon</h4>
                <p>+998 90 123 45 67</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon"><FaEnvelope /></div>
              <div>
                <h4>Email</h4>
                <p>info@trafalgar.uz</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon"><FaMapMarkerAlt /></div>
              <div>
                <h4>Manzil</h4>
                <p>Toshkent, O'zbekiston</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
