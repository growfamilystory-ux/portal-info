'use client';

import React from 'react';
import { HospitalSettings, NavigationTab } from '@/lib/types';
import { 
  Building2, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ExternalLink,
  ChevronUp
} from 'lucide-react';

interface FooterProps {
  settings: HospitalSettings;
  onSelectTab: (tab: NavigationTab) => void;
}

export default function Footer({ settings, onSelectTab }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 text-xs mt-16 border-t border-slate-800">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Hospital & Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-tight">
                  Informasi BPJS Kesehatan
                </h3>
                <p className="text-slate-400 text-xs">{settings.hospitalName}</p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Pusat informasi digital BPJS Kesehatan di lingkungan rumah sakit. Menyajikan panduan pendaftaran antrean, regulasi resmi pemerintah, alur berobat, dan kontak petugas BPJS Center.
            </p>

            <div className="pt-2 text-slate-400 space-y-1.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{settings.hospitalAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{settings.operatingHours}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigasi Layanan */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">
              Layanan Informasi
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onSelectTab('peraturan')} className="hover:text-emerald-400 transition-colors">
                  Peraturan BPJS Kesehatan
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('pelayanan')} className="hover:text-emerald-400 transition-colors">
                  Alur Pelayanan Pasien
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('pendaftaran')} className="hover:text-emerald-400 transition-colors">
                  Kanal Pendaftaran Antrean
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('petugas')} className="hover:text-emerald-400 transition-colors">
                  Petugas BPJS Center RS
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('informasi-peserta')} className="hover:text-emerald-400 transition-colors">
                  Hak & Kewajiban Peserta
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Berkas & FAQ */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">
              Bantuan & Berkas
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onSelectTab('faq')} className="hover:text-emerald-400 transition-colors">
                  Tanya Jawab (FAQ) Pasien
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('dokumen')} className="hover:text-emerald-400 transition-colors">
                  Unduh Formulir & SOP
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('pengumuman')} className="hover:text-emerald-400 transition-colors">
                  Pengumuman Layanan
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('kontak')} className="hover:text-emerald-400 transition-colors">
                  Lokasi Meja & Kontak RS
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('admin')} className="hover:text-emerald-400 transition-colors text-slate-400">
                  Panel Pengelolaan (CMS)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Tautan Resmi Nasional */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">
              Tautan Eksternal Resmi
            </h4>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="https://bpjs-kesehatan.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Portal BPJS Kesehatan RI</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://kemkes.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Kementerian Kesehatan RI</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://peraturan.bpk.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>JDIH Database Peraturan BPK</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.lapor.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Layanan Aspirasi SP4N LAPOR!</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mandatory Official Disclaimer specified by prompt */}
      <div className="border-t border-slate-800 bg-slate-950 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[11px] text-slate-400 max-w-3xl leading-relaxed">
            <strong className="text-slate-300">Pemberitahuan Resmi: </strong>
            Informasi ini disediakan sebagai media informasi. Untuk ketentuan resmi, selalu merujuk pada sumber resmi BPJS Kesehatan dan/atau instansi terkait.
          </p>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors inline-flex items-center gap-1 text-xs shrink-0"
            title="Kembali ke atas"
          >
            <ChevronUp className="w-4 h-4" />
            <span className="hidden sm:inline">Ke Atas</span>
          </button>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-slate-950 border-t border-slate-900 py-3 text-center text-[10px] text-slate-500">
        &copy; 2026 {settings.hospitalName} · Sistem Informasi Digital Pelayanan BPJS Kesehatan Terpadu.
      </div>
    </footer>
  );
}
