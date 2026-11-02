import React from 'react';
import Icon from './common/Icon';

export default function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 grid place-items-center">
                <Icon name="pen" className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-slate-900">Signly</span>
            </div>
            <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
              La signature électronique simple et sécurisée pour les équipes modernes.
            </p>
            <div className="flex gap-2 mt-6">
              <a href="#" className="w-9 h-9 rounded-lg bg-white border border-slate-200 grid place-items-center text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition">
                <Icon name="globe" className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white border border-slate-200 grid place-items-center text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition">
                <Icon name="mail" className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white border border-slate-200 grid place-items-center text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition">
                <Icon name="link" className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">Produit</h4>
            <ul className="space-y-2.5 text-sm text-slate-500">
              <li><a href="#features" className="hover:text-emerald-600 transition">Fonctionnalités</a></li>
              <li><a href="#pricing" className="hover:text-emerald-600 transition">Tarifs</a></li>
              <li><a href="#how" className="hover:text-emerald-600 transition">Comment ça marche</a></li>
              <li><button onClick={() => onNavigate('sign')} className="hover:text-emerald-600 transition cursor-pointer">Salle de signature</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">Ressources</h4>
            <ul className="space-y-2.5 text-sm text-slate-500">
              <li><a href="#" className="hover:text-emerald-600 transition">Blog</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition">Centre d'aide</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition">Statut des services</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">Légal</h4>
            <ul className="space-y-2.5 text-sm text-slate-500">
              <li><a href="#" className="hover:text-emerald-600 transition">Confidentialité</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition">CGU</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition">Mentions légales</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition">Conformité RGPD</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
