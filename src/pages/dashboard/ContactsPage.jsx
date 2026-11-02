import React, { useState } from 'react';
import Icon from '../../components/common/Icon';

export default function ContactsPage({ onNavigate }) {
  const [openActions, setOpenActions] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const contacts = [
    {
      id: 1,
      name: 'Nadia Benali',
      email: 'nadia@nebula.fr',
      company: 'Nebula Studio',
      phone: '+33 1 45 22 88 10',
      docsCount: 12,
      lastActivity: 'Il y a 12 min',
      code: 'NB',
      avatarBg: 'from-sky-400 to-blue-500',
    },
    {
      id: 2,
      name: 'Victor Xiao',
      email: 'victor@vertex.io',
      company: 'Vertex Agency',
      phone: '+33 1 78 90 44 22',
      docsCount: 8,
      lastActivity: 'Il y a 2 h',
      code: 'VX',
      avatarBg: 'from-violet-400 to-purple-500',
    },
    {
      id: 3,
      name: 'Quentin Ugo',
      email: 'quentin@quantum.dev',
      company: 'Quantum Labs',
      phone: '+33 6 12 45 78 90',
      docsCount: 21,
      lastActivity: 'Hier',
      code: 'QU',
      avatarBg: 'from-emerald-400 to-teal-500',
    },
    {
      id: 4,
      name: 'Léa Urbain',
      email: 'lea@lumio.fr',
      company: 'Lumio SARL',
      phone: '+33 4 78 22 11 09',
      docsCount: 4,
      lastActivity: 'Hier · 16:48',
      code: 'LU',
      avatarBg: 'from-rose-400 to-pink-500',
    },
    {
      id: 5,
      name: 'Arthur Roche',
      email: 'arthur@arcade.studio',
      company: 'Arcade Studio',
      phone: '+33 1 55 66 77 88',
      docsCount: 6,
      lastActivity: '03 oct. 2025',
      code: 'AR',
      avatarBg: 'from-amber-400 to-orange-500',
    },
  ];

  const filteredContacts = contacts.filter((c) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
  });

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1500px] w-full mx-auto animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-slate-900">
            Contacts
          </h1>
          <p className="text-sm text-slate-500 mt-1">Vos signataires et destinataires, centralisés.</p>
        </div>
        <button 
          onClick={() => onNavigate('sign')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 shadow-sm transition self-start cursor-pointer"
        >
          <Icon name="user-plus" className="w-4 h-4" />
          Ajouter un contact
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-5 text-white relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/15 rounded-full blur-xl pointer-events-none"></div>
          <div className="relative">
            <p className="text-[12px] text-emerald-100 font-medium">Contacts</p>
            <p className="text-3xl font-extrabold mt-1">248</p>
            <p className="text-[11px] text-emerald-100 mt-1">+14 ce mois</p>
          </div>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 p-5">
          <p className="text-[12px] text-slate-500 font-medium">Signataires actifs</p>
          <p className="text-3xl font-extrabold mt-1 text-slate-900">186</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">↑ 6,2%</p>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 p-5">
          <p className="text-[12px] text-slate-500 font-medium">Documents signés</p>
          <p className="text-3xl font-extrabold mt-1 text-slate-900">512</p>
          <p className="text-[11px] text-slate-400 mt-1">Total cumulé</p>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 p-5">
          <p className="text-[12px] text-slate-500 font-medium">Délai moyen</p>
          <p className="text-3xl font-extrabold mt-1 text-slate-900">4,2 h</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">↓ 1,3 h</p>
        </div>
      </div>

      {/* Contacts Table Card */}
      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Icon name="search" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un contact par nom, email ou entreprise..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100/70 border border-transparent text-sm placeholder-slate-400 focus:bg-white focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10 transition outline-none"
            />
          </div>
          <button className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer">
            <Icon name="filter" className="w-4 h-4" />
            Filtrer
          </button>
        </div>

        <div className="overflow-x-auto scroll-slim">
          <table className="w-full text-sm min-w-[760px]">
            <thead>
              <tr className="text-left text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/60 border-b border-slate-100">
                <th className="px-5 py-3.5 font-bold">Contact</th>
                <th className="px-3 py-3.5 font-bold">Entreprise</th>
                <th className="px-3 py-3.5 font-bold">Téléphone</th>
                <th className="px-3 py-3.5 font-bold">Documents</th>
                <th className="px-3 py-3.5 font-bold">Dernière activité</th>
                <th className="px-5 py-3.5 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredContacts.map((contact, idx) => (
                <tr key={contact.id} className="hover:bg-slate-50/70 transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${contact.avatarBg} grid place-items-center text-white text-xs font-bold shrink-0 shadow-sm`}>
                        {contact.code}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{contact.name}</p>
                        <p className="text-[11px] text-slate-400">{contact.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-slate-700">{contact.company}</td>
                  <td className="px-3 py-4 text-slate-600">{contact.phone}</td>
                  <td className="px-3 py-4">
                    <span className="px-2 py-1 rounded-md bg-slate-100 text-[11px] font-bold text-slate-600">
                      {contact.docsCount}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-slate-600">{contact.lastActivity}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="relative inline-block">
                      <button 
                        onClick={() => setOpenActions(openActions === idx ? null : idx)}
                        className="w-7 h-7 rounded-lg grid place-items-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition cursor-pointer"
                        title="Actions"
                      >
                        <Icon name={openActions === idx ? 'x' : 'more'} className="w-4 h-4" />
                      </button>
                      {openActions === idx && (
                        <div className="absolute right-0 mt-1 z-50 w-44 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 animate-fade-up">
                          <button 
                            onClick={() => setOpenActions(null)}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition cursor-pointer text-left"
                          >
                            <Icon name="edit" className="w-4 h-4 text-emerald-600" />
                            Modifier
                          </button>
                          <button 
                            onClick={() => setOpenActions(null)}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition cursor-pointer text-left"
                          >
                            <Icon name="send" className="w-4 h-4 text-emerald-600" />
                            Envoyer
                          </button>
                          <button 
                            onClick={() => setOpenActions(null)}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 transition cursor-pointer text-left"
                          >
                            <Icon name="trash" className="w-4 h-4" />
                            Supprimer
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
