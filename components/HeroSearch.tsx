'use client';

import React from 'react';
import { 
  NavigationTab, 
  HospitalSettings 
} from '@/lib/types';
import { 
  Search, 
  FileText, 
  Network, 
  PhoneCall, 
  FolderOpen, 
  HelpCircle, 
  AlertTriangle,
  Smartphone,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';

interface HeroSearchProps {
  settings: HospitalSettings;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectTab: (tab: NavigationTab) => void;
  totalRegulations: number;
  totalOfficers: number;
  totalDocs: number;
}

export default function HeroSearch({
  settings,
  searchQuery,
  onSearchChange,
  onSelectTab,
  totalRegulations,
  totalOfficers,
  totalDocs
}: HeroSearchProps) {
  const quickLinks: { label: string; tab: NavigationTab; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
    { label: 'Peraturan BPJS', tab: 'peraturan', icon: FileText, desc: `${totalRegulations} Regulasi Resmi` },
    { label: 'Alur Pelayanan', tab: 'pelayanan', icon: Network, desc: 'Panduan Rawat Jalan & Inap' },
    { label: 'Kanal Pendaftaran', tab: 'pendaftaran', icon: Smartphone, desc: 'Mobile JKN & Mesin APM' },
    { label: 'Petugas BPJS RS', tab: 'petugas', icon: PhoneCall, desc: `${totalOfficers} Petugas PIPP Siaga` },
    { label: 'Dokumen & SOP', tab: 'dokumen', icon: FolderOpen, desc: `${totalDocs} File Unduhan` },
    { label: 'Tanya Jawab FAQ', tab: 'faq', icon: HelpCircle, desc: 'Pertanyaan Pasien' }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/50">
      {/* Background Accent Grid / Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Subtle Government & Hospital Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/40 text-emerald-200 text-xs font-medium mb-4 backdrop-blur-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Portal Pelayanan Resmi BPJS Kesehatan · {settings.hospitalName}</span>
        </div>

        {/* Hero Title & Subheading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
          Informasi BPJS Kesehatan
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
          Temukan informasi pelayanan BPJS Kesehatan di rumah sakit dengan mudah: regulasi resmi, alur berobat rawat jalan & inap, jadwal petugas BPJS Center, dan kanal pendaftaran online.
        </p>

        {/* Global Live Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari informasi BPJS, peraturan, pendaftaran, dokumen, rujukan..."
              className="w-full pl-12 pr-28 py-3.5 bg-white text-slate-900 rounded-xl text-sm placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-lg border border-slate-200/20"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-20 text-xs text-slate-400 hover:text-slate-600 px-1 py-0.5"
              >
                Hapus
              </button>
            )}
            <button
              onClick={() => onSelectTab('peraturan')}
              className="absolute right-2 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
            >
              <span>Cari</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 mt-2 text-xs text-slate-400 flex-wrap">
            <span>Paling sering dicari:</span>
            <button onClick={() => { onSearchChange('Perpres 59'); onSelectTab('peraturan'); }} className="text-emerald-300 hover:underline">Perpres 59/2024</button>
            <span>·</span>
            <button onClick={() => { onSearchChange('Rujukan 90 hari'); onSelectTab('faq'); }} className="text-emerald-300 hover:underline">Rujukan 90 Hari</button>
            <span>·</span>
            <button onClick={() => { onSelectTab('pendaftaran'); }} className="text-emerald-300 hover:underline">Mobile JKN</button>
            <span>·</span>
            <button onClick={() => { onSelectTab('pelayanan'); }} className="text-emerald-300 hover:underline">Alur Rawat Inap</button>
          </div>
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-4xl mx-auto">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.tab}
                onClick={() => onSelectTab(item.tab)}
                className="group flex flex-col items-center p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700/70 hover:border-emerald-500/50 transition-all text-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-700/40 text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-105 group-hover:bg-emerald-900 transition-all">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {item.label}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  {item.desc}
                </span>
              </button>
            );
          })}
        </div>

        {/* Emergency Notice Ribbon */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-3 text-xs text-amber-200 bg-amber-950/30 py-2.5 px-4 rounded-xl max-w-3xl mx-auto border border-amber-800/40">
          <div className="flex items-center gap-1.5 font-semibold text-amber-300">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Kondisi Darurat (Emergency):</span>
          </div>
          <span className="text-slate-300">
            Pasien IGD ditanggung BPJS tanpa perlu surat rujukan faskes tingkat pertama.
          </span>
          <div className="flex items-center gap-1.5 text-white font-medium">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>BPJS Kesehatan Pandawa : <strong>081 165 165</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
