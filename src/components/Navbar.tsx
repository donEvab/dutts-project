import { useState, useEffect, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { NAV_ITEMS, CONTACT_INFO } from '../data/content';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => item.id);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-4 sm:px-6 lg:px-12 py-4 md:py-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Modern Brand Logo (Separated completely from navbar) */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-auto flex items-center"
        >
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="group flex flex-col p-1"
            id="brand-logo-link"
          >
            <div className="flex flex-col uppercase font-heading font-black leading-[0.85] tracking-tight">
              <span 
                className="text-white text-2xl sm:text-3xl transition-transform group-hover:-translate-y-0.5"
                style={{ textShadow: '3px 3px 0px #6A7BFF' }}
              >
                DUTTS.
              </span>
              <span 
                className="text-[#FFE055] text-2xl sm:text-3xl transition-transform group-hover:-translate-y-0.5"
                style={{ textShadow: '3px 3px 0px #6A7BFF' }}
              >
                PROJECT
              </span>
            </div>
          </a>
        </motion.div>

        {/* Center: Floating Glassmorphism Navbar (Desktop only - completely hidden on mobile as specified) */}
        <motion.nav
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="hidden md:flex pointer-events-auto items-center p-1 rounded-full glass-nav"
          id="floating-center-navbar"
          aria-label="Main Navigation"
        >
          <ul className="flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    id={`nav-link-${item.id}`}
                    className={`relative px-4 py-1.5 text-xs font-medium transition-all duration-200 rounded-full flex items-center justify-center ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-neutral-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 bg-[#6A7BFF] rounded-full z-0"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </motion.nav>

        {/* Right: Standalone 'Shop' / Order Button */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-auto flex items-center gap-2"
        >
          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="standalone-shop-button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFE055] hover:bg-[#F0CD3C] text-[#121526] text-xs font-heading font-bold transition-all duration-200 shadow-md active:scale-95 border border-[#121526]/10"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Shop / WA</span>
            <ArrowUpRight className="w-3 h-3 text-[#121526]/70" />
          </a>
        </motion.div>

      </div>
    </header>
  );
}
