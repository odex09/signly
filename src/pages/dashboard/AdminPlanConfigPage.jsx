import React, { useState } from 'react';
import Icon from '../../components/common/Icon';
import { useApp } from '../../context/AppContext';

export default function AdminPlanConfigPage() {
  const { planConfig, updatePlanConfig } = useApp();
  const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(planConfig)));
  const [savedMsg, setSavedMsg] = useState(false);

  const handleChange = (planId, field, value) => {
    setDraft((prev) => ({
      ...prev,
      [planId]: { ...prev[planId], [field]: field === 'docsPerMonth' || field === 'users' || field === 'price' ? Number(value) : value },
    }));
  };

  const handleSave = (planId) => {
    updatePlanConfig(planId, draft[planId]);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  const handleSaveAll = () => {
    Object.keys(draft).forEach((pid) => updatePlanConfig(pid, draft[pid]));
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1500px] w-full mx-auto animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-slate-900">
            Configuration des abonnements
          </h1>
          <p className="text-sm text-slate-500 mt-1">Paramétrez les prix et limites de chaque plan.</p>
        </div>
        <button
          onClick={handleSaveAll}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 shadow-sm transition self-start cursor-pointer"
        >
          <Icon name="check" className="w-4 h-4" />
          Tout enregistrer
        </button>
      </div>

      {savedMsg && (
        <div className="flex items-center gap-2 p-4 mb-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold animate-fade-up">
          <Icon name="check-circle" className="w-5 h-5 text-emerald-600" />
          Configuration enregistrée.
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-5">
        {Object.keys(draft).map((pid) => (
          <div key={pid} className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs">
            <h3 className="font-bold text-slate-900 text-lg mb-4 capitalize">{draft[pid].name}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Nom</label>
                <input
                  type="text"
                  value={draft[pid].name}
                  onChange={(e) => handleChange(pid, 'name', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Prix (€/mois)</label>
                <input
                  type="number"
                  value={draft[pid].price}
                  onChange={(e) => handleChange(pid, 'price', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Documents / mois (0 = illimité)</label>
                <input
                  type="number"
                  value={draft[pid].docsPerMonth === Infinity ? 0 : draft[pid].docsPerMonth}
                  onChange={(e) => handleChange(pid, 'docsPerMonth', e.target.value === '0' ? Infinity : e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Utilisateurs max</label>
                <input
                  type="number"
                  value={draft[pid].users}
                  onChange={(e) => handleChange(pid, 'users', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition outline-none"
                />
              </div>
            </div>
            <button
              onClick={() => handleSave(pid)}
              className="mt-5 w-full py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition cursor-pointer"
            >
              Enregistrer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
