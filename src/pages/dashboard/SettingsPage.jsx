import React, { useState } from 'react';
import Icon from '../../components/common/Icon';
import { useApp } from '../../context/AppContext';

const INPUT_CLS =
  'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition outline-none';

export default function SettingsPage({ onNavigate }) {
  const { plan, plans, upgradePlan, switchRole, isAdmin } = useApp();
  const [savedMsg, setSavedMsg] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(plan);

  const handleSavePlan = () => {
    upgradePlan(currentPlan);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1000px] w-full mx-auto animate-fade-up">
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
        <button onClick={() => onNavigate('dashboard')} className="hover:text-emerald-600 transition cursor-pointer">
          Tableau de bord
        </button>
        <Icon name="chevron-right" className="w-3.5 h-3.5" />
        <span className="text-slate-700 font-semibold">Paramètres</span>
      </div>

      <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-slate-900 mb-7">
        Paramètres
      </h1>

      {savedMsg && (
        <div className="flex items-center gap-2 p-4 mb-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold animate-fade-up">
          <Icon name="check-circle" className="w-5 h-5 text-emerald-600" />
          Paramètres enregistrés.
        </div>
      )}

      {/* Plan */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xs mb-6">
        <h3 className="font-bold text-slate-900 mb-1">Plan d'abonnement</h3>
        <p className="text-xs text-slate-500 mb-5">Choisissez le plan qui correspond à vos besoins.</p>
        <div className="grid sm:grid-cols-3 gap-3 mb-5">
          {Object.values(plans).map((p) => {
            const active = currentPlan === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setCurrentPlan(p.id)}
                className={`text-left p-4 rounded-xl border transition cursor-pointer ${
                  active
                    ? 'border-emerald-400 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <p className="font-bold text-slate-900">{p.name}</p>
                <p className="text-lg font-extrabold text-slate-900 mt-1">
                  {p.price === 0 ? 'Gratuit' : `${p.price} €`}
                  {p.price > 0 && <span className="text-xs font-medium text-slate-500">/mois</span>}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  {p.docsPerMonth === Infinity ? 'Documents illimités' : `${p.docsPerMonth} documents/mois`}
                </p>
              </button>
            );
          })}
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSavePlan}
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition cursor-pointer"
          >
            Enregistrer le plan
          </button>
        </div>
      </div>

      {/* Préférences */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xs mb-6">
        <h3 className="font-bold text-slate-900 mb-4">Préférences</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Langue</label>
            <select className={INPUT_CLS + ' cursor-pointer'}>
              <option>Français</option>
              <option>English</option>
              <option>Español</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Fuseau horaire</label>
            <select className={INPUT_CLS + ' cursor-pointer'}>
              <option>Europe/Paris (GMT+1)</option>
              <option>Europe/London (GMT)</option>
              <option>America/New_York (GMT-5)</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end mt-5 pt-4 border-t border-slate-100">
          <button
            onClick={() => { setSavedMsg(true); setTimeout(() => setSavedMsg(false), 3000); }}
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition cursor-pointer"
          >
            Enregistrer
          </button>
        </div>
      </div>

      {/* Rôle (démo) */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xs mb-6">
        <h3 className="font-bold text-slate-900 mb-1">Rôle (démo)</h3>
        <p className="text-xs text-slate-500 mb-4">
          Basculez entre utilisateur et administrateur pour tester l'interface admin.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => switchRole('user')}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
              !isAdmin ? 'bg-slate-900 text-white' : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Utilisateur
          </button>
          <button
            onClick={() => switchRole('admin')}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
              isAdmin ? 'bg-slate-900 text-white' : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Administrateur
          </button>
        </div>
      </div>

      {/* Danger */}
      <div className="rounded-2xl bg-white border border-rose-200 p-5 sm:p-6 shadow-xs">
        <h3 className="font-bold text-rose-700 mb-1">Zone de danger</h3>
        <p className="text-xs text-slate-500 mb-4">Ces actions sont définitives et irréversibles.</p>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2.5 rounded-xl border border-rose-200 text-rose-600 text-sm font-semibold hover:bg-rose-50 transition cursor-pointer">
            Désactiver mon compte
          </button>
          <button className="px-4 py-2.5 rounded-xl bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 transition cursor-pointer">
            Supprimer mon compte
          </button>
        </div>
      </div>
    </div>
  );
}