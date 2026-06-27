import { useTranslation } from 'react-i18next';
import { FaHeart } from 'react-icons/fa';
import { HiBuildingOffice2 } from 'react-icons/hi2';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useTranslation();
  const { currentLang, changeLanguage } = useLanguage();

  const languages = [
    { code: 'uz', label: 'O\'zbek' },
    { code: 'ru', label: 'Русский' },
    { code: 'en', label: 'English' },
  ];

  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="section-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <HiBuildingOffice2 size={28} color="#00B4D8" />
                <span className="footer-logo-text">Trafalgar</span>
              </div>
              <p className="footer-desc">
                Zamonaviy shifohona boshqaruv tizimi. Klinikangizni raqamlashtiring va bemorlar oqimini avtomatlashtiring.
              </p>
              <div className="footer-lang">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    className={`footer-lang-btn ${currentLang === l.code ? 'active' : ''}`}
                    onClick={() => changeLanguage(l.code)}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="footer-links">
              <h4>Links</h4>
              <button onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}>{t('nav.home')}</button>
              <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>{t('nav.features')}</button>
              <button onClick={() => document.getElementById('workflow')?.scrollIntoView({ behavior: 'smooth' })}>{t('nav.workflow')}</button>
              <button onClick={() => document.getElementById('doctors')?.scrollIntoView({ behavior: 'smooth' })}>{t('nav.doctors')}</button>
            </div>

            <div className="footer-links">
              <h4>{t('footer.contact')}</h4>
              <span>+998 90 123 45 67</span>
              <span>info@trafalgar.uz</span>
              <span>Toshkent, O'zbekiston</span>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2025 Trafalgar. {t('footer.rights')}</p>
            <p className="footer-made">
              Made with <FaHeart color="#FF6B6B" /> by Trafalgar Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
