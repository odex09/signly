import React from 'react';
import Icon from '../../components/common/Icon';

export default function WorkflowsPage({ onNavigate }) {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1500px] w-full mx-auto animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-slate-900">
            Workflows
          </h1>
          <p className="text-sm text-slate-500 mt-1">Définissez l'ordre de signature de vos documents.</p>
        </div>
        <button 
          onClick={() => onNavigate('sign')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 shadow-sm transition self-start cursor-pointer"
        >
          <Icon name="plus" className="w-4 h-4" />
          Nouveau workflow
        </button>
      </div>

      {/* Featured Visual Pipeline Cards */}
      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        {/* Sequential Workflow Card */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 grid place-items-center">
                <Icon name="git-branch" className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Contrat client — Séquentiel</h3>
                <p className="text-[12px] text-slate-500">Utilisé 34 fois · Délai moyen 6 h</p>
              </div>
            </div>
            <button className="w-8 h-8 rounded-lg grid place-items-center text-slate-400 hover:bg-slate-100 transition cursor-pointer">
              <Icon name="more" className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 py-4">
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 grid place-items-center text-white text-[11px] font-bold ring-4 ring-emerald-100">
                CM
              </div>
              <span className="text-[10px] font-semibold text-slate-600">Vous</span>
            </div>
            <div className="flex-1 h-px bg-slate-200 relative">
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 bg-white text-[9px] font-bold text-slate-400">
                1
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 grid place-items-center text-white text-[11px] font-bold">
                NB
              </div>
              <span className="text-[10px] font-semibold text-slate-600">Client</span>
            </div>
            <div className="flex-1 h-px bg-slate-200 relative">
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 bg-white text-[9px] font-bold text-slate-400">
                2
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 grid place-items-center text-white text-[11px] font-bold">
                TL
              </div>
              <span className="text-[10px] font-semibold text-slate-600">Direction</span>
            </div>
          </div>

          <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
            <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold">
              3 étapes
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
              Signature
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
              Paraphe
            </span>
          </div>
        </div>

        {/* Parallel Workflow Card */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 grid place-items-center">
                <Icon name="users" className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">NDA — Parallèle</h3>
                <p className="text-[12px] text-slate-500">Utilisé 18 fois · Délai moyen 1 h</p>
              </div>
            </div>
            <button className="w-8 h-8 rounded-lg grid place-items-center text-slate-400 hover:bg-slate-100 transition cursor-pointer">
              <Icon name="more" className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 grid place-items-center text-white text-[11px] font-bold">
                NB
              </div>
              <span className="text-[10px] font-semibold text-slate-600">Nebula</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 grid place-items-center text-white text-[11px] font-bold">
                VX
              </div>
              <span className="text-[10px] font-semibold text-slate-600">Vertex</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 grid place-items-center text-white text-[11px] font-bold">
                CM
              </div>
              <span className="text-[10px] font-semibold text-slate-600">Vous</span>
            </div>
          </div>

          <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
            <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold">
              3 signataires
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
              Parallèle
            </span>
          </div>
        </div>
      </div>

      {/* Workflow List Table Card */}
      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-bold text-slate-900">Tous les workflows</h3>
        </div>
        <div className="divide-y divide-slate-100">
          <div 
            onClick={() => onNavigate('sign')}
            className="p-5 flex items-center gap-4 hover:bg-slate-50/70 transition cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 grid place-items-center shrink-0">
              <Icon name="git-branch" className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900 text-sm">Contrat de prestation — Séquentiel</p>
              <p className="text-[11px] text-slate-400">Vous → Client → Direction</p>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold">
              Actif
            </span>
            <button className="w-7 h-7 rounded-lg grid place-items-center text-slate-400 hover:bg-slate-100 transition">
              <Icon name="more" className="w-4 h-4" />
            </button>
          </div>

          <div 
            onClick={() => onNavigate('sign')}
            className="p-5 flex items-center gap-4 hover:bg-slate-50/70 transition cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-violet-50 text-violet-600 grid place-items-center shrink-0">
              <Icon name="users" className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900 text-sm">NDA — Parallèle</p>
              <p className="text-[11px] text-slate-400">3 signataires en simultané</p>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold">
              Actif
            </span>
            <button className="w-7 h-7 rounded-lg grid place-items-center text-slate-400 hover:bg-slate-100 transition">
              <Icon name="more" className="w-4 h-4" />
            </button>
          </div>

          <div 
            onClick={() => onNavigate('sign')}
            className="p-5 flex items-center gap-4 hover:bg-slate-50/70 transition cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 grid place-items-center shrink-0">
              <Icon name="git-branch" className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900 text-sm">Devis commercial — Séquentiel</p>
              <p className="text-[11px] text-slate-400">Client → Vous</p>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
              Brouillon
            </span>
            <button className="w-7 h-7 rounded-lg grid place-items-center text-slate-400 hover:bg-slate-100 transition">
              <Icon name="more" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
