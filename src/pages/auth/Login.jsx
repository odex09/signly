import React, { useState } from 'react';
import Icon from '../../components/common/Icon';
import { useApp } from '../../context/AppContext';

export default function Login({ onNavigate, onSwitchToRegister }) {
  const { setUser } = useApp();
  const [email, setEmail] = useState('camille@studio.fr');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isAdmin = email.toLowerCase().includes('admin');
    setUser((u) => ({ ...u, email, role: isAdmin ? 'admin' : 'user', firstName: email.split('@')[0] }));
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Left Showcase (Desktop) */}
      <div className="hidden lg:flex relative overflow-hidden bg-slate-900 flex-col justify-between p-12">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-emerald-600/40 rounded-full blur-[110px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-cyan-600/30 rounded-full blur-[110px] pointer-events-none"></div>

        <div className="relative z-10">
          <button 
            onClick={() => onNavigate('landing')} 
            className="flex items-center gap-2.5 cursor-pointer text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 grid place-items-center shadow-lg shadow-emerald-500/25">
              <Icon name="pen" className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-white">Signly</span>
          </button>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold tracking-[-0.03em] text-white leading-[1.15]">
            Signez vos documents<br />en quelques secondes.
          </h2>
          <p className="mt-5 text-slate-400 text-lg max-w-sm leading-relaxed">
            Rejoignez 20 000 entreprises qui ont digitalisé leurs signatures en toute sécurité.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-slate-900"></div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-sky-500 border-2 border-slate-900"></div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 border-2 border-slate-900"></div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-slate-900"></div>
            </div>
            <div>
              <div className="flex gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="star" className="w-3.5 h-3.5 fill-current" stroke="none" />
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-1">4,9/5 sur 3 200+ avis</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-slate-500">
          © 2025 Signly SAS · Tous droits réservés
        </div>
      </div>

      {/* Right Form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[400px]">
          <button 
            onClick={() => onNavigate('landing')} 
            className="lg:hidden flex items-center gap-2.5 mb-10 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 grid place-items-center">
              <Icon name="pen" className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900">Signly</span>
          </button>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Bon retour 👋</h1>
          <p className="mt-2 text-slate-500 text-sm">Connectez-vous pour accéder à vos documents.</p>

          <div className="mt-8 space-y-3">
            <button 
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition cursor-pointer"
            >
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Continuer avec Google
            </button>
            <button 
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition cursor-pointer"
            >
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/>
              </svg>
              Continuer avec LinkedIn
            </button>
          </div>

          <div className="flex items-center gap-4 my-6">
            <div className="h-px flex-1 bg-slate-200"></div>
            <span className="text-xs font-medium text-slate-400">ou</span>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Adresse email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition outline-none" 
                placeholder="vous@exemple.fr"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-slate-700">Mot de passe</label>
                <a href="#" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">Oublié ?</a>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition outline-none" 
                placeholder="••••••••"
              />
            </div>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <span className="text-sm text-slate-600">Se souvenir de moi</span>
            </label>
            <button 
              type="submit" 
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/35 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Se connecter
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-500">
            Pas encore de compte ?{' '}
            <button 
              type="button"
              onClick={onSwitchToRegister || (() => onNavigate('dashboard'))} 
              className="font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer"
            >
              Créer un compte gratuit
            </button>
          </p>
          <p className="mt-6 text-center text-xs text-slate-400 leading-relaxed">
            En continuant, vous acceptez nos <a href="#" className="underline hover:text-slate-600">CGU</a> et notre <a href="#" className="underline hover:text-slate-600">Politique de confidentialité</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
