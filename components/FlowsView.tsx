'use client';

import React, { useState } from 'react';
import { FlowStep } from '@/lib/types';
import { 
  CheckCircle2, 
  MapPin, 
  Clock, 
  FileText, 
  Lightbulb, 
  Printer, 
  Stethoscope, 
  BedDouble, 
  AlertCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

interface FlowsViewProps {
  flows: FlowStep[];
  hospitalName: string;
}

export default function FlowsView({ flows, hospitalName }: FlowsViewProps) {
  const [activeType, setActiveType] = useState<FlowStep['alurTipe']>('rawat-jalan');

  const typesConfig: { type: FlowStep['alurTipe']; label: string; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
    { 
      type: 'rawat-jalan', 
      label: 'Alur Rawat Jalan (Poli Spesialis)', 
      icon: Stethoscope,
      desc: 'Alur berobat terencana dengan rujukan FKTP atau Surat Kontrol DPJP.'
    },
    { 
      type: 'rawat-inap', 
      label: 'Alur Rawat Inap & KRIS', 
      icon: BedDouble,
      desc: 'Alur penerimaan pasien inap dari Poliklinik atau rujukan darurat IGD.'
    },
    { 
      type: 'igd', 
      label: 'Alur Gawat Darurat (IGD 24 Jam)', 
      icon: AlertCircle,
      desc: 'Penanganan darurat langsung tanpa surat rujukan Puskesmas.'
    }
  ];

  const currentSteps = flows
    .filter(f => f.alurTipe === activeType)
    .sort((a, b) => a.stepNumber - b.stepNumber);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 py-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block mb-1">
              Petunjuk Teknis Pasien di Rumah Sakit
            </span>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Alur Pelayanan Pasien BPJS Kesehatan
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Panduan langkah demi langkah proses berobat di {hospitalName}. Alur ini dirancang terintegrasi dengan sistem antrean online Mobile JKN dan mesin APM mandiri.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="self-start md:self-auto inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Panduan Alur</span>
          </button>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-slate-100">
          {typesConfig.map((item) => {
            const Icon = item.icon;
            const isActive = activeType === item.type;
            return (
              <button
                key={item.type}
                onClick={() => setActiveType(item.type)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isActive
                    ? 'bg-emerald-50/90 border-emerald-500 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                  <span className={`text-xs font-bold ${isActive ? 'text-emerald-950' : 'text-slate-800'}`}>
                    {item.label}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1">{item.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual Step by Step Roadmap */}
      <div className="space-y-4">
        {currentSteps.map((step, index) => (
          <div
            key={step.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 transition-all hover:border-emerald-300 relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-start gap-4">
              {/* Step Number Badge */}
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white font-bold flex items-center justify-center shrink-0 text-sm shadow-xs">
                {step.stepNumber}
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <h2 className="text-base font-bold text-slate-900">
                    {step.judul}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {step.estimasiWaktu}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {step.deskripsi}
                </p>

                {/* Location & Required Documents Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-700 block text-[11px]">Lokasi Pelayanan:</span>
                      <span className="text-slate-600">{step.lokasi}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-700 block text-[11px]">Dokumen yang Dibutuhkan:</span>
                      <ul className="text-slate-600 list-disc list-inside">
                        {step.dokumen.map((doc, dIdx) => (
                          <li key={dIdx} className="leading-tight">{doc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Pro-Tips Callout */}
                {step.tips && (
                  <div className="mt-3 flex items-start gap-2 text-xs text-emerald-900 bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200/60">
                    <Lightbulb className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-emerald-950">Tips Pasien: </strong>
                      <span>{step.tips}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Next step connector visual if not last */}
            {index < currentSteps.length - 1 && (
              <div className="hidden sm:block absolute left-9 bottom-0 translate-y-full w-0.5 h-4 bg-emerald-200 z-10" />
            )}
          </div>
        ))}
      </div>

      {/* Bottom Advice Box */}
      <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex items-start gap-3 text-xs text-slate-600">
        <HelpCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-800 block text-sm mb-1">Catatan Penting Pelayanan Rumah Sakit</strong>
          <p className="leading-relaxed">
            Alur di atas merupakan standar operasional di {hospitalName}. Apabila terdapat perubahan kondisi darurat atau arahan khusus dari dokter spesialis (DPJP), ikuti selalu instruksi perawat jaga dan petugas BPJS Center di lantai 1.
          </p>
        </div>
      </div>
    </div>
  );
}
