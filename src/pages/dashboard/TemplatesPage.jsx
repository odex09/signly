import React, { useState } from 'react';
import Icon from '../../components/common/Icon';

export default function TemplatesPage({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates = [
    {
      id: 1,
      category: 'contract',
      categoryLabel: 'Contrat',
      categoryClass: 'bg-emerald-50 text-emerald-700',
      usedCount: '24 fois',
      title: 'Contrat de prestation',
      desc: 'Modèle standard avec clauses de confidentialité et paiement.',
      badgeColor: 'bg-emerald-500',
      signers: ['from-emerald-400 to-teal-500', 'from-sky-400 to-blue-500'],
    },
    {
      id: 2,
      category: 'nda',
      categoryLabel: 'NDA',
      categoryClass: 'bg-violet-50 text-violet-700',
      usedCount: '18 fois',
      title: 'Accord de confidentialité',
      desc: 'NDA bilatéral avec durée de confidentialité paramétrable.',
      badgeColor: 'bg-violet-500',
      signers: ['from-violet-400 to-purple-500'],
    },
    {
      id: 3,
      category: 'quote',
      categoryLabel: 'Devis',
      categoryClass: 'bg-amber-50 text-amber-700',
      usedCount: '31 fois',
      title: 'Devis commercial',
      desc: 'Proposition commerciale détaillée avec acceptation client.',
      badgeColor: 'bg-amber-500',
      signers: ['from-amber-400 to-orange-500', 'from-rose-400 to-pink-500'],
    },
    {
      id: 4,
      category: 'hr',
      categoryLabel: 'RH',
      categoryClass: 'bg-sky-50 text-sky-700',
      usedCount: '12 fois',
      title: 'Contrat de travail (CDI)',
      desc: 'Modèle conforme au droit du travail avec période d\'essai.',
      badgeColor: 'bg-sky-500',
      signers: ['from-sky-400 to-blue-500'],
    },
    {
      id: 5,
      category: 'legal',
      categoryLabel: 'Juridique',
      categoryClass: 'bg-rose-50 text-rose-700',
      usedCount: '9 fois',
      title: 'Mandat de représentation',
      desc: 'Pouvoir pour agir au nom d\'une personne morale.',
      badgeColor: 'bg-rose-500',
      signers: ['from-rose-400 to-pink-500'],
    },
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1500px] w-full mx-auto animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-slate-900">
            Modèles
          </h1>
          <p className="text-sm text-slate-500 mt-1">Réutilisez vos contrats types et gagnez du temps.</p>
        </div>
        <button 
          onClick={() => onNavigate('sign')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 shadow-sm transition self-start cursor-pointer"
        >
          <Icon name="plus" className="w-4 h-4" />
          Nouveau modèle
        </button>
      </div>

      {/* Filter Category Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: 'all', label: 'Tous' },
          { id: 'contract', label: 'Contrats' },
          { id: 'nda', label: 'NDA' },
          { id: 'quote', label: 'Devis' },
          { id: 'hr', label: 'RH' },
          { id: 'legal', label: 'Juridique' },
        ].map((cat) => {
          const active = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
                active 
                  ? 'bg-emerald-50 border border-emerald-200 font-bold text-emerald-700 shadow-xs' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Templates */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTemplates.map((item) => (
          <div 
            key={item.id}
            onClick={() => onNavigate('sign')}
            className="rounded-2xl bg-white border border-slate-200 overflow-hidden card-hover cursor-pointer flex flex-col justify-between"
          >
            {/* Visual Doc Preview Top */}
            <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-50 p-5 flex justify-center items-center">
              <div className="bg-white rounded-md shadow-sm border border-slate-200 w-full max-w-[150px] p-3">
                <div className={`h-1.5 w-10 ${item.badgeColor} rounded mb-2`}></div>
                <div className="space-y-1 mb-3">
                  <div className="h-1 w-full bg-slate-100 rounded"></div>
                  <div className="h-1 w-full bg-slate-100 rounded"></div>
                  <div className="h-1 w-4/5 bg-slate-100 rounded"></div>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="h-6 rounded border border-dashed border-emerald-300 bg-emerald-50/50"></div>
                  <div className="h-6 rounded border border-slate-200 bg-slate-50"></div>
                </div>
              </div>
            </div>

            {/* Content Bottom */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${item.categoryClass}`}>
                    {item.categoryLabel}
                  </span>
                  <span className="text-[10px] text-slate-400">· Utilisé {item.usedCount}</span>
                </div>
                <h3 className="font-bold text-slate-900">{item.title}</h3>
                <p className="text-[13px] text-slate-500 mt-1">{item.desc}</p>
              </div>

              <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
                <div className="flex -space-x-2">
                  {item.signers.map((sig, idx) => (
                    <div 
                      key={idx}
                      className={`w-6 h-6 rounded-full bg-gradient-to-br ${sig} border-2 border-white`}
                    />
                  ))}
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); onNavigate('sign'); }}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 cursor-pointer"
                >
                  Utiliser <Icon name="arrow-right" className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Create Template Placeholder Card */}
        <button 
          onClick={() => onNavigate('sign')}
          className="rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50/30 transition min-h-[280px] p-6 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-slate-100 grid place-items-center">
            <Icon name="plus" className="w-6 h-6" />
          </div>
          <span className="text-sm font-semibold">Créer un modèle</span>
          <span className="text-[11px] text-slate-400 text-center">
            Importez un document et placez vos champs réutilisables
          </span>
        </button>
      </div>
    </div>
  );
}
