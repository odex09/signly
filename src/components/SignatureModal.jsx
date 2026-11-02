import React, { useState, useRef, useEffect } from 'react';
import Icon from './common/Icon';

export default function SignatureModal({
  isOpen,
  onClose,
  onApply,
  targetField = 'client',
  defaultMode = 'draw',
}) {
  const [mode, setMode] = useState(defaultMode); // 'draw' | 'type' | 'upload'
  const [typedName, setTypedName] = useState('Camille Moreau');
  const [fontFamily, setFontFamily] = useState('Caveat');
  const [inkColor, setInkColor] = useState('#0f172a');
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [removeBg, setRemoveBg] = useState(true);

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setMode(defaultMode);
    }
  }, [isOpen, defaultMode]);

  // Initialisation du canvas de dessin
  useEffect(() => {
    if (isOpen && mode === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = inkColor;
      ctx.lineWidth = 2.8;
    }
  }, [isOpen, mode, inkColor]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  // Traitement d'une image de signature importée
  const handleFileUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Optionnellement rendre le fond blanc transparent
        const c = document.createElement('canvas');
        c.width = img.width;
        c.height = img.height;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);

        if (removeBg) {
          try {
            const imgData = ctx.getImageData(0, 0, c.width, c.height);
            const d = imgData.data;
            for (let i = 0; i < d.length; i += 4) {
              const r = d[i], g = d[i + 1], b = d[i + 2];
              // Si pixel quasi-blanc, rendre transparent
              if (r > 220 && g > 220 && b > 220) {
                d[i + 3] = 0;
              }
            }
            ctx.putImageData(imgData, 0, 0);
          } catch (err) {
            console.warn('Cannot process image background', err);
          }
        }
        setUploadedImage(c.toDataURL('image/png'));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Convertir le texte tapé en image PNG transparente
  const createTypedSignatureDataUrl = (text, font, color) => {
    const c = document.createElement('canvas');
    c.width = 600;
    c.height = 200;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = color;
    ctx.font = `italic 72px '${font}', cursive, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, c.width / 2, c.height / 2);
    return c.toDataURL('image/png');
  };

  const handleApply = () => {
    let finalDataUrl = null;
    let label = '';

    if (mode === 'draw') {
      const canvas = canvasRef.current;
      finalDataUrl = canvas ? canvas.toDataURL('image/png') : null;
      label = 'Signature manuscrite';
    } else if (mode === 'type') {
      finalDataUrl = createTypedSignatureDataUrl(
        typedName || 'Camille Moreau',
        fontFamily,
        inkColor
      );
      label = typedName || 'Camille Moreau';
    } else {
      finalDataUrl = uploadedImage;
      label = 'Signature importée';
    }

    if (!finalDataUrl && mode === 'upload') {
      alert('Veuillez importer une image de signature d\'abord.');
      return;
    }

    onApply({
      field: targetField,
      mode,
      dataUrl: finalDataUrl,
      text: label,
      hasDrawn,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-transparent transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-up border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg">
              {targetField === 'initials' ? 'Ajouter vos initiales' : 'Ajouter une signature'}
            </h3>
            <p className="text-[12px] text-slate-500 mt-0.5">
              Choisissez votre méthode : dessin tactile, saisie ou import d'image.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl grid place-items-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            <Icon name="x" className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="px-5 pt-4">
          <div className="flex gap-1.5 p-1 rounded-2xl bg-slate-100">
            <button
              onClick={() => setMode('draw')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                mode === 'draw'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon name="pen" className="w-3.5 h-3.5" />
              Dessiner
            </button>
            <button
              onClick={() => setMode('upload')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                mode === 'upload'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon name="upload" className="w-3.5 h-3.5" />
              Importer image
            </button>
            <button
              onClick={() => setMode('type')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                mode === 'type'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon name="type" className="w-3.5 h-3.5" />
              Taper
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* MODE DESSINER */}
          {mode === 'draw' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600">Couleur d'encre :</span>
                <div className="flex items-center gap-2">
                  {[
                    { color: '#0f172a', label: 'Noir' },
                    { color: '#1e3a8a', label: 'Bleu foncé' },
                    { color: '#047857', label: 'Vert' },
                  ].map((c) => (
                    <button
                      key={c.color}
                      onClick={() => setInkColor(c.color)}
                      style={{ backgroundColor: c.color }}
                      className={`w-6 h-6 rounded-full transition cursor-pointer ${
                        inkColor === c.color ? 'ring-2 ring-offset-2 ring-emerald-500 scale-110' : 'opacity-80 hover:opacity-100'
                      }`}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>

              <div className="relative">
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-44 rounded-2xl bg-slate-50/80 border-2 border-dashed border-slate-200 touch-none cursor-crosshair block shadow-inner"
                />
                {!hasDrawn && (
                  <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                    <Icon name="pen" className="w-6 h-6 text-slate-300 mb-1" />
                    <span className="text-xs text-slate-400 font-medium">Tracez votre signature ici</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center text-xs">
                <p className="text-slate-400">À la souris, au stylet ou au doigt</p>
                <button
                  onClick={clearCanvas}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 inline-flex items-center gap-1 cursor-pointer"
                >
                  <Icon name="eraser" className="w-3.5 h-3.5" />
                  Effacer
                </button>
              </div>
            </div>
          )}

          {/* MODE IMPORTER IMAGE */}
          {mode === 'upload' && (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files[0])}
              />

              {!uploadedImage ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files?.[0]) {
                      handleFileUpload(e.dataTransfer.files[0]);
                    }
                  }}
                  className="h-44 rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/30 hover:bg-emerald-50/60 transition grid place-items-center text-center p-5 cursor-pointer group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-emerald-200 grid place-items-center mx-auto mb-2 text-emerald-600 shadow-xs group-hover:scale-105 transition">
                      <Icon name="upload" className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-slate-800">
                      Cliquez ou glissez votre signature
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Fichiers PNG (fond transparent idéal) ou JPG · 5 Mo max
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="relative h-44 rounded-2xl border border-slate-200 bg-[repeating-conic-gradient(#f1f5f9_0%_25%,_transparent_0%_50%)] bg-[length:16px_16px] grid place-items-center p-4">
                    <img
                      src={uploadedImage}
                      alt="Signature importée"
                      className="max-h-36 max-w-full object-contain filter drop-shadow-sm"
                    />
                    <button
                      onClick={() => setUploadedImage(null)}
                      className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-white/90 border border-slate-200 text-xs font-semibold text-rose-600 hover:bg-rose-50 shadow-xs cursor-pointer"
                    >
                      Changer
                    </button>
                  </div>
                  <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={removeBg}
                      onChange={(e) => setRemoveBg(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    Rendre le fond blanc transparent automatiquement
                  </label>
                </div>
              )}
            </div>
          )}

          {/* MODE TAPER */}
          {mode === 'type' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Nom à signer
                </label>
                <input
                  type="text"
                  value={typedName}
                  onChange={(e) => setTypedName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition outline-none"
                  placeholder="Tapez votre prénom et nom"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Style de calligraphie
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'Caveat', label: 'Calligraphie fluide' },
                    { id: 'Dancing Script', label: 'Élégant cursif' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFontFamily(f.id)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition cursor-pointer ${
                        fontFamily === f.id
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-28 rounded-2xl bg-slate-50 border border-slate-200 grid place-items-center overflow-hidden p-2">
                <span
                  style={{ fontFamily: `'${fontFamily}', cursive`, color: inkColor }}
                  className="text-4xl text-center select-none"
                >
                  {typedName || 'Camille Moreau'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex gap-2.5 p-5 pt-0">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
          >
            Annuler
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white text-sm font-bold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/35 transition cursor-pointer"
          >
            Placer la signature
          </button>
        </div>
      </div>
    </div>
  );
}
