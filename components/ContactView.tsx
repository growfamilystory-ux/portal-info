'use client';

import React from 'react';
import { HospitalSettings, Officer } from '@/lib/types';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Copy, 
  ShieldAlert, 
  HelpCircle,
  ExternalLink,
  UserCheck
} from 'lucide-react';

interface ContactViewProps {
  settings: HospitalSettings;
  officers: Officer[];
  onShowToast: (title: string, msg?: string, type?: 'success' | 'error' | 'info') => void;
}

export default function ContactView({ settings, officers, onShowToast }: ContactViewProps) {
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onShowToast(`${label} disalin`, text, 'success');
  };

  const activeOfficers = officers.filter(o => o.statusAktif);

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
            <Building2 className="w-4 h-4" />
            <span>Pusat Layanan & Pengaduan Rumah Sakit</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Kontak & Lokasi Meja Pelayanan BPJS Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
            Kunjungi loket layanan informasi terpadu di rumah sakit atau hubungi saluran bantuan resmi untuk pertanyaan administrasi, pengaduan kendala, dan asistensi kepesertaan.
          </p>
        </div>
      </div>

      {/* Main Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hospital Desk Info */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">{settings.hospitalName}</h2>
              <p className="text-xs text-slate-400">Unit Pelayanan BPJS Center Terpadu</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-800">Alamat Rumah Sakit:</strong>
                <span>{settings.hospitalAddress}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Building2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-800">Lokasi Meja Pelayanan di RS:</strong>
                <span>{settings.bpjsDeskLocation}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-800">Jam Pelayanan Tatap Muka:</strong>
                <span>{settings.operatingHours}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-800">Email Resmi BPJS Center:</strong>
                <span className="font-mono">{settings.bpjsCenterEmail}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
            <button
              onClick={() => handleCopy(settings.bpjsHotlineRS, 'Nomor Hotline RS')}
              className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Salin Nomor Hotline RS</span>
            </button>
          </div>
        </div>

        {/* Official Complaint & Escalation Channels */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Saluran Resmi Nasional BPJS</h2>
              <p className="text-xs text-slate-400">Pengaduan & Pusat Bantuan Terpusat</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <strong className="text-slate-900 text-xs block mb-0.5">BPJS Care Center 165</strong>
              <p className="text-slate-500 mb-2">Layanan telepon 24 jam bebas pulsa untuk informasi status kepesertaan, keluhan faskes, dan pendaftaran.</p>
              <span className="font-mono font-bold text-emerald-800 text-sm">165</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <strong className="text-slate-900 text-xs block mb-0.5">PANDAWA (WhatsApp Resmi BPJS)</strong>
              <p className="text-slate-500 mb-2">Pelayanan administrasi via chat interaktif (pengaktifan status, perubahan faskes, bayi baru lahir).</p>
              <span className="font-mono font-bold text-emerald-800 text-sm">{settings.pandawaNumber}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <strong className="text-slate-900 text-xs block mb-0.5">SP4N LAPOR! (Pemerintah RI)</strong>
              <p className="text-slate-500 mb-1">Kanal aspirasi dan pengaduan pelayanan publik resmi nasional.</p>
              <a href="https://www.lapor.go.id" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-semibold hover:underline">
                www.lapor.go.id &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Duty Officers on Desk */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200">
        <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-emerald-700" />
          <span>Petugas BPJS Center yang Siap Ditemui Hari Ini</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeOfficers.map((o) => (
            <div key={o.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start gap-3">
              <img
                src={o.foto}
                alt={o.nama}
                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-900 text-xs truncate">{o.nama}</h4>
                <p className="text-[11px] text-emerald-700 font-medium truncate">{o.jabatan}</p>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{o.lokasiPelayanan}</p>
                <a
                  href={`https://wa.me/${o.nomorKontak.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 hover:underline"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>Chat: {o.nomorKontak}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
