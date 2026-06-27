import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { FaUserMd, FaStar, FaPhone } from 'react-icons/fa';

const doctors = [
  {
    name: 'Dr. Akbar Rahimov',
    specialty: 'cardiologist',
    rating: 5,
    patients: 3400,
    image: null,
    phone: '+998 90 123 45 67',
  },
  {
    name: 'Dr. Nilufar Azimova',
    specialty: 'neurologist',
    rating: 5,
    patients: 2800,
    image: null,
    phone: '+998 90 234 56 78',
  },
  {
    name: 'Dr. Sardor Karimov',
    specialty: 'therapist',
    rating: 4,
    patients: 5200,
    image: null,
    phone: '+998 90 345 67 89',
  },
  {
    name: 'Dr. Malika Yusupova',
    specialty: 'pediatrician',
    rating: 5,
    patients: 4100,
    image: null,
    phone: '+998 90 456 78 90',
  },
];

const doctorColors = ['#00B4D8', '#48CAE4', '#0B4F6C', '#0077B6'];

export default function Doctors() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="doctors" className="doctors-section" ref={ref}>
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="section-badge">{t('doctors.title')}</span>
          <h2 className="section-title">{t('doctors.subtitle')}</h2>
        </motion.div>

        <div className="doctors-grid">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.name}
              className="doctor-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="doctor-image" style={{ background: `linear-gradient(135deg, ${doctorColors[index]}15, ${doctorColors[index]}30)` }}>
                <div className="doctor-avatar" style={{ background: doctorColors[index] }}>
                  <FaUserMd size={32} color="#fff" />
                </div>
              </div>
              <div className="doctor-info">
                <h3 className="doctor-name">{doctor.name}</h3>
                <p className="doctor-specialty">{t(`doctors.specializations.${doctor.specialty}`)}</p>
                <div className="doctor-rating">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar key={i} color={i < doctor.rating ? '#FFB800' : '#E2E8F0'} size={14} />
                  ))}
                  <span className="doctor-patients">{doctor.patients}+ {t('stats.patients')}</span>
                </div>
                <div className="doctor-phone">
                  <FaPhone size={12} />
                  <span>{doctor.phone}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
