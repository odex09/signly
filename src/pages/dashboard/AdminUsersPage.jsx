import React, { useState } from 'react';
import Icon from '../../components/common/Icon';
import { useApp } from '../../context/AppContext';

export default function AdminUsersPage() {
  const { users, updateUserRole, deleteUser } = useApp();
  const [query, setQuery] = useState('');

  const filtered = users.filter((u) =>
    (u.name + ' ' + u.email).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1500px] w-full mx-auto animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-slate-900">
            Gestion des utilisateurs
          </h1>
          <p className="text-sm text-slate-500 mt-1">Administrez les comptes et les rôles.</p>
        </div>
      </div>

      <div className="mb-5 max-w-md relative">
        <Icon name="search" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un utilisateur..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10 transition outline-none"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="text-left px-6 py-3 font-semibold">Utilisateur</th>
              <th className="text-left px-6 py-3 font-semibold hidden sm:table-cell">Rôle</th>
              <th className="text-left px-6 py-3 font-semibold hidden md:table-cell">Plan</th>
              <th className="text-left px-6 py-3 font-semibold hidden lg:table-cell">Statut</th>
              <th className="text-right px-6 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-t border-slate-100 hover:bg-slate-50/50 transition">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 grid place-items-center text-white text-xs font-bold shrink-0">
                      {u.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-slate-900 truncate">{u.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3 hidden sm:table-cell">
                  <select
                    value={u.role}
                    onChange={(e) => updateUserRole(u.id, e.target.value)}
                    className="px-2 py-1 rounded-lg border border-slate-200 text-xs cursor-pointer"
                  >
                    <option value="user">Utilisateur</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-6 py-3 text-slate-600 hidden md:table-cell capitalize">{u.plan}</td>
                <td className="px-6 py-3 hidden lg:table-cell">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${u.status === 'actif' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-right">
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="text-rose-600 hover:text-rose-700 p-1 rounded transition cursor-pointer"
                    title="Supprimer"
                  >
                    <Icon name="trash" className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
