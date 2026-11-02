import React, { useState } from 'react';
import Icon from '../../components/common/Icon';

/* ─── Données ─── */
const FAQ = [
  {
    q: 'Comment envoyer un document à signer ?',
    a: "Depuis le tableau de bord, cliquez sur « Nouveau document », chargez votre PDF, ajoutez vos destinataires, placez les champs de signature et cliquez sur « Envoyer ». Vos contacts reçoivent un email avec le lien de signature.",
  },
  {
    q: 'Est-ce que les signatures ont une valeur juridique ?',
    a: "Oui. Les signatures électroniques Signly sont conformes au règlement eIDAS (Europe) et à l'ESIGN Act (États-Unis). Chaque document signé est accompagné d'un certificat d'audit horodaté.",
  },
  {
    q: 'Comment ajouter plusieurs signataires ?',
    a: "Lors de la préparation du document, cliquez sur « Ajouter un signataire » et renseignez l'email de chaque personne. Vous pouvez définir un ordre de signature ou autoriser les signatures simultanées.",
  },
  {
    q: 'Puis-je annuler ou rappeler un document envoyé ?',
    a: "Oui, tant que le document n'est pas encore signé. Depuis « Documents », ouvrez le document concerné et cliquez sur « Annuler l'envoi ». Les signataires seront notifiés par email.",
  },
  {
    q: 'Quels formats de fichiers sont supportés ?',
    a: "Signly supporte les fichiers PDF, DOCX et ODT. Les fichiers images (JPG, PNG) sont automatiquement convertis en PDF lors du téléchargement.",
  },
  {
    q: 'Comment exporter le rapport d\'audit ?',
    a: "Depuis la page « Audit », cliquez sur « Exporter » en haut à droite. Vous pouvez choisir le format CSV ou PDF. Le rapport inclut chaque action (envoi, ouverture, signature, refus) horodatée.",
  },
];

const ARTICLES = [
  { icon: 'book-open',    color: 'emerald', title: 'Guide de démarrage',         sub: '5 min de lecture',   tag: 'Débutant' },
  { icon: 'file-text',   color: 'teal',    title: 'Créer votre premier document', sub: '8 min de lecture',  tag: 'Débutant' },
  { icon: 'users',       color: 'cyan',    title: 'Gérer votre équipe',           sub: '6 min de lecture',  tag: 'Équipe'   },
  { icon: 'shield',      color: 'indigo',  title: 'Sécurité & conformité',        sub: '10 min de lecture', tag: 'Avancé'   },
  { icon: 'zap',         color: 'violet',  title: 'API & intégrations',           sub: '12 min de lecture', tag: 'Dev'      },
  { icon: 'bar-chart',   color: 'rose',    title: 'Rapports & statistiques',      sub: '7 min de lecture',  tag: 'Pro'      },
];

const CONTACTS = [
  {
    icon: 'message-circle',
    color: 'emerald',
    title: 'Chat en direct',
    sub: 'Réponse en moins de 2 minutes',
    badge: 'En ligne',
    badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
    cta: 'Démarrer le chat',
  },
  {
    icon: 'mail',
    color: 'teal',
    title: 'Email support',
    sub: 'support@signly.io · Sous 4 h',
    badge: null,
    cta: 'Envoyer un email',
  },
  {
    icon: 'phone',
    color: 'cyan',
    title: 'Téléphone',
    sub: '+33 1 23 45 67 89 · Lun–Ven 9h–18h',
    badge: null,
    cta: 'Nous appeler',
  },
  {
    icon: 'video',
    color: 'indigo',
    title: 'Démonstration guidée',
    sub: 'Réserver un créneau avec un expert',
    badge: null,
    cta: 'Planifier un appel',
  },
];

const colorMap = {
  emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
  teal:    { bg: 'bg-teal-100',    text: 'text-teal-600'    },
  cyan:    { bg: 'bg-cyan-100',    text: 'text-cyan-600'    },
  indigo:  { bg: 'bg-indigo-100',  text: 'text-indigo-600'  },
  violet:  { bg: 'bg-violet-100',  text: 'text-violet-600'  },
  rose:    { bg: 'bg-rose-100',    text: 'text-rose-600'    },
};

const TAG_COLOR = {
  Débutant: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Équipe:   'bg-teal-50 text-teal-700 border-teal-200',
  Avancé:   'bg-indigo-50 text-indigo-700 border-indigo-200',
  Dev:      'bg-violet-50 text-violet-700 border-violet-200',
  Pro:      'bg-rose-50 text-rose-700 border-rose-200',
};

