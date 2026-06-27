import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { HiOutlineUserPlus, HiOutlineClipboardDocument, HiOutlineUser, HiOutlineDocumentText, HiOutlineCreditCard } from 'react-icons/hi2';

const steps = [
  { key: 'arrival', icon: HiOutlineUserPlus, color: '#00B4D8' },
  { key: 'registration', icon: HiOutlineClipboardDocument, color: '#0077B6' },
  { key: 'examination', icon: HiOutlineUser, color: '#48CAE4' },
  { key: 'prescription', icon: HiOutlineDocumentText, color: '#0B4F6C' },
  { key: 'payment', icon: HiOutlineCreditCard, color: '#00B4D8' },
];

export default function Workflow() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="workflow" className="workflow-section" ref={ref}>
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="section-badge">{t('workflow.title')}</span>
          <h2 className="section-title">{t('workflow.subtitle')}</h2>
        </motion.div>

        <div className="workflow-timeline">
          <div className="timeline-line" />
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.key}
                className={`workflow-step ${index % 2 === 0 ? 'left' : 'right'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="step-content">
                  <div className="step-number" style={{ background: step.color, color: '#fff' }}>
                    {index + 1}
                  </div>
                  <div className="step-icon" style={{ color: step.color }}>
                    <Icon size={28} />
                  </div>
                  <h3 className="step-title">{t(`workflow.steps.${step.key}.title`)}</h3>
                  <p className="step-desc">{t(`workflow.steps.${step.key}.desc`)}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
