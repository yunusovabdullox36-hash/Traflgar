import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaGlobe } from 'react-icons/fa';
import { HiBuildingOffice2 } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { t } = useTranslation();
  const { currentLang, changeLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { key: 'home', href: '#hero' },
    { key: 'features', href: '#features' },
    { key: 'workflow', href: '#workflow' },
    { key: 'doctors', href: '#doctors' },
    { key: 'contact', href: '#contact' },
  ];

  const languages = [
    { code: 'uz', label: 'O\'zbek', flag: 'Oʻ' },
    { code: 'ru', label: 'Русский', flag: 'RU' },
    { code: 'en', label: 'English', flag: 'EN' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
    >
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => scrollTo('hero')}>
          <HiBuildingOffice2 size={28} color="#0096C7" />
          <span className="logo-text">Trafalgar</span>
        </div>

        <div className="navbar-links">
          {navItems.map((item) => (
            <button key={item.key} onClick={() => scrollTo(item.href.replace('#', ''))} className="nav-link">
              {t(`nav.${item.key}`)}
            </button>
          ))}
        </div>

        <div className="navbar-actions">
          <div className="lang-switcher" onClick={() => setLangOpen(!langOpen)}>
            <FaGlobe className="lang-icon" />
            <span className="lang-current">{currentLang.toUpperCase()}</span>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  className="lang-dropdown"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      className={`lang-option ${currentLang === l.code ? 'active' : ''}`}
                      onClick={(e) => { e.stopPropagation(); changeLanguage(l.code); setLangOpen(false); }}
                    >
                      <span className="lang-flag">{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button className="nav-cta" onClick={() => scrollTo('contact')}>
            {t('nav.contact')}
          </button>

          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu"
          >
            {navItems.map((item) => (
              <button key={item.key} onClick={() => scrollTo(item.href.replace('#', ''))} className="mobile-link">
                {t(`nav.${item.key}`)}
              </button>
            ))}
            <div className="mobile-lang">
              {languages.map((l) => (
                <button
                  key={l.code}
                  className={`mobile-lang-btn ${currentLang === l.code ? 'active' : ''}`}
                  onClick={() => { changeLanguage(l.code); setMenuOpen(false); }}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
