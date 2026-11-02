import React, { useState } from 'react';
import Icon from '../../components/common/Icon';

export default function AuditPage() {
  const [selectedDoc, setSelectedDoc] = useState('nebula');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1200px] w-full mx-auto animate-fade-up">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-slate-900">
          Piste d'audit
        </h1>
        <p className="text-sm text-slate-500 mt-1">Chaque action est horodatée, géolocalisée et scellée.</p>
      </div>

      {/* Filter box */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 mb-5 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Icon name="search" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher dans la piste d'audit..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100/70 border border-transparent text-sm placeholder-slate-400 focus:bg-white focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10 transition outline-none"
            />
          </div>
          <select 
            value={selectedDoc}
            onChange={(e) => setSelectedDoc(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition cursor-pointer outline-none"
          >
            <option value="all">Tous les documents</option>
            <option value="nebula">Contrat de prestation — Nebula</option>
            <option value="vertex">NDA — Vertex Agency</option>
            <option value="quantum">Bon de commande — Quantum Labs</option>
          </select>
          <button className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer">
            <Icon name="download" className="w-4 h-4" />
            Exporter
          </button>
        </div>
      </div>

      {/* Audit Certificate Card */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-7 shadow-xs">
        <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 grid place-items-center shrink-0">
            <Icon name="file-text" className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-900 truncate">Contrat de prestation — Nebula</p>
            <p className="text-[11px] text-slate-400 truncate">
              ID : doc_8f3a2c9e · Empreinte SHA-256 : a4f8e912c4b8214...9c2d
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold">
            En attente
          </span>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-slate-200 pointer-events-none"></div>
          
          <div className="space-y-7">
            {/* 1 */}
            <div className="relative flex gap-4">
              <div className="relative z-10 w-10 h-10 rounded-full bg-slate-100 grid place-items-center shrink-0 ring-4 ring-white">
                <Icon name="file-text" className="w-4 h-4 text-slate-500" />
              </div>
              <div className="min-w-0 pt-1.5">
                <p className="text-sm font-semibold text-slate-900">Document créé</p>
                <p className="text-[12px] text-slate-500 mt-0.5">Par Camille Moreau · 12 oct. 2025 à 09:14:22</p>
                <p className="text-[11px] text-slate-400 mt-1 font-mono">IP : 82.64.12.45 · Paris, France</p>
              </div>
            </div>

            {/* 2 */}
            <div className="relative flex gap-4">
              <div className="relative z-10 w-10 h-10 rounded-full bg-teal-50 text-teal-600 grid place-items-center shrink-0 ring-4 ring-white">
                <Icon name="send" className="w-4 h-4" />
              </div>
              <div className="min-w-0 pt-1.5">
                <p className="text-sm font-semibold text-slate-900">Envoyé à 2 signataires</p>
                <p className="text-[12px] text-slate-500 mt-0.5">12 oct. 2025 à 09:15:03 · nadia@nebula.fr, camille@studio.fr</p>
                <p className="text-[11px] text-slate-400 mt-1 font-mono">IP : 82.64.12.45 · Serveur mail SMTP TLS</p>
              </div>
            </div>

            {/* 3 */}
            <div className="relative flex gap-4">
              <div className="relative z-10 w-10 h-10 rounded-full bg-sky-50 text-sky-600 grid place-items-center shrink-0 ring-4 ring-white">
                <Icon name="eye" className="w-4 h-4" />
              </div>
              <div className="min-w-0 pt-1.5">
                <p className="text-sm font-semibold text-slate-900">Document ouvert par Nadia Benali</p>
                <p className="text-[12px] text-slate-500 mt-0.5">12 oct. 2025 à 10:02:47</p>
                <p className="text-[11px] text-slate-400 mt-1 font-mono">IP : 91.170.88.12 · Lyon, France · Chrome 128 MacOS</p>
              </div>
            </div>

            {/* 4 */}
            <div className="relative flex gap-4">
              <div className="relative z-10 w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 grid place-items-center shrink-0 ring-4 ring-white">
                <Icon name="pen" className="w-4 h-4" />
              </div>
              <div className="min-w-0 pt-1.5">
                <p className="text-sm font-semibold text-slate-900">Signature apposée par Nadia Benali</p>
                <p className="text-[12px] text-slate-500 mt-0.5">12 oct. 2025 à 10:08:31</p>
                <p className="text-[11px] text-slate-400 mt-1 font-mono">
                  IP : 91.170.88.12 · Horodatage qualifié : 2025-10-12T10:08:31Z · Certificat eIDAS #992183
                </p>
              </div>
            </div>

            {/* 5 */}
            <div className="relative flex gap-4">
              <div className="relative z-10 w-10 h-10 rounded-full bg-amber-50 text-amber-600 grid place-items-center shrink-0 ring-4 ring-white">
                <Icon name="clock" className="w-4 h-4" />
              </div>
              <div className="min-w-0 pt-1.5">
                <p className="text-sm font-semibold text-slate-900">En attente de la signature finale</p>
                <p className="text-[12px] text-slate-500 mt-0.5">Relance automatique programmée le 15 oct. 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Verification badges & certificate download */}
        <div className="mt-7 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-bold">
            <Icon name="shield-check" className="w-3.5 h-3.5" />
            Scellé cryptographiquement
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-bold">
            <Icon name="fingerprint" className="w-3.5 h-3.5" />
            Empreinte SHA-256
          </span>
          <button className="ml-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer">
            <Icon name="download" className="w-3.5 h-3.5" />
            Télécharger le certificat d'audit
          </button>
        </div>
      </div>
    </div>
  );
}
