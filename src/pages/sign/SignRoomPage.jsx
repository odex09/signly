import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../components/common/Icon';
import SignatureModal from '../../components/SignatureModal';
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { useApp } from '../../context/AppContext';

// Configuration du worker pdfjs
try {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version || '4.10.38'}/build/pdf.worker.min.mjs`;
} catch (e) {
  console.warn('PDF.js worker initialization', e);
}

export default function SignRoomPage({ onNavigate }) {
  const { addDocument, canSign } = useApp();
  // Modal de signature
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDefaultMode, setModalDefaultMode] = useState('draw'); // 'draw' | 'upload' | 'type'

  // Document importé
  const [docName, setDocName] = useState('');
  const [docSize, setDocSize] = useState('');
  const [docType, setDocType] = useState(null); // null | 'pdf' | 'image'
  const [pdfDocProxy, setPdfDocProxy] = useState(null);
  const [pdfBytes, setPdfBytes] = useState(null);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [imageUrl, setImageUrl] = useState(null);

  // Zoom de la page A4
  const [zoom, setZoom] = useState(100);

  // Signatures placées sur le document
  // Chaque item : { id, type: 'drawn'|'uploaded'|'typed'|'date'|'initials', dataUrl, label, x, y, width, height, page }
  const [placedSignatures, setPlacedSignatures] = useState([]);

  const [selectedSigId, setSelectedSigId] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [leftTool, setLeftTool] = useState(null);

  // Références DOM
  const fileInputDocRef = useRef(null);
  const signatureInputFileRef = useRef(null);
  const a4PageRef = useRef(null);
  const pdfCanvasRef = useRef(null);
  const viewerContainerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(794);

  // Détection de la largeur disponible pour adapter le document A4 à l'écran sans aucune déformation
  useEffect(() => {
    const updateWidth = () => {
      if (viewerContainerRef.current) {
        const w = viewerContainerRef.current.clientWidth - 24;
        setContainerWidth(Math.max(280, w));
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Détection si on arrive avec l'intention d'ouvrir directement la modal de signature
  useEffect(() => {
    if (sessionStorage.getItem('signly_auto_open_modal') === 'true') {
      sessionStorage.removeItem('signly_auto_open_modal');
      handleOpenModal('draw');
    }
  }, []);

  const BASE_A4_WIDTH = 794;
  const BASE_A4_HEIGHT = 1123;
  const fitScale = Math.min(1, containerWidth / BASE_A4_WIDTH);
  const effectiveScale = fitScale * (zoom / 100);

  // ──────────────────────────────────────────────────────────
  // GESTION DE L'IMPORTATION DE DOCUMENT (PDF ou IMAGE)
  // ──────────────────────────────────────────────────────────
  const handleDocFileUpload = async (file) => {
    if (!file) return;
    setDocName(file.name);
    setDocSize(`${(file.size / (1024 * 1024)).toFixed(1)} Mo`);

    const isPdf = file.type === 'application/pdf' || file.name.endsWith('.pdf');
    const isImg = file.type.startsWith('image/');

    if (isPdf) {
      setDocType('pdf');
      const arrayBuffer = await file.arrayBuffer();
      setPdfBytes(new Uint8Array(arrayBuffer));

      try {
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer.slice(0) });
        const pdf = await loadingTask.promise;
        setPdfDocProxy(pdf);
        setTotalPages(pdf.numPages);
        setCurrentPageNum(1);
      } catch (err) {
        console.error('Erreur chargement PDF.js', err);
      }
    } else if (isImg) {
      setDocType('image');
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setTotalPages(1);
      setCurrentPageNum(1);
    }
  };

  // Rendu de la page PDF sur le canvas A4
  useEffect(() => {
    if (docType === 'pdf' && pdfDocProxy && pdfCanvasRef.current) {
      let isCancelled = false;
      pdfDocProxy.getPage(currentPageNum).then((page) => {
        if (isCancelled) return;
        const canvas = pdfCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const viewport = page.getViewport({ scale: 1.5 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: ctx,
          viewport,
        };
        page.render(renderContext);
      });
      return () => {
        isCancelled = true;
      };
    }
  }, [docType, pdfDocProxy, currentPageNum]);

  // ──────────────────────────────────────────────────────────
  // AJOUT DE SIGNATURE (Option 1 : Image importée, Option 2 : Numérique)
  // ──────────────────────────────────────────────────────────
  // Option 1 : Importer directement une signature image depuis le panneau latéral
  const handleQuickUploadSignature = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Enlever le fond blanc si possible
        const c = document.createElement('canvas');
        c.width = img.width;
        c.height = img.height;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        try {
          const imgData = ctx.getImageData(0, 0, c.width, c.height);
          const d = imgData.data;
          for (let i = 0; i < d.length; i += 4) {
            if (d[i] > 220 && d[i + 1] > 220 && d[i + 2] > 220) {
              d[i + 3] = 0;
            }
          }
          ctx.putImageData(imgData, 0, 0);
        } catch (err) {
          console.warn(err);
        }
        addSignatureToDocument({
          type: 'uploaded',
          label: 'Signature importée',
          dataUrl: c.toDataURL('image/png'),
          x: 54,
          y: 77,
          width: 38,
          height: 10,
        });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Option 2 : Ouvrir modal pour tracer numériquement ou importer
  const handleOpenModal = (mode = 'draw') => {
    setMobileDrawerOpen(false); // Fermer le tiroir mobile avant d'ouvrir la modale
    setModalDefaultMode(mode);
    setModalOpen(true);
  };

  // Insertion de la signature sur la page A4 (en % de position pour s'adapter à toutes tailles)
  const addSignatureToDocument = ({ type, label, dataUrl, x = 54, y = 77, width = 38, height = 10 }) => {
    const newSig = {
      id: `sig_${Date.now()}`,
      type,
      label,
      dataUrl,
      x,
      y,
      width,
      height,
      page: currentPageNum,
      date: new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };
    setPlacedSignatures((prev) => [...prev, newSig]);
    setSelectedSigId(newSig.id);
    setMobileDrawerOpen(false);

    // Scroller vers la signature placée après rendu
    setTimeout(() => {
      const el = document.getElementById(newSig.id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }, 0);
  };

  // Validation depuis la modal
  const handleModalApply = (res) => {
    addSignatureToDocument({
      type: res.mode,
      label: res.text || 'Signature numérique',
      dataUrl: res.dataUrl,
      x: 54,
      y: 77,
      width: 38,
      height: 10,
    });
  };

  // Suppression d'une signature
  const handleRemoveSignature = (id, e) => {
    e?.stopPropagation();
    setPlacedSignatures((prev) => prev.filter((s) => s.id !== id));
    if (selectedSigId === id) setSelectedSigId(null);
  };

  // Déplacement par drag & drop sur la page A4 (Souris et Tactile)
  const handleStartDragSig = (e, id) => {
    e.stopPropagation();
    setSelectedSigId(id);
    const rect = a4PageRef.current.getBoundingClientRect();
    const sig = placedSignatures.find((s) => s.id === id);
    if (!sig) return;

    const isTouch = !!e.touches;
    const startClientX = isTouch ? e.touches[0].clientX : e.clientX;
    const startClientY = isTouch ? e.touches[0].clientY : e.clientY;
    const startSigX = sig.x;
    const startSigY = sig.y;

    const handleMove = (moveEvent) => {
      const currentX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const currentY = moveEvent.touches ? moveEvent.touches[0].clientY : moveEvent.clientY;
      const deltaXPercent = ((currentX - startClientX) / rect.width) * 100;
      const deltaYPercent = ((currentY - startClientY) / rect.height) * 100;

      const newX = Math.max(0, Math.min(100 - sig.width, startSigX + deltaXPercent));
      const newY = Math.max(0, Math.min(100 - sig.height, startSigY + deltaYPercent));

      setPlacedSignatures((prev) =>
        prev.map((s) => (s.id === id ? { ...s, x: newX, y: newY } : s))
      );
    };

    const handleEnd = () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };

    window.addEventListener(isTouch ? 'touchmove' : 'mousemove', handleMove, { passive: false });
    window.addEventListener(isTouch ? 'touchend' : 'mouseup', handleEnd);
  };

  // Clic sur la page A4 pour déplacer la signature sélectionnée
  const handlePageClick = (e) => {
    if (!selectedSigId) return;
    const rect = a4PageRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    const sig = placedSignatures.find((s) => s.id === selectedSigId);
    if (!sig) return;

    const newX = Math.max(0, Math.min(100 - sig.width, clickX - sig.width / 2));
    const newY = Math.max(0, Math.min(100 - sig.height, clickY - sig.height / 2));

    setPlacedSignatures((prev) =>
      prev.map((s) => (s.id === selectedSigId ? { ...s, x: newX, y: newY } : s))
    );
  };

  // ──────────────────────────────────────────────────────────
  // GÉNÉRATION & TÉLÉCHARGEMENT DU DOCUMENT SIGNÉ (PDF)
  // ──────────────────────────────────────────────────────────
  const handleDownloadSignedDoc = async () => {
    if (!canSign()) {
      alert('Vous avez atteint la limite de votre plan. Passez au plan supérieur pour continuer.');
      onNavigate('billing');
      return;
    }
    setIsDownloading(true);
    try {
      let finalPdfDoc;

      // Cas 1 : Le document est un PDF importé
      if (docType === 'pdf' && pdfBytes) {
        finalPdfDoc = await PDFDocument.load(pdfBytes);
      } else {
        // Cas 2 : Document Image ou Template HTML A4 par défaut
        // On crée un document PDF A4 standard (595.28 x 841.89 points)
        finalPdfDoc = await PDFDocument.create();
        const page = finalPdfDoc.addPage([595.28, 841.89]);
        const { width, height } = page.getSize();

        // Si c'est une image importée, on la dessine en fond
        if (docType === 'image' && imageUrl) {
          const imgBytes = await fetch(imageUrl).then((r) => r.arrayBuffer());
          let embeddedImg;
          try {
            embeddedImg = await finalPdfDoc.embedPng(imgBytes);
          } catch {
            embeddedImg = await finalPdfDoc.embedJpg(imgBytes);
          }
          page.drawImage(embeddedImg, {
            x: 0,
            y: 0,
            width,
            height,
          });
        } else {
          // Template de contrat par défaut dessiné dans le PDF
          // Fond blanc avec bordure discrète
          const title = 'CONTRAT DE PRESTATION DE SERVICES';
          page.drawText(title, {
            x: 50,
            y: height - 80,
            size: 18,
          });
          page.drawText('Signly — Document sécurisé et horodaté eIDAS', {
            x: 50,
            y: height - 100,
            size: 9,
          });

          // Articles
          const textArticles = [
            'Article 1 — Objet : Réalisation des prestations de services numériques convenues.',
            'Article 2 — Durée : Du 12 octobre 2025 au 30 novembre 2025.',
            'Article 3 — Rémunération : Montant total convenu de 3 900,00 € HT.',
            'Article 4 — Confidentialité & Propriété intellectuelle : Respect strict des engagements.',
          ];
          let textY = height - 150;
          textArticles.forEach((art) => {
            page.drawText(art, { x: 50, y: textY, size: 10 });
            textY -= 30;
          });

          // Lignes de signature
          page.drawText('Pour le Prestataire : Camille Moreau', { x: 50, y: 180, size: 10 });
          page.drawText('Pour le Client : Signataire désigné', { x: 320, y: 180, size: 10 });
          page.drawText('Document scellé cryptographiquement par Signly.', { x: 50, y: 50, size: 8 });
        }
      }

      // Incruster chaque signature sur les pages correspondantes
      for (const sig of placedSignatures) {
        if (!sig.dataUrl) continue;
        const targetPageIdx = (sig.page || 1) - 1;
        const page = finalPdfDoc.getPage(targetPageIdx);
        const { width: pWidth, height: pHeight } = page.getSize();

        // Convertir la dataURL PNG en bytes et embed
        const pngBytes = await fetch(sig.dataUrl).then((r) => r.arrayBuffer());
        const embeddedPng = await finalPdfDoc.embedPng(pngBytes);

        // Coordonnées PDF (rappel: origine en bas à gauche en PDF)
        const pdfSigW = (sig.width / 100) * pWidth;
        const pdfSigH = (sig.height / 100) * pHeight;
        const pdfSigX = (sig.x / 100) * pWidth;
        const pdfSigY = pHeight - ((sig.y / 100) * pHeight) - pdfSigH;

        page.drawImage(embeddedPng, {
          x: pdfSigX,
          y: Math.max(0, pdfSigY),
          width: pdfSigW,
          height: pdfSigH,
        });
      }

      // Sauvegarde du fichier PDF
      const pdfDataUri = await finalPdfDoc.save();
      const blob = new Blob([pdfDataUri], { type: 'application/pdf' });
      const downloadUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `Signly-${docName.replace(/\.[^/.]+$/, '')}-signe.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccess(true);
      addDocument({
        name: docName || 'Document signé',
        signaturesCount: placedSignatures.length,
      });
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Erreur lors de la génération du PDF signé', err);
      alert('Une erreur est survenue lors de la création du document signé.');
    } finally {
      setIsDownloading(false);
    }
  };

  const clientSignaturesCount = placedSignatures.filter((s) => !s.isProvider).length;

  return (
    <div className="h-screen max-h-screen w-full max-w-full overflow-x-hidden overflow-y-hidden bg-slate-100 flex flex-col font-sans select-none">
      {/* ── TOP BAR FIXE ── */}
      <header className="sticky top-0 z-30 h-[68px] bg-white border-b border-slate-200 flex items-center justify-between gap-3 px-4 sm:px-6 shrink-0 shadow-2xs relative">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-9 h-9 rounded-xl grid place-items-center text-slate-500 hover:bg-slate-100 transition cursor-pointer shrink-0"
            title="Retour au tableau de bord"
          >
            <Icon name="arrow-left" className="w-5 h-5" />
          </button>

          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white grid place-items-center shrink-0 shadow-sm shadow-emerald-500/20">
            <Icon name="file-text" className="w-5 h-5" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-extrabold text-slate-900 truncate">{docName}</p>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                Format A4
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">
              {docSize} · {totalPages > 1 ? `${totalPages} pages` : '1 page'} · Horodatage eIDAS
            </p>
          </div>
        </div>

        {/* Actions du Top Bar */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Input file caché pour import de document */}
          <input
            ref={fileInputDocRef}
            type="file"
            accept="application/pdf,image/*"
            className="hidden"
            onChange={(e) => handleDocFileUpload(e.target.files[0])}
          />

          <button
            onClick={() => fileInputDocRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition cursor-pointer shadow-2xs"
            title="Importer un PDF ou une image"
          >
            <Icon name="upload" className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Importer document</span>
          </button>

          {/* Bouton Signer : ouvre la modale popup de signature */}
          <button
            onClick={() => handleOpenModal('draw')}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold transition cursor-pointer shadow-xs"
          >
            <Icon name="pen" className="w-3.5 h-3.5 text-white" />
            <span>Signer</span>
          </button>

          <button
            onClick={handleDownloadSignedDoc}
            disabled={isDownloading}
            className={`hidden sm:inline-flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white transition cursor-pointer shadow-md ${
              clientSignaturesCount > 0
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/35'
                : 'bg-slate-900 hover:bg-slate-800'
            }`}
          >
            {isDownloading ? (
              <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Icon name="download" className="w-4 h-4" />
            )}
            <span>Télécharger le PDF signé</span>
          </button>
        </div>
      {/* Bouton Outils en bas de l'entête */}
      {!leftDrawerOpen && (
      <button
        onClick={() => setLeftDrawerOpen(!leftDrawerOpen)}
        className="absolute top-full left-4 mt-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer shadow-md z-10"
        title="Ouvrir les outils"
      >
        <Icon name="menu" className="w-4 h-4 text-emerald-600" />
        <span>Outils</span>
      </button>
      )}
      </header>

      {/* ── BANNIÈRE LIMITE PLAN ── */}
      {!canSign() && (
        <div className="fixed top-[76px] left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm font-semibold shadow-lg animate-fade-up">
          <Icon name="lock" className="w-4 h-4 text-amber-600" />
          <span>Limite de votre plan atteinte.</span>
          <button onClick={() => onNavigate('billing')} className="text-amber-700 underline cursor-pointer">
            Passer au plan supérieur
          </button>
        </div>
      )}

      {/* ── NOTIFICATION SUCCÈS ── */}
      {downloadSuccess && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-3 p-4 rounded-2xl bg-emerald-600 text-white shadow-xl animate-fade-up">
          <Icon name="check-circle" className="w-6 h-6 text-white" />
          <div>
            <p className="text-sm font-bold">Document signé téléchargé !</p>
            <p className="text-xs text-emerald-100">Le PDF contient vos signatures intégrées.</p>
          </div>
        </div>
      )}

      {/* ── PANNEAU GAUCHE (OUTILS) ── */}
      {leftDrawerOpen && (
        <>
          <div onClick={() => setLeftDrawerOpen(false)} className="fixed inset-0 z-30 bg-transparent" />
          <aside className="fixed left-0 top-[68px] bottom-0 z-40 w-[260px] bg-white border-r border-slate-200 flex flex-col shadow-lg">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-base">Outils</h3>
            <button onClick={() => setLeftDrawerOpen(false)} className="w-8 h-8 rounded-lg grid place-items-center text-slate-400 hover:bg-slate-100 cursor-pointer">
              <Icon name="x" className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 space-y-2 flex-1 overflow-y-auto">
            {leftTool === null && (
              <>
                <button onClick={() => setLeftTool('draw')} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 text-sm font-semibold transition cursor-pointer">
                  <Icon name="pen" className="w-4 h-4 text-emerald-600" />
                  Dessiner
                </button>
                <button onClick={() => setLeftTool('text')} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 text-sm font-semibold transition cursor-pointer">
                  <Icon name="type" className="w-4 h-4 text-emerald-600" />
                  Ajouter du texte
                </button>
                <button onClick={() => { handleOpenModal('draw'); setLeftDrawerOpen(false); }} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold shadow-lg shadow-emerald-500/25 hover:shadow-xl transition cursor-pointer mt-4">
                  <Icon name="pen" className="w-4 h-4" />
                  Signer
                </button>
              </>
            )}

            {leftTool === 'draw' && (
              <div className="space-y-3">
                <button onClick={() => setLeftTool(null)} className="text-xs font-semibold text-slate-500 hover:text-slate-700 cursor-pointer mb-2">← Retour</button>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Outils de dessin</p>
                <div className="grid grid-cols-3 gap-2">
                  {['Marqueur', 'Surligneur', 'Gomme'].map((t) => (
                    <button key={t} className="py-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 text-xs font-semibold transition cursor-pointer">{t}</button>
                  ))}
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-2">Épaisseur</p>
                <input type="range" min="1" max="20" defaultValue="4" className="w-full" />
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-2">Couleurs</p>
                <div className="flex gap-2 flex-wrap">
                  {['#0f172a','#1e3a8a','#047857','#dc2626','#d97706','#7c3aed'].map((c) => (
                    <button key={c} style={{backgroundColor:c}} className="w-7 h-7 rounded-full border border-slate-200 cursor-pointer" />
                  ))}
                  <button className="w-7 h-7 rounded-full border border-dashed border-slate-300 grid place-items-center text-slate-400 cursor-pointer" title="Personnaliser">+</button>
                </div>
              </div>
            )}

            {leftTool === 'text' && (
              <div className="space-y-3">
                <button onClick={() => setLeftTool(null)} className="text-xs font-semibold text-slate-500 hover:text-slate-700 cursor-pointer mb-2">← Retour</button>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Texte</p>
                <div className="flex gap-1">
                  {['left','center','right','justify'].map((a) => (
                    <button key={a} className="flex-1 py-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 text-xs font-semibold transition cursor-pointer capitalize">{a}</button>
                  ))}
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-2">Police</p>
                <select className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm cursor-pointer">
                  <option>Inter</option>
                  <option>Caveat</option>
                  <option>Times New Roman</option>
                </select>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-2">Taille</p>
                <input type="number" defaultValue="14" className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm" />
              </div>
            )}
          </div>
        </aside>
      </>
      )}

      {/* ── CONTENU PRINCIPAL (ESPACE A4 SCROLLABLE + PANNEAU LATÉRAL FIXE) ── */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">

        {/* ZONE DE VISUALISATION DE LA FEUILLE A4 (Scroll indépendant) */}
        <div
          ref={viewerContainerRef}
          className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8 pb-24 lg:pb-8 flex flex-col items-center scroll-slim bg-slate-200/60 min-h-0 w-full overflow-x-hidden"
        >

          {/* ── BARRE D'OUTILS DU DOCUMENT (Zoom + Pages + Info) — Responsive 2 lignes sur mobile ── */}
          <div className="w-full max-w-[794px] mb-3 px-1 flex flex-col gap-2 ml-auto">

            {/* Ligne 1 : Info document + Zoom */}
            <div className="flex items-center justify-end gap-2">
              {/* Infos format */}
              <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 shadow-xs text-xs shrink-0">
                <Icon name="file-text" className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-bold text-slate-700 hidden sm:inline">A4</span>
                <span className="font-bold text-slate-700 sm:hidden">A4</span>
                <span className="text-slate-300 hidden sm:inline">·</span>
                <span className="text-slate-400 hidden sm:inline">210×297 mm</span>
              </div>

              {/* Pagination — visible même sur mobile (1 seule page = pas affiché) */}
              {totalPages > 1 && (
                <div className="flex items-center gap-1 bg-white px-2 py-1.5 rounded-xl border border-slate-200 shadow-xs text-xs">
                  <button
                    disabled={currentPageNum <= 1}
                    onClick={() => setCurrentPageNum((p) => Math.max(1, p - 1))}
                    className="w-6 h-6 rounded-lg grid place-items-center hover:bg-slate-100 disabled:opacity-30 cursor-pointer transition"
                    title="Page précédente"
                  >
                    <Icon name="arrow-left" className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2 font-bold text-slate-700 min-w-[52px] text-center">
                    {currentPageNum} / {totalPages}
                  </span>
                  <button
                    disabled={currentPageNum >= totalPages}
                    onClick={() => setCurrentPageNum((p) => Math.min(totalPages, p + 1))}
                    className="w-6 h-6 rounded-lg grid place-items-center hover:bg-slate-100 disabled:opacity-30 cursor-pointer transition"
                    title="Page suivante"
                  >
                    <Icon name="arrow-right" className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Zoom — toujours visible */}
              <div className="flex items-center gap-0.5 bg-white px-2 py-1.5 rounded-xl border border-slate-200 shadow-xs text-xs text-slate-600">
                <button
                  onClick={() => setZoom((z) => Math.max(40, z - 10))}
                  className="w-7 h-7 rounded-lg grid place-items-center hover:bg-slate-100 font-bold text-base cursor-pointer transition active:scale-95"
                  title="Dézoomer"
                >
                  −
                </button>
                <button
                  onClick={() => setZoom(100)}
                  className="font-bold px-1.5 text-[11px] hover:text-emerald-600 cursor-pointer min-w-[36px] text-center"
                  title="Réinitialiser le zoom"
                >
                  {Math.round(effectiveScale * 100)}%
                </button>
                <button
                  onClick={() => setZoom((z) => Math.min(200, z + 10))}
                  className="w-7 h-7 rounded-lg grid place-items-center hover:bg-slate-100 font-bold text-base cursor-pointer transition active:scale-95"
                  title="Zoomer"
                >
                  +
                </button>
              </div>
            </div>

          </div>

          {/* CONTENEUR PROPORTIONNEL A4 RÉEL (Mise à l'échelle automatique exacte, jamais déformé comme un vrai PDF) */}
          <div
            style={{
              width: `${BASE_A4_WIDTH * effectiveScale}px`,
              height: `${BASE_A4_HEIGHT * effectiveScale}px`,
            }}
            className="relative mx-auto transition-all duration-100 shrink-0"
          >
            {/* FEUILLE A4 STRICTE (Dimensions réelles 794 × 1123 px avec scale CSS sans déformation) */}
            <div
              ref={a4PageRef}
              onClick={handlePageClick}
              style={{
                width: `${BASE_A4_WIDTH}px`,
                height: `${BASE_A4_HEIGHT}px`,
                transform: `scale(${effectiveScale})`,
                transformOrigin: 'top left',
              }}
              className="absolute top-0 left-0 bg-white doc-shadow rounded-sm select-none cursor-default overflow-hidden border border-slate-300"
            >
              {/* 1. DOCUMENT IMPORTÉ : PDF */}
              {docType === 'pdf' && (
                <div className="w-full h-full flex justify-center items-center bg-white overflow-hidden">
                  <canvas ref={pdfCanvasRef} className="w-full h-full object-contain block" />
                </div>
              )}

              {/* 2. DOCUMENT IMPORTÉ : IMAGE */}
              {docType === 'image' && imageUrl && (
                <div className="w-full h-full flex justify-center items-center bg-white overflow-hidden">
                  <img src={imageUrl} alt="Document A4 importé" className="w-full h-full object-contain" />
                </div>
              )}

              {/* 3. AUCUN DOCUMENT IMPORTÉ */}
              {docType === null && (
                <div className="w-full h-full flex flex-col items-center justify-center bg-white overflow-hidden">
                  <div className="text-center">
                    <Icon name="file-text" className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-900 mb-1">Aucun document importé</p>
                    <p className="text-xs text-slate-500 mb-6">Importez un PDF ou une image pour commencer à signer.</p>
                    <button
                      onClick={() => fileInputDocRef.current?.click()}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition cursor-pointer shadow-2xs"
                    >
                      <Icon name="upload" className="w-4 h-4 text-emerald-600" />
                      Importer un document
                    </button>
                  </div>
                </div>
              )}

              {/* ── SUPERPOSITION INTERACTIVE DES SIGNATURES PLACÉES SUR LA PAGE A4 ── */}
              {placedSignatures
                .filter((sig) => !sig.page || sig.page === currentPageNum)
                .map((sig) => {
                  const isSelected = selectedSigId === sig.id;
                  return (
                      <div
                        key={sig.id}
                        id={sig.id}
                      onMouseDown={(e) => handleStartDragSig(e, sig.id)}
                      onTouchStart={(e) => handleStartDragSig(e, sig.id)}
                      style={{
                        left: `${sig.x}%`,
                        top: `${sig.y}%`,
                        width: `${sig.width}%`,
                        height: `${sig.height}%`,
                      }}
                      className={`absolute z-20 cursor-move touch-none flex items-center justify-center p-1 rounded-xl transition-shadow ${
                        isSelected
                          ? 'ring-2 ring-emerald-500 bg-emerald-500/10 shadow-lg'
                          : 'hover:ring-1 hover:ring-emerald-400/80'
                      }`}
                    >
                      {/* Contenu visuel de la signature */}
                      {sig.dataUrl ? (
                        <img
                          src={sig.dataUrl}
                          alt="Signature"
                          className="w-full h-full object-contain filter drop-shadow pointer-events-none"
                        />
                      ) : (
                        <span className="font-cursive text-3xl text-slate-900 pointer-events-none select-none text-center">
                          {sig.label}
                        </span>
                      )}

                      {/* Badge de contrôle quand sélectionné */}
                      {isSelected && (
                        <div className="absolute -top-3.5 right-0 flex items-center gap-1 bg-slate-900 text-white rounded-md px-1.5 py-0.5 text-[10px] shadow">
                          <span className="font-bold">Déplaçable</span>
                          {!sig.isProvider && (
                            <button
                              onClick={(e) => handleRemoveSignature(sig.id, e)}
                              className="ml-1 text-rose-400 hover:text-rose-300 font-bold cursor-pointer"
                              title="Supprimer"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-4 text-center">
            Astuce : Vous pouvez déplacer les signatures sur le document par simple glisser-déposer.
          </p>
        </div>

        {/* ── BARRE D'ACTIONS FLOTTANTE SUR MOBILE ── */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl">
          {/* Ligne principale : actions */}
          <div className="flex items-stretch gap-0 px-0">

            {/* Bouton Signer */}
            <button
              onClick={() => handleOpenModal('draw')}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white cursor-pointer hover:opacity-95 transition active:scale-95"
            >
              <Icon name="pen" className="w-5 h-5" />
              <span className="text-[10px] font-bold">Signer</span>
            </button>

            {/* Divider */}
            <div className="w-px bg-emerald-400/30" />

            {/* Bouton Importer document */}
            <button
              onClick={() => fileInputDocRef.current?.click()}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-3 bg-white text-slate-600 cursor-pointer hover:bg-slate-50 transition active:scale-95"
            >
              <Icon name="upload" className="w-5 h-5 text-emerald-600" />
              <span className="text-[10px] font-bold">Importer</span>
            </button>

            {/* Divider */}
            <div className="w-px bg-slate-200" />

            {/* Bouton Signatures placées (visible si > 0) */}
            {placedSignatures.length > 0 && (
              <>
                <button
                  onClick={() => setMobileDrawerOpen(true)}
                  className="flex-1 flex flex-col items-center justify-center gap-1 py-3 bg-white text-slate-600 cursor-pointer hover:bg-slate-50 transition active:scale-95 relative"
                  title="Voir les signatures"
                >
                  <span className="absolute top-2 right-[calc(50%-14px)] w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] font-extrabold grid place-items-center">
                    {placedSignatures.length}
                  </span>
                  <Icon name="check-circle" className="w-5 h-5 text-emerald-600" />
                  <span className="text-[10px] font-bold">Signatures</span>
                </button>
                <div className="w-px bg-slate-200" />
              </>
            )}

            {/* Bouton Télécharger PDF signé */}
            <button
              onClick={handleDownloadSignedDoc}
              disabled={isDownloading}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 cursor-pointer transition active:scale-95 ${
                clientSignaturesCount > 0
                  ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white hover:opacity-90'
                  : 'bg-white text-slate-500 hover:bg-slate-50'
              }`}
              title="Télécharger le document signé (PDF)"
            >
              {isDownloading ? (
                <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Icon name="download" className="w-5 h-5" />
              )}
              <span className="text-[10px] font-bold">
                {clientSignaturesCount > 0 ? 'PDF Signé' : 'PDF'}
              </span>
            </button>
          </div>

          {/* Barre d'indication safe area iOS */}
          <div className="h-safe-bottom" style={{ height: 'env(safe-area-inset-bottom, 0px)' }} />
        </div>

        {/* ── OVERLAY SOMBRE LORSQUE LE TIROIR MOBILE EST OUVERT ── */}
        {mobileDrawerOpen && (
          <div
            onClick={() => setMobileDrawerOpen(false)}
            className="lg:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 transition-opacity"
          />
        )}

        {/* ── PANNEAU LATÉRAL (FIXE SUR DESKTOP, TIROIR TIROIR BOTTOM-SHEET SUR MOBILE) ── */}
        <aside
          className={`
            fixed inset-x-0 bottom-0 z-50 max-h-[85vh] rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out
            lg:static lg:inset-auto lg:h-full lg:w-[390px] lg:max-h-none lg:rounded-none lg:shadow-none
            bg-white border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col shrink-0 min-h-0
            ${mobileDrawerOpen ? 'translate-y-0 pointer-events-auto' : 'translate-y-full pointer-events-none lg:translate-y-0 lg:pointer-events-auto'}
          `}
        >
          {/* Poignée de drag visuelle pour mobile */}
          <div className="lg:hidden flex justify-center pt-3 pb-1">
            <span className="w-10 h-1 bg-slate-300 rounded-full" />
          </div>

          {/* En-tête fixe du panneau */}
          <div className="p-4 sm:p-5 border-b border-slate-100 shrink-0 bg-white flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Options de signature</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Importez un fichier de signature ou signez numériquement à la main.
              </p>
            </div>
            {/* Bouton fermer sur mobile */}
            <button
              onClick={() => setMobileDrawerOpen(false)}
              className="lg:hidden w-8 h-8 rounded-lg grid place-items-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <Icon name="x" className="w-4 h-4" />
            </button>
          </div>

          {/* Seul le contenu intérieur défile */}
          <div className="p-5 space-y-6 flex-1 overflow-y-auto scroll-slim min-h-0">

            {/* ── OPTION 1 : IMPORTER UNE SIGNATURE (IMAGE) ── */}
            <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/50 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 grid place-items-center text-xs font-bold">
                  1
                </span>
                <h4 className="font-bold text-slate-900 text-sm">Option A — Importer une signature</h4>
              </div>
              <p className="text-xs text-slate-500">
                Chargez une image de votre signature (PNG fond transparent ou JPG) et placez-la sur le document.
              </p>

              <input
                ref={signatureInputFileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleQuickUploadSignature(e.target.files[0])}
              />

              <button
                onClick={() => signatureInputFileRef.current?.click()}
                className="w-full py-3 rounded-xl border border-dashed border-teal-300 bg-teal-50/40 hover:bg-teal-50 text-teal-800 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Icon name="upload" className="w-4 h-4 text-teal-600" />
                Choisir une image de signature
              </button>
            </div>

            {/* ── OPTION 2 : SIGNER NUMÉRIQUEMENT SUR LE DOCUMENT ── */}
            <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/50 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 grid place-items-center text-xs font-bold">
                  2
                </span>
                <h4 className="font-bold text-slate-900 text-sm">Option B — Signer numériquement</h4>
              </div>
              <p className="text-xs text-slate-500">
                Tracez votre signature au doigt, à la souris, ou saisissez votre nom dans un style cursif.
              </p>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleOpenModal('draw')}
                  className="py-2.5 px-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
                >
                  <Icon name="pen" className="w-3.5 h-3.5 text-emerald-600" />
                  Dessiner au doigt
                </button>
                <button
                  onClick={() => handleOpenModal('type')}
                  className="py-2.5 px-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
                >
                  <Icon name="type" className="w-3.5 h-3.5 text-emerald-600" />
                  Taper le nom
                </button>
              </div>
            </div>

            {/* ── LISTE DES SIGNATURES PLACÉES SUR LE DOCUMENT ── */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Signatures sur la page ({placedSignatures.length})
                </p>
              </div>

              <div className="space-y-2">
                {placedSignatures.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedSigId(s.id)}
                    className={`flex items-center justify-between gap-3 p-3 rounded-xl border transition cursor-pointer ${
                      selectedSigId === s.id
                        ? 'border-emerald-400 bg-emerald-50/60'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 grid place-items-center shrink-0">
                        <Icon name="check" className="w-4 h-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">{s.label}</p>
                        <p className="text-[10px] text-slate-400">Position : {Math.round(s.x)}%, {Math.round(s.y)}%</p>
                      </div>
                    </div>

                    {!s.isProvider && (
                      <button
                        onClick={(e) => handleRemoveSignature(s.id, e)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded transition cursor-pointer"
                        title="Supprimer la signature"
                      >
                        <Icon name="trash" className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── MENTION DE SÉCURITÉ ── */}
            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-start gap-2.5">
              <Icon name="shield-check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-emerald-900 leading-relaxed">
                Chaque signature est scellée avec une empreinte horodatée SHA-256 conforme au standard eIDAS.
              </p>
            </div>
          </div>

          {/* ── BOUTONS FIXES ÉPINGLÉS EN BAS ── */}
          <div className="p-5 border-t border-slate-100 space-y-2 bg-white shrink-0 z-10 shadow-xs">
            <button
              onClick={handleDownloadSignedDoc}
              disabled={isDownloading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white text-sm font-extrabold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/35 transition cursor-pointer disabled:opacity-50"
            >
              {isDownloading ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  <span>Génération du PDF signé...</span>
                </>
              ) : (
                <>
                  <Icon name="download" className="w-4 h-4" />
                  <span>Télécharger le document signé (PDF)</span>
                </>
              )}
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
            >
              Quitter la salle de signature
            </button>
          </div>
        </aside>
      </div>

      {/* ── MODAL DE SIGNATURE NUMÉRIQUE OU IMPORT ── */}
      <SignatureModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultMode={modalDefaultMode}
        onApply={handleModalApply}
      />
    </div>
  );
}
