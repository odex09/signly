import React from 'react';
import Icon from '../../components/common/Icon';
import { useApp } from '../../context/AppContext';

export default function DashboardHome({ onNavigate }) {
  const { plan, plans, documents, docsThisMonth, canSign, isAdmin } = useApp();
  const currentPlan = plans[plan];
  const limit = currentPlan.docsPerMonth;
  const used = docsThisMonth();
  const remaining = limit === Infinity ? '∞' : Math.max(0, limit - used);
  const recent = documents.slice(0, 5);

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    } catch {
      return '';
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1500px] w-full mx-auto animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-slate-900">
            Tableau de bord
          </h1>
          <p className="text-sm text-slate-500 mt-1">Voici l'état de vos signatures aujourd'hui.</p>
        </div>
      </div>

      {/* Usage card */}
      <div className="grid sm:grid-cols-3 gap-4 mb-7">
        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[12px] text-slate-500 font-medium">Plan actuel</p>
            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold">{currentPlan.name}</span>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            {currentPlan.price === 0 ? 'Gratuit' : `${currentPlan.price} €/mois`}
          </p>
          <button onClick={() => onNavigate('billing')} className="mt-3 text-xs font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer">
            Gérer l'abonnement →
          </button>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
          <p className="text-[12px] text-slate-500 font-medium">Documents ce mois</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">
            {used} <span className="text-base font-medium text-slate-400">/ {limit === Infinity ? '∞' : limit}</span>
          </p>
          <div className="mt-3 h-1.5 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
              style={{ width: limit === Infinity ? '30%' : `${Math.min(100, (used / limit) * 100)}%` }}
            />
          </div>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
          <p className="text-[12px] text-slate-500 font-medium">Documents restants</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{remaining}</p>
          <p className="text-xs text-slate-400 mt-1">
            {canSign() ? 'Vous pouvez signer de nouveaux documents.' : 'Limite atteinte — passez au plan supérieur.'}
          </p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-7">
        <button
          onClick={() => onNavigate('sign')}
          className="w-full rounded-2xl bg-white border border-slate-200 p-6 text-left card-hover hover:border-emerald-300 transition cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 grid place-items-center mb-4">
            <Icon name="plus" className="w-6 h-6" />
          </div>
          <p className="text-lg font-bold text-slate-900">Signer un document</p>
          <p className="text-sm text-slate-500 mt-1">Envoyez un document à signer</p>
        </button>
        <button
          onClick={() => onNavigate('documents')}
          className="w-full rounded-2xl bg-white border border-slate-200 p-6 text-left card-hover hover:border-emerald-300 transition cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 grid place-items-center mb-4">
            <Icon name="file-text" className="w-6 h-6" />
          </div>
          <p className="text-lg font-bold text-slate-900">Mes documents</p>
          <p className="text-sm text-slate-500 mt-1">{documents.length} document(s) enregistré(s)</p>
        </button>
        <button
          onClick={() => onNavigate('templates')}
          className="w-full rounded-2xl bg-white border border-slate-200 p-6 text-left card-hover hover:border-emerald-300 transition cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 grid place-items-center mb-4">
            <Icon name="layers" className="w-6 h-6" />
          </div>
          <p className="text-lg font-bold text-slate-900">Modèles</p>
          <p className="text-sm text-slate-500 mt-1">Réutilisez vos contrats types</p>
        </button>
      </div>

      {/* Admin section */}
      {isAdmin && (
        <div className="mb-7">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Administration</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <button
              onClick={() => onNavigate('admin-users')}
              className="w-full rounded-2xl bg-white border border-slate-200 p-6 text-left card-hover hover:border-emerald-300 transition cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 grid place-items-center mb-4">
                <Icon name="users" className="w-6 h-6" />
              </div>
              <p className="text-lg font-bold text-slate-900">Utilisateurs</p>
              <p className="text-sm text-slate-500 mt-1">Gérer les comptes et rôles</p>
            </button>
            <button
              onClick={() => onNavigate('admin-subscriptions')}
              className="w-full rounded-2xl bg-white border border-slate-200 p-6 text-left card-hover hover:border-emerald-300 transition cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 grid place-items-center mb-4">
                <Icon name="credit-card" className="w-6 h-6" />
              </div>
              <p className="text-lg font-bold text-slate-900">Abonnements</p>
              <p className="text-sm text-slate-500 mt-1">Attribuer les plans</p>
            </button>
            <button
              onClick={() => onNavigate('admin-plans')}
              className="w-full rounded-2xl bg-white border border-slate-200 p-6 text-left card-hover hover:border-emerald-300 transition cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 grid place-items-center mb-4">
                <Icon name="settings" className="w-6 h-6" />
              </div>
              <p className="text-lg font-bold text-slate-900">Config. plans</p>
              <p className="text-sm text-slate-500 mt-1">Prix et limites</p>
            </button>
          </div>
        </div>
      )}

      {/* Recent documents */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">Documents récents</h2>
          <button onClick={() => onNavigate('documents')} className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer">
            Voir tout
          </button>
        </div>
        {recent.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-500">
            Aucun document pour le moment.
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {recent.map((d) => (
              <li key={d.id} className="flex items-center justify-between gap-3 px-6 py-3 hover:bg-slate-50/50 transition">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 grid place-items-center shrink-0">
                    <Icon name="file-text" className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{d.name}</p>
                    <p className="text-[11px] text-slate-400">{formatDate(d.date)}</p>
                  </div>
                </div>
                <button onClick={() => onNavigate('documents')} className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer shrink-0">
                  Ouvrir
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}