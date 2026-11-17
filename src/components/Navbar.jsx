import React, { useState, useEffect } from 'react';
import Icon from './common/Icon';

export default function Navbar({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Fermer le menu si on clique en dehors ou si on resize vers desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Bloquer le scroll quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { href: '#how',      label: 'Comment ça marche' },
    { href: '#pricing',  label: 'Tarifs' },
    { href: '#faq',      label: 'FAQ' },
  ];

  const handleNavClick = (href) => {
    setMenuOpen(false);
    // laisser le navigateur scroller vers l'ancre
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      <header className="sticky top-0 z-50 glass border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[68px] flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => { setMenuOpen(false); onNavigate('landing'); }}
            className="flex items-center gap-2.5 group cursor-pointer text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 grid place-items-center shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition">
              <Icon name="pen" className="w-5 h-5 text-white" />
            </div>
            <span className="text-[19px] font-extrabold tracking-tight text-slate-900">Signly</span>
          </button>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="px-4 py-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Actions desktop */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('auth')}
              className="hidden sm:inline-flex text-sm font-semibold text-slate-700 hover:text-slate-900 px-4 py-2.5 rounded-xl hover:bg-slate-100 transition cursor-pointer"
            >
              Connexion
            </button>
            <button
              onClick={() => onNavigate('auth')}
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-white px-4 sm:px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 shadow-sm hover:shadow-md transition cursor-pointer"
            >
              Essai gratuit
              <Icon name="arrow-right" className="w-4 h-4" />
            </button>

            {/* Bouton hamburger — visible uniquement mobile / tablette */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl hover:bg-slate-100 transition cursor-pointer gap-[5px]"
            >
              {/* Trois barres animées → croix */}
              <span
                className="block h-[2px] w-6 bg-slate-800 rounded-full transition-all duration-300 origin-center"
                style={menuOpen ? { transform: 'translateY(7px) rotate(45deg)' } : {}}
              />
              <span
                className="block h-[2px] w-6 bg-slate-800 rounded-full transition-all duration-300"
                style={menuOpen ? { opacity: 0, transform: 'scaleX(0)' } : {}}
              />
              <span
                className="block h-[2px] w-6 bg-slate-800 rounded-full transition-all duration-300 origin-center"
                style={menuOpen ? { transform: 'translateY(-7px) rotate(-45deg)' } : {}}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay sombre */}
      <div
        onClick={() => setMenuOpen(false)}
        className="lg:hidden fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none' }}
      />

      {/* Drawer menu mobile */}
      <div
        className="lg:hidden fixed top-[68px] left-0 right-0 z-40 glass border-b border-slate-200/70 shadow-xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: menuOpen ? 'translateY(0)' : 'translateY(-110%)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex flex-col gap-1">

          {/* Liens de navigation */}
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => handleNavClick(href)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
            >
              {label}
            </a>
          ))}

          {/* Séparateur */}
          <div className="my-2 h-px bg-slate-200/80" />

          {/* CTA mobile */}
          <button
            onClick={() => { setMenuOpen(false); onNavigate('auth'); }}
            className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-700 px-4 py-3 rounded-xl hover:bg-slate-100 transition cursor-pointer"
          >
            Connexion
          </button>
          <button
            onClick={() => { setMenuOpen(false); onNavigate('auth'); }}
            className="flex items-center justify-center gap-2 text-sm font-semibold text-white px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 shadow-sm transition cursor-pointer"
          >
            Essai gratuit
            <Icon name="arrow-right" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
