import React from 'react';
import Icon from '../../components/common/Icon';

export default function ReportsPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1500px] w-full mx-auto animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-slate-900">
            Rapports
          </h1>
          <p className="text-sm text-slate-500 mt-1">Mesurez l'efficacité de vos signatures.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition cursor-pointer">
          <Icon name="download" className="w-4 h-4" />
          Exporter
        </button>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 max-w-xs mb-6">
        <p className="text-[12px] text-slate-500 font-medium">Documents signés</p>
        <p className="text-[26px] font-extrabold mt-1 text-slate-900">108</p>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6">
        <h3 className="font-bold text-slate-900 mb-4">Signatures cette semaine</h3>
        <div className="flex items-end gap-3 h-48">
          {[
            { day: 'Lun', count: 3 },
            { day: 'Mar', count: 5 },
            { day: 'Mer', count: 2 },
            { day: 'Jeu', count: 7 },
            { day: 'Ven', count: 4 },
            { day: 'Sam', count: 1 },
            { day: 'Dim', count: 0 },
          ].map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-[11px] font-bold text-slate-900">{d.count}</span>
              <div className="w-full bg-emerald-500 rounded-t-md" style={{ height: `${d.count * 12}%` }}></div>
              <span className="text-[10px] font-medium text-slate-400">{d.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
