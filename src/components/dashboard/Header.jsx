import React, { useState, useRef, useEffect } from 'react';
import Icon from '../common/Icon';

export default function Header({ onToggleSidebar, onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const profileRef = useRef(null);
  const notifRef   = useRef(null);

  // Fermer les dropdowns si clic en dehors
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const profileMenuItems = [
    {
      icon: 'user',
      label: 'Mon profil',
      sub: 'chef@monentreprise.fr',
      action: 'profile',
      highlight: false,
    },
    {
      icon: 'settings',
      label: 'Paramètres',
      sub: null,
      action: 'settings',
      highlight: false,
    },
    {
      icon: 'credit-card',
      label: 'Facturation',
      sub: null,
      action: 'billing',
      highlight: false,
    },
  ];

  return (
    <header className="sticky top-0 z-20 h-[68px] bg-white backdrop-blur-xl flex items-center gap-4 px-4 sm:px-6 shrink-0 shadow-sm">

      {/* Toggle sidebar mobile */}
      <button
        onClick={onToggleSidebar}
        className="lg:hidden w-9 h-9 rounded-lg grid place-items-center text-slate-600 hover:bg-slate-100 transition cursor-pointer"
        aria-label="Ouvrir le menu"
      >
        <Icon name="menu" className="w-5 h-5" />
      </button>

      {/* Logo — visible uniquement sur mobile */}
      <button
        onClick={() => onNavigate('dashboard')}
        className="lg:hidden flex items-center gap-2 cursor-pointer"
      >
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 grid place-items-center shadow-md shadow-emerald-500/30">
          <Icon name="pen" className="w-4 h-4 text-white" />
        </div>
        <span className="text-[17px] font-extrabold tracking-tight text-slate-900">Signly</span>
      </button>

      {/* Barre de recherche */}
      <div className="flex-1 max-w-md relative hidden sm:block">
        <Icon name="search" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un document, un contact..."
          className="w-full pl-10 pr-16 py-2.5 rounded-xl bg-slate-100/80 border border-transparent text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10 transition outline-none"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border border-slate-300 bg-white text-[10px] font-semibold text-slate-500 pointer-events-none">
          ⌘K
        </kbd>
      </div>

      <div className="flex items-center gap-1.5 ml-auto">

        {/* Bouton IA */}
        <button
          title="Assistant IA Signly"
          className="w-9 h-9 rounded-lg grid place-items-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition cursor-pointer"
        >
          <Icon name="sparkles" className="w-[18px] h-[18px] text-teal-600" />
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setShowNotifications((o) => !o); setShowProfile(false); }}
            className="relative w-9 h-9 rounded-lg grid place-items-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition cursor-pointer"
            aria-label="Notifications"
          >
            <Icon name="bell" className="w-[18px] h-[18px]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="
              fixed right-4 left-4 sm:left-auto
              sm:absolute sm:right-0 sm:w-80
              top-[72px] sm:top-auto sm:mt-2
              bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-fade-up
            ">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Notifications</span>
                <span className="text-[11px] font-semibold text-emerald-600 hover:underline cursor-pointer">
                  Tout marquer comme lu
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-100">
                  <p className="font-semibold text-slate-900">Nebula Studio a signé le contrat</p>
                  <p className="text-slate-500 text-[10px] mt-0.5">Il y a 12 minutes</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <p className="font-semibold text-slate-900">Vertex Agency a ouvert le NDA</p>
                  <p className="text-slate-500 text-[10px] mt-0.5">Il y a 2 heures</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-slate-200 mx-1.5" />

        {/* Avatar + Dropdown profil */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { setShowProfile((o) => !o); setShowNotifications(false); }}
            className={`w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 grid place-items-center text-white text-xs font-bold transition cursor-pointer ${showProfile ? 'ring-4 ring-emerald-500/20' : 'hover:ring-4 hover:ring-emerald-500/15'}`}
            title="Mon profil & paramètres"
            aria-expanded={showProfile}
            aria-haspopup="true"
          >
            CM
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-fade-up">

              {/* En-tête profil */}
              <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-br from-emerald-50 to-teal-50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 grid place-items-center text-white text-xs font-bold shrink-0">
                    CM
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">Chef Martin</p>
                    <p className="text-[11px] text-slate-500 truncate">chef@monentreprise.fr</p>
                  </div>
                </div>
              </div>

              {/* Items du menu */}
              <div className="py-1.5">
                {profileMenuItems.map((item) => (
                  <button
                    key={item.action}
                    onClick={() => { setShowProfile(false); onNavigate(item.action); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition cursor-pointer text-left"
                  >
                    <Icon name={item.icon} className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Déconnexion */}
              <div className="border-t border-slate-100 py-1.5">
                <button
                  onClick={() => { setShowProfile(false); onNavigate('logout'); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition cursor-pointer text-left"
                >
                  <Icon name="log-out" className="w-4 h-4 shrink-0" />
                  <span className="font-medium">Se déconnecter</span>
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </header>
  );
}
