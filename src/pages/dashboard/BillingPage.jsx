import React, { useState } from 'react';
import Icon from '../../components/common/Icon';
import { useApp } from '../../context/AppContext';

export default function BillingPage({ onNavigate }) {
  const { plan, plans, upgradePlan, documents } = useApp();
  const [selected, setSelected] = useState(plan);
  const [savedMsg, setSavedMsg] = useState(false);

  const invoices = [
    { id: 'INV-2026-014', date: '01/11/2026', amount: '19,00 €', status: 'Payée' },
    { id: 'INV-2026-013', date: '01/10/2026', amount: '19,00 €', status: 'Payée' },
    { id: 'INV-2026-012', date: '01/09/2026', amount: '19,00 €', status: 'Payée' },
  ];

  const handleUpgrade = () => {
    upgradePlan(selected);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  const currentPlan = plans[plan];

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1500px] w-full mx-auto animate-fade-up">
      <div className="mb-7">
        <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-slate-900">
          Facturation
        </h1>
        <p className="text-sm text-slate-500 mt-1">Gérez votre abonnement et vos factures.</p>
      </div>

      {savedMsg && (
        <div className="flex items-center gap-2 p-4 mb-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold animate-fade-up">
          <Icon name="check-circle" className="w-5 h-5 text-emerald-600" />
          Plan mis à jour avec succès.
        </div>
      )}

      {/* Plan actuel */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Plan actuel</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{currentPlan.name}</p>
            <p className="text-sm text-slate-500 mt-1">
              {currentPlan.price === 0 ? 'Gratuit' : `${currentPlan.price},00 € / mois`} ·{' '}
              {currentPlan.docsPerMonth === Infinity ? 'Documents illimités' : `${currentPlan.docsPerMonth} documents/mois`} ·{' '}
              {documents.length} document(s) au total
            </p>
          </div>
          <button
            onClick={() => onNavigate('settings')}
            className="px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition"
          >
            Changer de plan
          </button>
        </div>
      </div>

      {/* Choix de plan */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Changer de plan</h2>
        <div className="grid sm:grid-cols-3 gap-3 mb-5">
          {Object.values(plans).map((p) => {
            const active = selected === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
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
              </button>
            );
          })}
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleUpgrade}
            disabled={selected === plan}
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Appliquer
          </button>
        </div>
      </div>

      {/* Factures */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Historique des factures</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="text-left px-6 py-3 font-semibold">Numéro</th>
              <th className="text-left px-6 py-3 font-semibold">Date</th>
              <th className="text-left px-6 py-3 font-semibold">Montant</th>
              <th className="text-left px-6 py-3 font-semibold">Statut</th>
              <th className="text-right px-6 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-t border-slate-100">
                <td className="px-6 py-3 font-medium text-slate-900">{inv.id}</td>
                <td className="px-6 py-3 text-slate-600">{inv.date}</td>
                <td className="px-6 py-3 text-slate-600">{inv.amount}</td>
                <td className="px-6 py-3">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold">{inv.status}</span>
                </td>
                <td className="px-6 py-3 text-right">
                  <button className="text-emerald-600 hover:underline font-medium">Télécharger</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}