import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Icon from '../components/common/Icon';
import SignatureModal from '../components/SignatureModal';

export default function LandingPage({ onNavigate }) {
  const [billingPeriod, setBillingPeriod] = useState('monthly'); // 'monthly' | 'yearly'
  const [signatureModalOpen, setSignatureModalOpen] = useState(false);
  const [demoSignature, setDemoSignature] = useState(null);
  const [demoSignedDate, setDemoSignedDate] = useState(null);

  const proPrice = billingPeriod === 'yearly' ? '15' : '19';
  const bizPrice = billingPeriod === 'yearly' ? '39' : '49';
  const periodLabel = billingPeriod === 'yearly' ? 'par mois, facturé annuellement' : 'par mois, facturé mensuellement';

  return (
    <div className="min-h-screen bg-white">
      {/* NAVBAR */}
      <Navbar onNavigate={onNavigate} />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none"></div>
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-emerald-400/25 rounded-full blur-[120px] animate-float-slow pointer-events-none"></div>
        <div className="absolute -top-20 right-0 w-[460px] h-[460px] bg-cyan-400/20 rounded-full blur-[120px] animate-float pointer-events-none"></div>
        <div className="absolute top-60 left-1/3 w-[380px] h-[380px] bg-teal-400/15 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-10">
          <div className="text-center max-w-3xl mx-auto animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-700 mb-7">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Nouveau — Signature qualifiée eIDAS &amp; horodatage blockchain
              <Icon name="arrow-right" className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <h1 className="text-[42px] leading-[1.05] sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] text-slate-900">
              Signez vos documents<br className="hidden sm:block" /> en <span className="grad-text">quelques secondes</span>.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
              Signly est la plateforme de signature électronique qui accélère vos contrats.
              Envoyez, faites signer et archivez — avec une <strong className="text-slate-800 font-semibold">valeur légale</strong> incontestable.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button 
                onClick={() => onNavigate('auth')} 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-[15px] shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                Commencer gratuitement
                <Icon name="arrow-right" className="w-4 h-4" />
              </button>
              <button 
                onClick={() => onNavigate('auth')} 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-white border border-slate-200 text-slate-800 font-semibold text-[15px] shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer"
              >
                <span className="w-6 h-6 rounded-full bg-slate-900 grid place-items-center">
                  <Icon name="play" className="w-3 h-3 text-white" fill="currentColor" stroke="none" />
                </span>
                Essayer la salle de signature
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-slate-500 font-medium">
              <span className="inline-flex items-center gap-1.5"><Icon name="check" className="w-4 h-4 text-emerald-500" /> Sans carte bancaire</span>
              <span className="inline-flex items-center gap-1.5"><Icon name="check" className="w-4 h-4 text-emerald-500" /> 3 documents offerts</span>
              <span className="inline-flex items-center gap-1.5"><Icon name="check" className="w-4 h-4 text-emerald-500" /> Conforme eIDAS</span>
            </div>
          </div>

          {/* APP PREVIEW */}
          <div className="relative mt-16 sm:mt-20 max-w-5xl mx-auto animate-fade-up">
            <div className="absolute -inset-x-10 -top-8 h-40 bg-gradient-to-b from-emerald-500/20 to-transparent blur-3xl pointer-events-none"></div>
            <div className="relative rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-emerald-900/10 overflow-hidden ring-1 ring-slate-900/5">
              <div className="h-11 bg-slate-50/80 border-b border-slate-200 flex items-center gap-2 px-4">
                <span className="w-3 h-3 rounded-full bg-rose-400"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                <div className="ml-4 flex-1 max-w-xs h-6 rounded-md bg-white border border-slate-200 flex items-center px-2.5 gap-1.5">
                  <Icon name="lock" className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] text-slate-400 font-medium">app.signly.io/sign/contrat-2025</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row">
                {/* Mini Doc */}
                <div className="flex-1 p-4 sm:p-6 bg-slate-50/70 min-w-0">
                  <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 max-w-[340px] mx-auto">
                    <div className="h-2 w-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded mb-1"></div>
                    <div className="h-1.5 w-32 bg-slate-200 rounded mb-4"></div>
                    <div className="space-y-1.5 mb-4">
                      <div className="h-1 w-full bg-slate-100 rounded"></div>
                      <div className="h-1 w-full bg-slate-100 rounded"></div>
                      <div className="h-1 w-4/5 bg-slate-100 rounded"></div>
                      <div className="h-1 w-full bg-slate-100 rounded"></div>
                      <div className="h-1 w-3/5 bg-slate-100 rounded"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => setSignatureModalOpen(true)}
                        className={`h-14 rounded-lg border-2 border-dashed transition cursor-pointer relative overflow-hidden ${
                          demoSignature 
                            ? 'border-emerald-500 bg-emerald-50/80 p-1 flex items-center justify-center' 
                            : 'border-emerald-400 bg-emerald-50/60 grid place-items-center hover:bg-emerald-100/60'
                        }`}
                        title={demoSignature ? "Cliquez pour modifier votre signature" : "Cliquez pour signer"}
                      >
                        {demoSignature ? (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <img src={demoSignature} alt="Votre signature" className="max-h-full max-w-full object-contain" />
                            <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-600 text-white text-[8px] grid place-items-center font-bold">✓</span>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Icon name="pen" className="w-4 h-4 text-emerald-500 mx-auto mb-0.5" />
                            <span className="text-[8px] font-bold text-emerald-700">Signer ici</span>
                          </div>
                        )}
                      </button>
                      <div className="h-14 rounded-lg border border-slate-200 bg-slate-50 grid place-items-center">
                        <span className="font-cursive text-lg text-slate-700">Camille M.</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Mini Panel */}
                <div className="w-full sm:w-56 shrink-0 border-t sm:border-t-0 sm:border-l border-slate-100 bg-white p-3.5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-600 grid place-items-center">
                      <Icon name="pen" className="w-3 h-3" />
                    </div>
                    <span className="text-[11px] font-bold">Compléter</span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-emerald-50 border border-emerald-200">
                      <Icon name="check-circle" className="w-3 h-3 text-emerald-600" />
                      <span className="text-[10px] font-semibold text-emerald-700">
                        {demoSignature ? 'Signature apposée' : 'Signature'}
                      </span>
                    </div>
                    <div className={`flex items-center gap-2 px-2 py-1.5 rounded-md border ${demoSignedDate ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
                      {demoSignedDate ? (
                        <Icon name="check-circle" className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <span className="w-3 h-3 rounded-full border-2 border-slate-300"></span>
                      )}
                      <span className={`text-[10px] font-medium ${demoSignedDate ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                        {demoSignedDate || 'Date'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-slate-50 border border-slate-200">
                      <span className="w-3 h-3 rounded-full border-2 border-slate-300"></span>
                      <span className="text-[10px] font-medium text-slate-500">Initiales</span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden mb-1">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                      style={{ width: demoSignature ? '66%' : '33%' }}
                    ></div>
                  </div>
                  <p className="text-[9px] text-slate-400 mb-3">
                    {demoSignature ? '2 sur 3 complété' : '1 sur 3 complété'}
                  </p>
                  <button 
                    onClick={() => {
                      if (!demoSignature) {
                        setSignatureModalOpen(true);
                      } else {
                        onNavigate('auth');
                      }
                    }} 
                    className="w-full py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-bold text-center block hover:opacity-95 transition cursor-pointer shadow-xs"
                  >
                    {demoSignature ? "Ouvrir l'espace complet" : 'Signer le document'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <section className="py-14 border-y border-slate-100 bg-slate-50/50">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-8">
          Plus de 20 000 entreprises signent avec Signly
        </p>
        <div className="max-w-6xl mx-auto px-6 overflow-hidden">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
            <span className="text-xl font-extrabold tracking-tight text-slate-500">Nebula</span>
            <span className="text-xl font-bold tracking-tight text-slate-500 italic">Vertex</span>
            <span className="text-xl font-extrabold tracking-tighter text-slate-500">QUANTUM</span>
            <span className="text-xl font-bold text-slate-500">lumio<span className="text-emerald-400">.</span></span>
            <span className="text-xl font-extrabold tracking-tight text-slate-500">Arcade</span>
            <span className="text-xl font-semibold tracking-wide text-slate-500">HOKKAIDO</span>
            <span className="text-xl font-extrabold text-slate-500">pixel<span className="font-light">form</span></span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wide mb-5">
              Fonctionnalités
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] text-slate-900 leading-[1.1]">
              La signature <span className="grad-text">nouvelle génération</span>
            </h2>
            <p className="mt-5 text-lg text-slate-500">
              Une suite complète, pensée pour les équipes juridiques exigeantes et les indépendants pressés.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Big Gradient Card */}
            <div className="lg:col-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-8 sm:p-10 text-white card-hover">
              <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -right-8 bottom-0 w-48 h-48 bg-white/10 rounded-full blur-xl"></div>
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-white/15 grid place-items-center mb-6 backdrop-blur">
                  <Icon name="shield-check" className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Valeur légale incontestable</h3>
                <p className="text-white/80 leading-relaxed max-w-md">
                  Chaque signature est horodatée, scellée et traçable. Conforme eIDAS, ESIGN &amp; UETA — avec piste d'audit infalsifiable.
                </p>
                <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="rounded-xl bg-white/10 backdrop-blur border border-white/20 p-3 text-center">
                    <div className="text-lg font-extrabold">eIDAS</div>
                    <div className="text-[10px] text-white/60 mt-0.5">Niveau avancé</div>
                  </div>
                  <div className="rounded-xl bg-white/10 backdrop-blur border border-white/20 p-3 text-center">
                    <div className="text-lg font-extrabold">ESIGN</div>
                    <div className="text-[10px] text-white/60 mt-0.5">US compliant</div>
                  </div>
                  <div className="rounded-xl bg-white/10 backdrop-blur border border-white/20 p-3 text-center">
                    <div className="text-lg font-extrabold">RGPD</div>
                    <div className="text-[10px] text-white/60 mt-0.5">Hébergé en UE</div>
                  </div>
                  <div className="rounded-xl bg-white/10 backdrop-blur border border-white/20 p-3 text-center">
                    <div className="text-lg font-extrabold">ISO</div>
                    <div className="text-[10px] text-white/60 mt-0.5">27001</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-8 card-hover">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 grid place-items-center mb-6">
                <Icon name="history" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Piste d'audit complète</h3>
              <p className="text-slate-500 text-[15px] leading-relaxed">
                Chaque ouverture, signature ou refus est journalisée : IP, navigateur, horodatage, empreinte du document.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-8 card-hover">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 grid place-items-center mb-6">
                <Icon name="users" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Signature multi-parties</h3>
              <p className="text-slate-500 text-[15px] leading-relaxed">
                Séquentielle ou parallèle, jusqu'à 50 signataires. Chacun reçoit son tour au bon moment.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-8 card-hover">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 grid place-items-center mb-6">
                <Icon name="repeat" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Modèles réutilisables</h3>
              <p className="text-slate-500 text-[15px] leading-relaxed">
                Créez vos contrats types une fois. Champs dynamiques, envoi en un clic, gain de temps garanti.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-8 card-hover">
              <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 grid place-items-center mb-6">
                <Icon name="smartphone" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Signature mobile</h3>
              <p className="text-slate-500 text-[15px] leading-relaxed">
                Vos signataires signent depuis leur téléphone, sans app à installer. Expérience pensée mobile-first.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-8 card-hover">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 grid place-items-center mb-6">
                <Icon name="lock" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Sécurité bancaire</h3>
              <p className="text-slate-500 text-[15px] leading-relaxed">
                Chiffrement AES-256, 2FA, SSO, sauvegardes redondantes. Vos documents sont protégés à chaque étape.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 sm:py-28 bg-slate-50/70 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wide mb-5">
              Comment ça marche
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] text-slate-900 leading-[1.1]">
              Trois étapes. C'est tout.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-9 left-[16%] right-[16%] h-px bg-gradient-to-r from-emerald-200 via-teal-300 to-cyan-200"></div>
            
            <div className="relative text-center">
              <div className="relative z-10 w-[72px] h-[72px] mx-auto rounded-2xl bg-white border border-slate-200 shadow-lg shadow-emerald-500/5 grid place-items-center mb-6">
                <Icon name="upload" className="w-7 h-7 text-emerald-600" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-xs font-bold grid place-items-center shadow-md">
                  1
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2">Importez le document</h3>
              <p className="text-slate-500 text-[15px] leading-relaxed max-w-xs mx-auto">
                PDF, Word ou depuis un modèle. Déposez vos champs de signature en quelques clics.
              </p>
            </div>

            <div className="relative text-center">
              <div className="relative z-10 w-[72px] h-[72px] mx-auto rounded-2xl bg-white border border-slate-200 shadow-lg shadow-emerald-500/5 grid place-items-center mb-6">
                <Icon name="send" className="w-7 h-7 text-teal-600" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 text-white text-xs font-bold grid place-items-center shadow-md">
                  2
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2">Envoyez aux signataires</h3>
              <p className="text-slate-500 text-[15px] leading-relaxed max-w-xs mx-auto">
                Ajoutez vos signataires, définissez l'ordre, personnalisez le message. Et c'est parti.
              </p>
            </div>

            <div className="relative text-center">
              <div className="relative z-10 w-[72px] h-[72px] mx-auto rounded-2xl bg-white border border-slate-200 shadow-lg shadow-emerald-500/5 grid place-items-center mb-6">
                <Icon name="check-circle" className="w-7 h-7 text-cyan-600" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-600 text-white text-xs font-bold grid place-items-center shadow-md">
                  3
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2">Suivez et archivez</h3>
              <p className="text-slate-500 text-[15px] leading-relaxed max-w-xs mx-auto">
                Suivez l'avancement en temps réel. Une fois signé, le document est scellé et archivé.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-200/25 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wide mb-5">
              Tarifs
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] text-slate-900 leading-[1.1]">
              Un prix simple, <span className="grad-text">transparent</span>
            </h2>
            <p className="mt-5 text-lg text-slate-500">Commencez gratuitement. Évoluez quand vous voulez.</p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200">
              <button 
                onClick={() => setBillingPeriod('monthly')} 
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
                  billingPeriod === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Mensuel
              </button>
              <button 
                onClick={() => setBillingPeriod('yearly')} 
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2 cursor-pointer ${
                  billingPeriod === 'yearly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Annuel <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-[10px] font-bold">-20%</span>
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {/* Starter */}
            <div className="rounded-3xl bg-white border border-slate-200 p-8 card-hover">
              <h3 className="text-lg font-bold text-slate-900">Starter</h3>
              <p className="text-sm text-slate-500 mt-1 mb-6">Pour découvrir la signature.</p>
              <div className="flex items-end gap-1.5 mb-1">
                <span className="text-5xl font-extrabold tracking-tight text-slate-900">0<span className="text-2xl">€</span></span>
              </div>
              <p className="text-sm text-slate-400 mb-7">Gratuit pour toujours</p>
              <button 
                onClick={() => onNavigate('auth')} 
                className="w-full py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:border-slate-300 transition mb-7 cursor-pointer"
              >
                Commencer
              </button>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex gap-2.5"><Icon name="check" className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" /> 3 documents / mois</li>
                <li className="flex gap-2.5"><Icon name="check" className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" /> 1 utilisateur</li>
                <li className="flex gap-2.5"><Icon name="check" className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" /> Signature simple</li>
                <li className="flex gap-2.5"><Icon name="check" className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" /> Piste d'audit de base</li>
              </ul>
            </div>

            {/* Pro (Highlighted) */}
            <div className="relative rounded-3xl bg-slate-900 p-8 shadow-2xl shadow-emerald-900/30 lg:-mt-4 lg:mb-4 overflow-hidden">
              <div className="absolute -right-20 -top-20 w-56 h-56 bg-emerald-500/30 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute top-6 right-6 px-2.5 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-bold uppercase tracking-wide">
                Populaire
              </div>
              <div className="relative">
                <h3 className="text-lg font-bold text-white">Pro</h3>
                <p className="text-sm text-slate-400 mt-1 mb-6">Pour les pros qui signent souvent.</p>
                <div className="flex items-end gap-1.5 mb-1">
                  <span className="text-5xl font-extrabold tracking-tight text-white transition-all">
                    {proPrice}<span className="text-2xl">€</span>
                  </span>
                </div>
                <p className="text-sm text-slate-400 mb-7">{periodLabel}</p>
                <button 
                  onClick={() => onNavigate('auth')} 
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-emerald-500/40 transition mb-7 cursor-pointer"
                >
                  Essai gratuit 14 jours
                </button>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex gap-2.5"><Icon name="check" className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" /> Documents illimités</li>
                  <li className="flex gap-2.5"><Icon name="check" className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" /> Modèles réutilisables</li>
                  <li className="flex gap-2.5"><Icon name="check" className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" /> Signature multi-parties</li>
                  <li className="flex gap-2.5"><Icon name="check" className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" /> Relances automatiques</li>
                  <li className="flex gap-2.5"><Icon name="check" className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" /> Piste d'audit avancée</li>
                  <li className="flex gap-2.5"><Icon name="check" className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" /> Branding personnalisé</li>
                </ul>
              </div>
            </div>

            {/* Business */}
            <div className="rounded-3xl bg-white border border-slate-200 p-8 card-hover">
              <h3 className="text-lg font-bold text-slate-900">Business</h3>
              <p className="text-sm text-slate-500 mt-1 mb-6">Pour les équipes qui grandissent.</p>
              <div className="flex items-end gap-1.5 mb-1">
                <span className="text-5xl font-extrabold tracking-tight text-slate-900 transition-all">
                  {bizPrice}<span className="text-2xl">€</span>
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-7">{periodLabel}</p>
              <button 
                onClick={() => onNavigate('auth')} 
                className="w-full py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:border-slate-300 transition mb-7 cursor-pointer"
              >
                Choisir Business
              </button>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex gap-2.5"><Icon name="check" className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" /> Tout le plan Pro</li>
                <li className="flex gap-2.5"><Icon name="check" className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" /> Jusqu'à 20 utilisateurs</li>
                <li className="flex gap-2.5"><Icon name="check" className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" /> Workflows séquentiels</li>
                <li className="flex gap-2.5"><Icon name="check" className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" /> SSO &amp; API</li>
                <li className="flex gap-2.5"><Icon name="check" className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" /> Support dédié</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 sm:py-28 bg-slate-50/70 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wide mb-5">
              Témoignages
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] text-slate-900 leading-[1.1]">
              Ils ont <span className="grad-text">accéléré</span> leurs signatures
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="rounded-3xl bg-white border border-slate-200 p-7 card-hover">
              <div className="flex gap-0.5 text-amber-400 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="star" className="w-4.5 h-4.5 fill-current" stroke="none" />
                ))}
              </div>
              <p className="text-slate-700 leading-relaxed text-[15px]">
                « Nos contrats clients passaient de 8 jours à 6 heures en moyenne. Le suivi en temps réel a tout changé. »
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 grid place-items-center text-white text-sm font-bold">
                  CM
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">Camille Moreau</div>
                  <div className="text-xs text-slate-500">Directrice juridique, Nebula</div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-7 card-hover">
              <div className="flex gap-0.5 text-amber-400 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="star" className="w-4.5 h-4.5 fill-current" stroke="none" />
                ))}
              </div>
              <p className="text-slate-700 leading-relaxed text-[15px]">
                « La piste d'audit est d'une clarté rare. En cas de litige, on a tout sous la main — horodatage, IP, empreinte. »
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 grid place-items-center text-white text-sm font-bold">
                  TL
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">Thomas Lefèvre</div>
                  <div className="text-xs text-slate-500">Avocat associé, Vertex</div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-7 card-hover">
              <div className="flex gap-0.5 text-amber-400 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="star" className="w-4.5 h-4.5 fill-current" stroke="none" />
                ))}
              </div>
              <p className="text-slate-700 leading-relaxed text-[15px]">
                « Le dessin de signature sur mobile fonctionne parfaitement. Nos clients signent depuis leur canapé, sans friction. »
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 grid place-items-center text-white text-sm font-bold">
                  SK
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">Sofia Kaddour</div>
                  <div className="text-xs text-slate-500">Fondatrice, Studio Arcade</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wide mb-5">
              FAQ
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] text-slate-900 leading-[1.1]">
              Des questions ?
            </h2>
          </div>
          <div className="space-y-3">
            <details className="group rounded-2xl border border-slate-200 bg-white overflow-hidden open:shadow-md transition">
              <summary className="flex items-center justify-between gap-4 p-5 sm:p-6 text-left">
                <span className="font-semibold text-slate-900 text-[15px]">La signature électronique a-t-elle une valeur légale ?</span>
                <span className="faq-icon shrink-0 w-8 h-8 rounded-full bg-slate-100 grid place-items-center text-slate-600">
                  <Icon name="plus" className="w-4 h-4" />
                </span>
              </summary>
              <div className="px-5 sm:px-6 pb-6 text-slate-500 leading-relaxed text-[15px]">
                Oui. En Europe, le règlement eIDAS (2016) reconnaît la valeur légale de la signature électronique. Aux États-Unis, l'ESIGN Act et l'UETA s'appliquent. Signly génère des signatures avancées avec certificat, horodatage qualifié et piste d'audit — opposables en justice.
              </div>
            </details>
            <details className="group rounded-2xl border border-slate-200 bg-white overflow-hidden open:shadow-md transition">
              <summary className="flex items-center justify-between gap-4 p-5 sm:p-6 text-left">
                <span className="font-semibold text-slate-900 text-[15px]">Quels formats de documents puis-je signer ?</span>
                <span className="faq-icon shrink-0 w-8 h-8 rounded-full bg-slate-100 grid place-items-center text-slate-600">
                  <Icon name="plus" className="w-4 h-4" />
                </span>
              </summary>
              <div className="px-5 sm:px-6 pb-6 text-slate-500 leading-relaxed text-[15px]">
                PDF, Word (.docx) et images. Vous pouvez importer vos propres fichiers ou partir de nos modèles. Une fois signés, les documents sont convertis en PDF/A scellé pour l'archivage légal à long terme.
              </div>
            </details>
            <details className="group rounded-2xl border border-slate-200 bg-white overflow-hidden open:shadow-md transition">
              <summary className="flex items-center justify-between gap-4 p-5 sm:p-6 text-left">
                <span className="font-semibold text-slate-900 text-[15px]">Comment fonctionne la signature multi-parties ?</span>
                <span className="faq-icon shrink-0 w-8 h-8 rounded-full bg-slate-100 grid place-items-center text-slate-600">
                  <Icon name="plus" className="w-4 h-4" />
                </span>
              </summary>
              <div className="px-5 sm:px-6 pb-6 text-slate-500 leading-relaxed text-[15px]">
                Vous ajoutez jusqu'à 50 signataires et choisissez l'ordre : séquentiel (chacun attend son tour) ou parallèle (tous reçoivent en même temps). Des rappels automatiques sont envoyés tous les 3 jours jusqu'à signature.
              </div>
            </details>
            <details className="group rounded-2xl border border-slate-200 bg-white overflow-hidden open:shadow-md transition">
              <summary className="flex items-center justify-between gap-4 p-5 sm:p-6 text-left">
                <span className="font-semibold text-slate-900 text-[15px]">Puis-je annuler à tout moment ?</span>
                <span className="faq-icon shrink-0 w-8 h-8 rounded-full bg-slate-100 grid place-items-center text-slate-600">
                  <Icon name="plus" className="w-4 h-4" />
                </span>
              </summary>
              <div className="px-5 sm:px-6 pb-6 text-slate-500 leading-relaxed text-[15px]">
                Oui, sans engagement. Annulation en un clic depuis vos paramètres. Aucun frais caché, aucun préavis. Vos documents restent exportables pendant 90 jours.
              </div>
            </details>
            <details className="group rounded-2xl border border-slate-200 bg-white overflow-hidden open:shadow-md transition">
              <summary className="flex items-center justify-between gap-4 p-5 sm:p-6 text-left">
                <span className="font-semibold text-slate-900 text-[15px]">Où sont hébergées mes données ?</span>
                <span className="faq-icon shrink-0 w-8 h-8 rounded-full bg-slate-100 grid place-items-center text-slate-600">
                  <Icon name="plus" className="w-4 h-4" />
                </span>
              </summary>
              <div className="px-5 sm:px-6 pb-6 text-slate-500 leading-relaxed text-[15px]">
                Dans des datacenters certifiés ISO 27001 en Europe (Paris &amp; Francfort). Chiffrement AES-256 au repos, TLS 1.3 en transit, sauvegardes géo-redondantes. Conformité RGPD garantie.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 sm:px-8 pb-24">
        <div className="max-w-6xl mx-auto relative overflow-hidden rounded-[32px] bg-slate-900 px-8 py-16 sm:px-16 sm:py-20 text-center">
          <div className="absolute -top-32 -left-20 w-[420px] h-[420px] bg-emerald-500/40 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute -bottom-32 -right-20 w-[420px] h-[420px] bg-cyan-500/30 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="relative">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.1] max-w-2xl mx-auto">
              Prêt à signer plus vite ?
            </h2>
            <p className="mt-5 text-lg text-slate-400 max-w-xl mx-auto">
              Rejoignez 20 000 entreprises qui ont digitalisé leurs signatures. Gratuit, sans carte bancaire.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button 
                onClick={() => onNavigate('auth')} 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-slate-900 font-semibold hover:bg-slate-100 hover:-translate-y-0.5 transition-all shadow-xl cursor-pointer"
              >
                Créer mon compte gratuit
                <Icon name="arrow-right" className="w-4.5 h-4.5" />
              </button>
              <button 
                onClick={() => onNavigate('auth')} 
                className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-white/20 text-white font-semibold hover:bg-white/10 transition cursor-pointer"
              >
                Essayer la démo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer onNavigate={onNavigate} />

      {/* Signature Modal pour la démo interactive */}
      <SignatureModal
        isOpen={signatureModalOpen}
        onClose={() => setSignatureModalOpen(false)}
        defaultMode="draw"
        onApply={(res) => {
          setDemoSignature(res.dataUrl);
          setDemoSignedDate(new Date().toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }));
          setSignatureModalOpen(false);
        }}
      />
    </div>
  );
}
