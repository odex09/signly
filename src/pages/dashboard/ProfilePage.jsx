import React, { useState } from 'react';
import Icon from '../../components/common/Icon';
import { useApp } from '../../context/AppContext';

/* ─── Petit composant toggle réutilisable ─── */
function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition cursor-pointer ${value ? 'bg-emerald-500' : 'bg-slate-300'}`}
    >
      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200 ${value ? 'right-0.5' : 'left-0.5'}`} />
    </button>
  );
}

/* ─── Champ de formulaire réutilisable ─── */
function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const INPUT_CLS =
  'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition outline-none';

export default function ProfilePage({ onNavigate }) {
  const { plan, plans } = useApp();
  const planName = plans[plan].name;
  /* ── State ── */
  const [form, setForm] = useState({
    firstName: 'Camille',
    lastName:  'Moreau',
    email:     'camille@studio.fr',
    phone:     '+33 6 12 34 56 78',
    role:      'Directrice Studio',
    company:   'Nebula Studio',
    timezone:  'Europe/Paris (GMT+1)',
    lang:      'Français',
    bio:       'Passionnée par le design et la gestion de projets créatifs.',
  });

  const [twoFactor,  setTwoFactor]  = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [savedMsg,   setSavedMsg]   = useState(false);
  const [activeTab,  setActiveTab]  = useState('info');

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSave = () => {
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  /* ── Stats fictives ── */
  const stats = [
    { icon: 'file-text',   label: 'Documents signés',  value: '142',  color: 'emerald' },
    { icon: 'send',        label: 'Envoyés ce mois',   value: '28',   color: 'teal' },
    { icon: 'users',       label: 'Contacts actifs',   value: '64',   color: 'cyan' },
    { icon: 'clock',       label: 'Moy. de signature', value: '3 min',color: 'indigo' },
  ];

  const colorMap = {
    emerald: 'bg-emerald-100 text-emerald-600',
    teal:    'bg-teal-100 text-teal-600',
    cyan:    'bg-cyan-100 text-cyan-600',
    indigo:  'bg-indigo-100 text-indigo-600',
  };

  /* ── Sessions actives ── */
  const sessions = [
    { device: 'MacBook Pro 16"',  location: 'Paris, France',       time: 'Session actuelle',   icon: 'monitor',    current: true  },
    { device: 'iPhone 15 Pro',    location: 'Paris, France',       time: 'Il y a 2 heures',    icon: 'smartphone', current: false },
    { device: 'Chrome · Windows', location: 'Lyon, France',        time: 'Il y a 3 jours',     icon: 'globe',      current: false },
  ];

  const tabs = [
    { id: 'info',     label: 'Informations',  icon: 'user'      },
    { id: 'activity', label: 'Activité',      icon: 'bar-chart' },
    { id: 'security', label: 'Sécurité',      icon: 'shield'    },
  ];

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1000px] w-full mx-auto animate-fade-up">

      {/* ── Breadcrumb ── */}
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
        <button onClick={() => onNavigate('dashboard')} className="hover:text-emerald-600 transition cursor-pointer">
          Tableau de bord
        </button>
        <Icon name="chevron-right" className="w-3.5 h-3.5" />
        <span className="text-slate-700 font-semibold">Mon profil</span>
      </div>

      {/* ── Hero Card ── */}
      <div className="relative rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden mb-6">
        {/* Bandeau dégradé */}
        <div className="h-28 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500" />

        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-10">

            {/* Avatar */}
            <div className="flex items-end gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 grid place-items-center text-white text-2xl font-extrabold shadow-xl border-4 border-white">
                  CM
                </div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-slate-200 shadow grid place-items-center hover:bg-slate-50 transition cursor-pointer">
                  <Icon name="camera" className="w-3.5 h-3.5 text-slate-600" />
                </button>
              </div>

              <div className="mb-1">
                <h1 className="text-xl font-extrabold text-slate-900 leading-tight">
                  {form.firstName} {form.lastName}
                </h1>
                <p className="text-sm text-slate-500">{form.role} · {form.company}</p>
              </div>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Actif
              </span>
               <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                 <Icon name="shield" className="w-3 h-3" />
                 {planName}
               </span>
              <button
                onClick={() => onNavigate('settings')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition cursor-pointer"
              >
                <Icon name="settings" className="w-3.5 h-3.5" />
                Paramètres
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-white border border-slate-200 p-4 shadow-xs flex items-center gap-3">
            <span className={`w-10 h-10 rounded-xl grid place-items-center shrink-0 ${colorMap[s.color]}`}>
              <Icon name={s.icon} className="w-5 h-5" />
            </span>
            <div>
              <p className="text-lg font-extrabold text-slate-900 leading-tight">{s.value}</p>
              <p className="text-[11px] text-slate-500 leading-tight">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Onglets ── */}
      <div className="flex gap-1 p-1 bg-slate-100/80 rounded-2xl mb-6 w-full sm:w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
              activeTab === t.id
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Icon name={t.icon} className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Message succès ── */}
      {savedMsg && (
        <div className="flex items-center gap-2 p-4 mb-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold animate-fade-up">
          <Icon name="check-circle" className="w-5 h-5 text-emerald-600" />
          Vos modifications ont été enregistrées avec succès.
        </div>
      )}

      {/* ══════════════════════════════════════════
          TAB : INFORMATIONS
      ══════════════════════════════════════════ */}
      {activeTab === 'info' && (
        <div className="space-y-4">

          {/* Infos personnelles */}
          <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xs">
            <h3 className="font-bold text-slate-900 mb-5">Informations personnelles</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Prénom">
                <input type="text" value={form.firstName} onChange={set('firstName')} className={INPUT_CLS} />
              </Field>
              <Field label="Nom">
                <input type="text" value={form.lastName} onChange={set('lastName')} className={INPUT_CLS} />
              </Field>
              <Field label="Email professionnel">
                <input type="email" value={form.email} onChange={set('email')} className={INPUT_CLS} />
              </Field>
              <Field label="Téléphone">
                <input type="tel" value={form.phone} onChange={set('phone')} className={INPUT_CLS} />
              </Field>
              <Field label="Poste / Fonction">
                <input type="text" value={form.role} onChange={set('role')} className={INPUT_CLS} />
              </Field>
              <Field label="Entreprise">
                <input type="text" value={form.company} onChange={set('company')} className={INPUT_CLS} />
              </Field>
              <Field label="Fuseau horaire">
                <select value={form.timezone} onChange={set('timezone')} className={INPUT_CLS + ' cursor-pointer'}>
                  <option>Europe/Paris (GMT+1)</option>
                  <option>Europe/London (GMT)</option>
                  <option>America/New_York (GMT-5)</option>
                </select>
              </Field>
              <Field label="Langue">
                <select value={form.lang} onChange={set('lang')} className={INPUT_CLS + ' cursor-pointer'}>
                  <option>Français</option>
                  <option>English</option>
                  <option>Español</option>
                </select>
              </Field>
              <Field label="Biographie">
                <textarea
                  value={form.bio}
                  onChange={set('bio')}
                  rows={3}
                  className={INPUT_CLS + ' resize-none sm:col-span-2'}
                />
              </Field>
            </div>

            <div className="flex justify-end gap-2 mt-6 pt-5 border-t border-slate-100">
              <button className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer">
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition cursor-pointer"
              >
                Enregistrer
              </button>
            </div>
          </div>

          {/* Photo de profil */}
          <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xs">
            <h3 className="font-bold text-slate-900 mb-1">Photo de profil</h3>
            <p className="text-xs text-slate-500 mb-5">JPG, PNG ou GIF · 2 Mo max · Ratio 1:1 recommandé</p>
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 grid place-items-center text-white text-xl font-bold shadow-md shrink-0">
                CM
              </div>
              <div className="flex flex-col gap-2">
                <button className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer w-fit">
                  Changer la photo
                </button>
                <button className="px-4 py-2 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition cursor-pointer w-fit">
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          TAB : ACTIVITÉ
      ══════════════════════════════════════════ */}
      {activeTab === 'activity' && (
        <div className="space-y-4">

          {/* Graphique fictif barres */}
          <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-slate-900">Documents signés</h3>
                <p className="text-xs text-slate-500 mt-0.5">7 derniers jours</p>
              </div>
              <span className="text-2xl font-extrabold text-emerald-600">+28%</span>
            </div>
            {/* Barres SVG simples */}
            <div className="flex items-end gap-2 h-28">
              {[6,9,5,12,8,14,10].map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-emerald-500 to-teal-400 opacity-90 transition-all duration-500"
                    style={{ height: `${(v / 14) * 100}%` }}
                  />
                  <span className="text-[10px] text-slate-400">
                    {['L','M','Me','J','V','S','D'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dernières activités */}
          <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xs">
            <h3 className="font-bold text-slate-900 mb-4">Dernières activités</h3>
            <div className="space-y-3">
              {[
                { icon: 'file-check', color: 'emerald', text: 'Contrat signé · Nebula Studio', time: 'Il y a 12 min' },
                { icon: 'send',       color: 'teal',    text: 'NDA envoyé à Vertex Agency',   time: 'Il y a 2 h' },
                { icon: 'eye',        color: 'cyan',    text: 'Proposition consultée',        time: 'Il y a 5 h' },
                { icon: 'file-plus',  color: 'indigo',  text: 'Nouveau modèle créé',          time: 'Hier' },
                { icon: 'user-plus',  color: 'violet',  text: 'Contact ajouté · Aria Labs',   time: 'Il y a 2 j' },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition">
                  <span className={`w-9 h-9 rounded-xl grid place-items-center shrink-0 ${colorMap[a.color] ?? 'bg-violet-100 text-violet-600'}`}>
                    <Icon name={a.icon} className="w-4 h-4" />
                  </span>
                  <p className="flex-1 text-sm font-medium text-slate-800">{a.text}</p>
                  <span className="text-xs text-slate-400 shrink-0">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          TAB : SÉCURITÉ
      ══════════════════════════════════════════ */}
      {activeTab === 'security' && (
        <div className="space-y-4">

          {/* Options de sécurité */}
          <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xs">
            <h3 className="font-bold text-slate-900 mb-4">Sécurité du compte</h3>
            <div className="space-y-3">
              {[
                {
                  icon: 'lock', color: 'emerald',
                  title: 'Authentification à deux facteurs',
                  sub: 'Renforce la sécurité avec un code OTP',
                  value: twoFactor, onChange: setTwoFactor,
                },
                {
                  icon: 'bell', color: 'teal',
                  title: 'Alertes par email',
                  sub: 'Notifié lors d\'une connexion inconnue',
                  value: emailNotif, onChange: setEmailNotif,
                },
              ].map((row) => (
                <div key={row.title} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50">
                  <div className="flex items-center gap-3">
                    <span className={`w-9 h-9 rounded-lg grid place-items-center ${colorMap[row.color]}`}>
                      <Icon name={row.icon} className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold text-slate-900">{row.title}</p>
                      <p className="text-[11px] text-slate-500">{row.sub}</p>
                    </div>
                  </div>
                  <Toggle value={row.value} onChange={row.onChange} />
                </div>
              ))}
            </div>

            {/* Changer mot de passe */}
            <div className="mt-5 pt-5 border-t border-slate-100">
              <h4 className="text-sm font-bold text-slate-900 mb-4">Modifier le mot de passe</h4>
              <div className="space-y-3">
                {['Mot de passe actuel', 'Nouveau mot de passe', 'Confirmer le nouveau'].map((lbl) => (
                  <Field key={lbl} label={lbl}>
                    <input type="password" placeholder="••••••••" className={INPUT_CLS} />
                  </Field>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition cursor-pointer"
                >
                  Mettre à jour le mot de passe
                </button>
              </div>
            </div>
          </div>

          {/* Sessions actives */}
          <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xs">
            <h3 className="font-bold text-slate-900 mb-4">Sessions actives</h3>
            <div className="space-y-3">
              {sessions.map((s) => (
                <div key={s.device} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg bg-slate-200 grid place-items-center text-slate-600">
                      <Icon name={s.icon} className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold text-slate-900 flex items-center gap-2">
                        {s.device}
                        {s.current && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Actuel
                          </span>
                        )}
                      </p>
                      <p className="text-[11px] text-slate-500">{s.location} · {s.time}</p>
                    </div>
                  </div>
                  {!s.current && (
                    <button className="text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer px-2 py-1 rounded-lg hover:bg-rose-50 transition">
                      Révoquer
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button className="mt-4 text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer hover:underline">
              Déconnecter toutes les autres sessions
            </button>
          </div>

          {/* Zone de danger */}
          <div className="rounded-2xl bg-white border border-rose-200 p-5 sm:p-6 shadow-xs">
            <h3 className="font-bold text-rose-700 mb-1">Zone de danger</h3>
            <p className="text-xs text-slate-500 mb-4">Ces actions sont définitives et irréversibles.</p>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2.5 rounded-xl border border-rose-200 text-rose-600 text-sm font-semibold hover:bg-rose-50 transition cursor-pointer">
                Désactiver mon compte
              </button>
              <button className="px-4 py-2.5 rounded-xl bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 transition cursor-pointer">
                Supprimer mon compte
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
