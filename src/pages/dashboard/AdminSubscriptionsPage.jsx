import React, { useState } from 'react';
import Icon from '../../components/common/Icon';
import { useApp } from '../../context/AppContext';

export default function AdminSubscriptionsPage() {
  const { users, updateUserPlan, planConfig } = useApp();
  const [query, setQuery] = useState('');

  const filtered = users.filter((u) =>
    (u.name + ' ' + u.email).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1500px] w-full mx-auto animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-slate-900">
            Gestion des abonnements
          </h1>
          <p className="text-sm text-slate-500 mt-1">Attribuez et modifiez les plans des utilisateurs.</p>
        </div>
      </div>

      <div className="mb-5 max-w-md relative">
        <Icon name="search" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10 transition outline-none"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="text-left px-6 py-3 font-semibold">Utilisateur</th>
              <th className="text-left px-6 py-3 font-semibold">Plan actuel</th>
              <th className="text-left px-6 py-3 font-semibold">Changer de plan</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-t border-slate-100 hover:bg-slate-50/50 transition">
                <td className="px-6 py-3">
                  <div>
                    <p className="font-medium text-slate-900">{u.name}</p>
                    <p className="text-[11px] text-slate-400">{u.email}</p>
                  </div>
                </td>
                <td className="px-6 py-3 capitalize font-semibold text-slate-700">{u.plan}</td>
                <td className="px-6 py-3">
                  <select
                    value={u.plan}
                    onChange={(e) => updateUserPlan(u.id, e.target.value)}
                    className="px-2 py-1 rounded-lg border border-slate-200 text-xs cursor-pointer"
                  >
                    {Object.keys(planConfig).map((p) => (
                      <option key={p} value={p}>{planConfig[p].name}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
