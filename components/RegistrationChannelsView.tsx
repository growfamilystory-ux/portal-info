'use client';

import React, { useState } from 'react';
import { RegistrationChannel } from '@/lib/types';
import { 
  Smartphone, 
  Monitor, 
  MessageSquare, 
  PhoneCall, 
  MapPin, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface RegistrationChannelsViewProps {
  channels: RegistrationChannel[];
  hospitalName: string;
}

export default function RegistrationChannelsView({ channels, hospitalName }: RegistrationChannelsViewProps) {
  const [selectedChannel, setSelectedChannel] = useState<RegistrationChannel | null>(null);

  const getChannelIcon = (type: RegistrationChannel['jenisKanal']) => {
    switch (type) {
      case 'Aplikasi Mobile':
        return Smartphone;
      case 'Anjungan Mandiri (APM)':
        return Monitor;
      case 'WhatsApp / Bot':
        return MessageSquare;
      case 'Call Center':
        return PhoneCall;
      default:
        return MapPin;
    }
  };

  return (
    <div className="space-y-6 py-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
            <Smartphone className="w-4 h-4" />
            <span>Kanal Pelayanan & Antrean Digital</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Kanal Pendaftaran & Antrean Pasien BPJS
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
            Hindari antrean panjang di loket dengan memanfaatkan kanal pendaftaran mandiri. Peserta dapat mengambil antrean poliklinik dari rumah lewat Mobile JKN atau check-in mandiri di mesin APM lobi RS.
          </p>
        </div>

        {/* Tip Box */}
        <div className="mt-5 p-4 bg-emerald-50/80 border border-emerald-200/80 rounded-xl flex items-start gap-3 text-xs text-emerald-950">
          <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-bold">Tips Cepat: </strong>
            Pasien disarankan mendaftar H-1 s.d. H-7 melalui aplikasi <strong>Mobile JKN</strong>. Setibanya di {hospitalName}, cukup scan e-KTP di mesin Anjungan Pendaftaran Mandiri (APM) untuk langsung mendapatkan nomor poli tanpa perlu ke loket admisi.
          </div>
        </div>
      </div>

      {/* Channels List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {channels.map((ch) => {
          const Icon = getChannelIcon(ch.jenisKanal);

          return (
            <div
              key={ch.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-all"
            >
              <div>
                {/* Header card */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    {ch.badge && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mb-1">
                        {ch.badge}
                      </span>
                    )}
                    <span className="block text-[11px] text-slate-400 font-medium">{ch.jenisKanal}</span>
                  </div>
                </div>

                <h2 className="text-base font-bold text-slate-900 mb-1.5">
                  {ch.namaKanal}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {ch.deskripsi}
                </p>

                {/* Syarat-syarat */}
                <div className="mb-4 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block mb-2">
                    Persyaratan yang Diperlukan:
                  </span>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {ch.syarat.map((s, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Langkah Penggunaan */}
                <div className="mb-4">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block mb-2">
                    Langkah-Langkah Penggunaan:
                  </span>
                  <ol className="text-xs text-slate-600 space-y-1.5 list-decimal list-inside">
                    {ch.langkah.map((l, lIdx) => (
                      <li key={lIdx} className="leading-relaxed">
                        <span className="text-slate-700 font-medium">{l}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Footer info & CTA */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{ch.jamLayanan}</span>
                  </div>
                  {ch.nomorKontak && (
                    <span className="font-medium text-slate-700">Kontak: {ch.nomorKontak}</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {ch.url && (
                    <a
                      href={ch.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors shadow-xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Buka Kanal Resmi</span>
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedChannel(ch)}
                    className="px-3.5 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    Lihat Rincian
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Detail Kanal if selected */}
      {selectedChannel && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide block mb-1">
                  Panduan Kanal Pendaftaran
                </span>
                <h3 className="text-lg font-bold text-slate-900">{selectedChannel.namaKanal}</h3>
              </div>
              <button
                onClick={() => setSelectedChannel(null)}
                className="text-slate-400 hover:text-slate-700 p-1 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600 max-h-[70vh] overflow-y-auto pr-1">
              <div>
                <strong className="block text-slate-800 mb-1">Tentang Kanal:</strong>
                <p className="leading-relaxed">{selectedChannel.deskripsi}</p>
              </div>

              <div>
                <strong className="block text-slate-800 mb-1">Persyaratan Dokumen:</strong>
                <ul className="list-disc list-inside space-y-1">
                  {selectedChannel.syarat.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="block text-slate-800 mb-1">Tata Cara & Langkah:</strong>
                <ol className="list-decimal list-inside space-y-1.5">
                  {selectedChannel.langkah.map((l, idx) => (
                    <li key={idx} className="leading-relaxed">{l}</li>
                  ))}
                </ol>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <p><strong>Jam Pelayanan: </strong>{selectedChannel.jamLayanan}</p>
                {selectedChannel.nomorKontak && (
                  <p className="mt-1"><strong>Kontak Bantuan: </strong>{selectedChannel.nomorKontak}</p>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setSelectedChannel(null)}
                className="px-4 py-2 text-xs font-semibold bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"
              >
                Tutup
              </button>
              {selectedChannel.url && (
                <a
                  href={selectedChannel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg inline-flex items-center gap-1.5"
                >
                  <span>Buka Sekarang</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