/* ─── Composant FaqItem ─── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50 transition cursor-pointer"
      >
        <span className="text-sm font-semibold text-slate-900">{q}</span>
        <span className={`shrink-0 w-7 h-7 rounded-lg bg-slate-100 grid place-items-center transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          <Icon name="plus" className="w-4 h-4 text-slate-600" />
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ maxHeight: open ? '300px' : '0px' }}
      >
        <p className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

/* ─── Page principale ─── */
export default function HelpPage({ onNavigate }) {
  const [search, setSearch] = useState('');
  const [ticketForm, setTicketForm] = useState({ subject: '', message: '', priority: 'Normale' });
  const [ticketSent, setTicketSent] = useState(false);

  const filteredFaq = FAQ.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase()),
  );

  const handleTicket = () => {
    setTicketSent(true);
    setTimeout(() => setTicketSent(false), 4000);
    setTicketForm({ subject: '', message: '', priority: 'Normale' });
  };

  const INPUT = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition outline-none';

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1100px] w-full mx-auto animate-fade-up">

      {/* ── Breadcrumb ── */}
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
        <button onClick={() => onNavigate('dashboard')} className="hover:text-emerald-600 transition cursor-pointer">
          Tableau de bord
        </button>
        <Icon name="chevron-right" className="w-3.5 h-3.5" />
        <span className="text-slate-700 font-semibold">Aide & support</span>
      </div>

      {/* ── Hero ── */}
      <div className="relative rounded-3xl overflow-hidden mb-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 sm:p-12 text-center">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-emerald-500/20 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Support disponible 24h/24
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
            Comment pouvons-nous<br className="hidden sm:block" /> vous aider ?
          </h1>
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
            Trouvez rapidement une réponse dans notre base de connaissances ou contactez notre équipe.
          </p>
          {/* Barre de recherche */}
          <div className="relative max-w-lg mx-auto">
            <Icon name="search" className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher dans l'aide..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur border border-white/10 text-white placeholder-slate-500 text-sm focus:bg-white/15 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition outline-none"
            />
          </div>
        </div>
      </div>

      {/* ── Canaux de contact ── */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Contactez-nous</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CONTACTS.map((c) => {
            const col = colorMap[c.color];
            return (
              <div key={c.title} className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3 cursor-pointer group">
                <div className="flex items-start justify-between">
                  <span className={`w-10 h-10 rounded-xl grid place-items-center ${col.bg} ${col.text}`}>
                    <Icon name={c.icon} className="w-5 h-5" />
                  </span>
                  {c.badge && (
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${c.badgeColor}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                      {c.badge}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{c.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{c.sub}</p>
                </div>
                <button className={`mt-auto w-full py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 transition cursor-pointer`}>
                  {c.cta}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6 items-start">

        {/* ── Colonne gauche ── */}
        <div className="space-y-6">

          {/* FAQ */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Questions fréquentes</h2>
              <span className="text-xs text-slate-400">{filteredFaq.length} résultat{filteredFaq.length > 1 ? 's' : ''}</span>
            </div>
            {filteredFaq.length > 0 ? (
              <div className="space-y-2">
                {filteredFaq.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
              </div>
            ) : (
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-8 text-center">
                <Icon name="search" className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500">Aucun résultat pour <strong>« {search} »</strong></p>
                <button onClick={() => setSearch('')} className="mt-3 text-xs font-semibold text-emerald-600 hover:underline cursor-pointer">
                  Réinitialiser
                </button>
              </div>
            )}
          </section>

          {/* Articles */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4">Guides & tutoriels</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {ARTICLES.map((a) => {
                const col = colorMap[a.color];
                return (
                  <div key={a.title} className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group">
                    <span className={`w-10 h-10 rounded-xl grid place-items-center shrink-0 ${col.bg} ${col.text}`}>
                      <Icon name={a.icon} className="w-5 h-5" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-emerald-700 transition">{a.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{a.sub}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${TAG_COLOR[a.tag]}`}>
                        {a.tag}
                      </span>
                      <Icon name="chevron-right" className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition" />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* ── Colonne droite : Ticket ── */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs sticky top-24">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 grid place-items-center">
                <Icon name="life-buoy" className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-slate-900">Ouvrir un ticket</h3>
                <p className="text-xs text-slate-500">Réponse sous 4 heures ouvrées</p>
              </div>
            </div>

            {ticketSent ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center animate-fade-up">
                <span className="w-14 h-14 rounded-2xl bg-emerald-100 grid place-items-center">
                  <Icon name="check-circle" className="w-7 h-7 text-emerald-600" />
                </span>
                <p className="font-bold text-slate-900">Ticket envoyé !</p>
                <p className="text-xs text-slate-500">Notre équipe vous répondra très bientôt.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Sujet</label>
                  <input
                    type="text"
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                    placeholder="Décrivez brièvement le problème"
                    className={INPUT}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Priorité</label>
                  <select
                    value={ticketForm.priority}
                    onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                    className={INPUT + ' cursor-pointer'}
                  >
                    <option>Faible</option>
                    <option>Normale</option>
                    <option>Haute</option>
                    <option>Urgente</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Message</label>
                  <textarea
                    value={ticketForm.message}
                    onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                    rows={5}
                    placeholder="Décrivez votre problème en détail..."
                    className={INPUT + ' resize-none'}
                  />
                </div>
                <button
                  onClick={handleTicket}
                  disabled={!ticketForm.subject || !ticketForm.message}
                  className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                >
                  Envoyer le ticket
                </button>
              </div>
            )}
          </div>

          {/* Statut plateforme */}
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-sm">Statut de la plateforme</h3>
              <span className="text-[10px] text-slate-400">Mis à jour il y a 3 min</span>
            </div>
            <div className="space-y-2.5">
              {[
                { name: 'API',               status: 'Opérationnel' },
                { name: 'Envoi de documents', status: 'Opérationnel' },
                { name: 'Stockage',           status: 'Opérationnel' },
                { name: 'Notifications email', status: 'Dégradé',     warn: true },
              ].map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">{s.name}</span>
                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold ${s.warn ? 'text-amber-600' : 'text-emerald-600'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${s.warn ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
