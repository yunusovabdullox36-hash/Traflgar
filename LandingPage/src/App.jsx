import { useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import Workflow from './components/Workflow';
import ChartsSection from './components/ChartsSection';
import Doctors from './components/Doctors';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function AppContent() {
  useEffect(() => {
    const handleScrollReveal = () => {
      const elements = document.querySelectorAll('.reveal');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
          el.classList.add('revealed');
        }
      });
    };

    window.addEventListener('scroll', handleScrollReveal);
    handleScrollReveal();
    return () => window.removeEventListener('scroll', handleScrollReveal);
  }, []);

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Workflow />
        <ChartsSection />
        <Doctors />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
