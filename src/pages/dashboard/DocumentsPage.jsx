import React, { useState } from 'react';
import Icon from '../../components/common/Icon';
import { useApp } from '../../context/AppContext';

export default function DocumentsPage({ onNavigate }) {
  const { documents, removeDocument } = useApp();
  const [query, setQuery] = useState('');

  const filtered = documents.filter((d) =>
    (d.name || '').toLowerCase().includes(query.toLowerCase())
  );

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return iso;
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1500px] w-full mx-auto animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-slate-900">
            Mes documents
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Retrouvez tous vos documents signés et téléchargez-les à nouveau.
          </p>
        </div>
        <button
          onClick={() => onNavigate('sign')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 shadow-sm transition self-start cursor-pointer"
        >
          <Icon name="plus" className="w-4 h-4" />
          Nouveau document
        </button>
      </div>

      {/* Search */}
      <div className="mb-5 max-w-md relative">
        <Icon name="search" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un document..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10 transition outline-none"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl bg-white border border-slate-200 p-10 text-center">
          <Icon name="file-text" className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-700">Aucun document pour le moment</p>
          <p className="text-xs text-slate-500 mt-1 mb-5">
            Signez votre premier document depuis la salle de signature.
          </p>
          <button
            onClick={() => onNavigate('sign')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition cursor-pointer"
          >
            <Icon name="plus" className="w-4 h-4" />
            Signer un document
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="text-left px-6 py-3 font-semibold">Document</th>
                <th className="text-left px-6 py-3 font-semibold hidden sm:table-cell">Date</th>
                <th className="text-left px-6 py-3 font-semibold hidden md:table-cell">Signatures</th>
                <th className="text-right px-6 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((doc) => (
                <tr key={doc.id} className="border-t border-slate-100 hover:bg-slate-50/50 transition">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 grid place-items-center shrink-0">
                        <Icon name="file-text" className="w-4 h-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-medium text-slate-900 truncate">{doc.name}</p>
                        <p className="text-[11px] text-slate-400 sm:hidden">{formatDate(doc.date)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-slate-600 hidden sm:table-cell">{formatDate(doc.date)}</td>
                  <td className="px-6 py-3 text-slate-600 hidden md:table-cell">{doc.signaturesCount ?? 0}</td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onNavigate('sign')}
                        className="text-emerald-600 hover:underline font-medium text-xs"
                      >
                        Ouvrir
                      </button>
                      <button
                        onClick={() => removeDocument(doc.id)}
                        className="text-rose-600 hover:text-rose-700 p-1 rounded transition"
                        title="Supprimer"
                      >
                        <Icon name="trash" className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}