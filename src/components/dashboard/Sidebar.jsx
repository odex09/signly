import React from 'react';
import Icon from '../common/Icon';
import { useApp } from '../../context/AppContext';

export default function Sidebar({ currentPage, onNavigate, isOpen, onClose }) {
  const { isAdmin, user } = useApp();
  const mainNav = [
    { id: 'dashboard', label: 'Tableau de bord', icon: 'home' },
    { id: 'documents', label: 'Mes documents', icon: 'file-text' },
    { id: 'templates', label: 'Modèles', icon: 'layers' },
    { id: 'billing', label: 'Facturation', icon: 'credit-card' },
  ];

  const analyticsNav = [
    { id: 'reports', label: 'Rapports', icon: 'chart' },
  ];

  const adminNav = [
    { id: 'admin-users', label: 'Utilisateurs', icon: 'users' },
    { id: 'admin-subscriptions', label: 'Abonnements', icon: 'credit-card' },
    { id: 'admin-plans', label: 'Config. plans', icon: 'settings' },
  ];

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-[260px] bg-white flex flex-col shadow-sm transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-[68px] flex items-center justify-between px-5 shrink-0">
          <button 
            onClick={() => onNavigate('landing')} 
            className="flex items-center gap-2.5 cursor-pointer text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 grid place-items-center shadow-lg shadow-emerald-500/25">
              <Icon name="pen" className="w-5 h-5 text-white" />
            </div>
            <span className="text-[17px] font-extrabold tracking-tight text-slate-900">Signly</span>
          </button>
          <button 
            onClick={onClose} 
            className="lg:hidden w-8 h-8 rounded-lg grid place-items-center text-slate-400 hover:bg-slate-100"
          >
            <Icon name="x" className="w-4 h-4" />
          </button>
        </div>

        <div className="px-3 py-4 flex-1 overflow-y-auto scroll-slim">
          <button 
            onClick={() => handleNavClick('sign')} 
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/35 transition mb-5 cursor-pointer"
          >
            <Icon name="plus" className="w-4 h-4" />
            <span>Signer un document</span>
          </button>

          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Principal</p>
          <nav className="space-y-0.5 mb-6">
            {mainNav.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition cursor-pointer text-left ${
                    active 
                      ? 'bg-emerald-50 text-emerald-800 font-semibold' 
                      : 'text-slate-800 hover:bg-slate-50 hover:text-slate-900 font-medium'
                  }`}
                >
                  <Icon name={item.icon} className={`w-[18px] h-[18px] ${active ? 'text-emerald-600' : 'text-slate-600'}`} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-600">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Analyse</p>
          <nav className="space-y-0.5 mb-6">
            {analyticsNav.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition cursor-pointer text-left ${
                    active 
                      ? 'bg-emerald-50 text-emerald-800 font-semibold' 
                      : 'text-slate-800 hover:bg-slate-50 hover:text-slate-900 font-medium'
                  }`}
                >
                  <Icon name={item.icon} className={`w-[18px] h-[18px] ${active ? 'text-emerald-600' : 'text-slate-600'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {isAdmin && (
            <>
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Administration</p>
              <nav className="space-y-0.5 mb-6">
                {adminNav.map((item) => {
                  const active = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition cursor-pointer text-left ${
                        active
                          ? 'bg-emerald-50 text-emerald-800 font-semibold'
                          : 'text-slate-800 hover:bg-slate-50 hover:text-slate-900 font-medium'
                      }`}
                    >
                      <Icon name={item.icon} className={`w-[18px] h-[18px] ${active ? 'text-emerald-600' : 'text-slate-600'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </>
          )}

          {!isAdmin && (
            <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-4 mt-2">
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-emerald-500/40 rounded-full blur-2xl"></div>
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-white/10 grid place-items-center mb-2.5">
                <Icon name="sparkles" className="w-4 h-4 text-white" />
              </div>
              <p className="text-[13px] font-bold text-white leading-tight">Passez au plan Pro</p>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Documents illimités</p>
              <button 
                onClick={() => onNavigate('billing')} 
                className="mt-3 w-full py-2 rounded-lg bg-white text-slate-900 text-[11px] font-bold hover:bg-slate-100 transition cursor-pointer"
              >
                Découvrir
              </button>
            </div>
          </div>
          )}
        </div>

        <div className="p-3 shrink-0">
          <div 
            onClick={() => handleNavClick('dashboard')} 
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 grid place-items-center text-white text-xs font-bold shrink-0">
              CM
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-slate-900 truncate">{user?.firstName || 'Camille'} {user?.lastName || 'Moreau'}</p>
              <p className="text-[11px] text-slate-500 truncate">{isAdmin ? 'Administrateur' : 'Utilisateur'}</p>
            </div>
            <Icon name="chevron-down" className="w-4 h-4 text-slate-400 shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}
