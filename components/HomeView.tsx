'use client';

import React from 'react';
import { 
  HospitalSettings, 
  Regulation, 
  Officer, 
  DocumentItem, 
  Announcement, 
  NavigationTab,
  HospitalService,
  BannerSlide
} from '@/lib/types';
import HomeSlider from './HomeSlider';
import { 
  ShieldCheck, 
  FileText, 
  UserCheck, 
  FolderOpen, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  ArrowRight, 
  ExternalLink, 
  AlertCircle,
  Stethoscope,
  BedDouble,
  Siren,
  FileCheck2,
  HelpCircle,
  Send,
  MessageSquare
} from 'lucide-react';

interface HomeViewProps {
  settings: HospitalSettings;
  regulations: Regulation[];
  officers: Officer[];
  documents: DocumentItem[];
  announcements: Announcement[];
  services: HospitalService[];
  slides: BannerSlide[];
  onSelectTab: (tab: NavigationTab) => void;
  onOpenRegulationDetail: (reg: Regulation) => void;
  onOpenDocumentPreview: (doc: DocumentItem) => void;
  onOpenAnnouncementDetail?: (announcement: Announcement) => void;
}

export default function HomeView({
  settings,
  regulations,
  officers,
  documents,
  announcements,
  slides,
  onSelectTab,
  onOpenRegulationDetail,
  onOpenDocumentPreview,
  onOpenAnnouncementDetail
}: HomeViewProps) {
  // Service category cards matching prompt specification
  const serviceCards = [
    {
      title: 'Informasi Kepesertaan',
      desc: 'Cek status aktif BPJS Mandiri, PPU, PBI, dan hak kelas rawat sesuai regulasi.',
      tab: 'informasi-peserta' as NavigationTab,
      icon: ShieldCheck,
      color: 'text-emerald-700 bg-emerald-50'
    },
    {
      title: 'Pendaftaran & Antrean',
      desc: 'Panduan pendaftaran mandiri via Mobile JKN dan mesin APM lobi RS.',
      tab: 'pendaftaran' as NavigationTab,
      icon: Send,
      color: 'text-teal-700 bg-teal-50'
    },
    {
      title: 'Perubahan Data (PANDAWA)',
      desc: 'Ubah faskes, aktivasi bayi baru lahir, dan data kependudukan via WhatsApp BPJS.',
      tab: 'pendaftaran' as NavigationTab,
      icon: MessageSquare,
      color: 'text-blue-700 bg-blue-50'
    },
    {
      title: 'Ketentuan Rujukan',
      desc: 'Masa berlaku rujukan 90 hari, surat kontrol DPJP, dan rujukan khusus.',
      tab: 'peraturan' as NavigationTab,
      icon: FileCheck2,
      color: 'text-indigo-700 bg-indigo-50'
    },
    {
      title: 'Rawat Jalan Poliklinik',
      desc: 'Alur pendaftaran, poliklinik spesialis, rekam medis, dan pengambilan obat.',
      tab: 'pelayanan' as NavigationTab,
      icon: Stethoscope,
      color: 'text-emerald-700 bg-emerald-50'
    },
    {
      title: 'Rawat Inap & Standar KRIS',
      desc: 'Fasilitas KRIS 12 kriteria, SPRI dokter, dan edukasi hak kelas tanpa iur biaya.',
      tab: 'pelayanan' as NavigationTab,
      icon: BedDouble,
      color: 'text-cyan-700 bg-cyan-50'
    },
    {
      title: 'Administrasi & Berkas',
      desc: 'Syarat klaim, koordinasi manfaat Jasa Raharja, dan dokumen bebas biaya.',
      tab: 'dokumen' as NavigationTab,
      icon: FileText,
      color: 'text-slate-700 bg-slate-100'
    },
    {
      title: 'Pengaduan & Bantuan (PIPP)',
      desc: 'Penanganan keluhan, kendala fingerprint, atau klarifikasi biaya di RS.',
      tab: 'petugas' as NavigationTab,
      icon: HelpCircle,
      color: 'text-amber-700 bg-amber-50'
    }
  ];

  const latestAnnouncements = announcements.filter(a => a.status === 'Publik').slice(0, 2);
  const featuredRegulations = regulations.filter(r => r.status === 'Aktif').slice(0, 3);
  const featuredDocs = documents.slice(0, 4);
  const activeOfficers = officers.filter(o => o.statusAktif).slice(0, 3);

  return (
    <div className="space-y-12 py-8">
      {/* SECTION: Featured Banner Photo Slider (Menu Slider Klik Langsung) */}
      {slides && slides.length > 0 && (
        <section aria-label="Sorotan Informasi Utama" className="slider-container">
          <HomeSlider 
            slides={slides} 
            onSelectTab={onSelectTab} 
            announcements={announcements}
            onOpenAnnouncementDetail={onOpenAnnouncementDetail}
          />
        </section>
      )}

      {/* SECTION: Informasi Penting / Pengumuman Kritis Banner */}
      {latestAnnouncements.length > 0 && (
        <section aria-labelledby="announcements-heading" className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-600 text-white">
                <AlertCircle className="w-4 h-4" />
              </span>
              <h2 id="announcements-heading" className="text-sm font-bold text-amber-950 uppercase tracking-wide">
                Informasi Penting Pelayanan BPJS
              </h2>
            </div>
            <button
              onClick={() => onSelectTab('pengumuman')}
              className="text-xs font-semibold text-amber-900 hover:text-amber-700 flex items-center gap-1"
            >
              <span>Lihat Semua Pengumuman</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {latestAnnouncements.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectTab('pengumuman')}
                className="bg-white p-4 rounded-xl border border-amber-200/60 hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2 text-[11px] text-amber-800 font-medium mb-1.5">
                  <span className="font-semibold px-2 py-0.5 rounded bg-amber-100/80 text-amber-900">
                    {item.kategori}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <Calendar className="w-3 h-3" />
                    {item.tanggal}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-emerald-800 transition-colors">
                  {item.judul}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {item.ringkasan}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION: Layanan BPJS Kesehatan (8 Core Categories) */}
      <section aria-labelledby="services-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 pb-2 border-b border-slate-200">
          <div>
            <h2 id="services-heading" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Layanan BPJS Kesehatan di Rumah Sakit
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Pusat panduan lengkap untuk kebutuhan administrasi, perawatan medis, dan rujukan.
            </p>
          </div>
          <div className="text-xs text-slate-400 font-medium">
            8 Kategori Informasi
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceCards.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                onClick={() => onSelectTab(service.tab)}
                className="bg-white p-5 rounded-xl border border-slate-200/90 hover:border-emerald-500/60 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${service.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-emerald-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:translate-x-0.5 transition-transform">
                  <span>Buka Panduan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION: Peraturan & Ketentuan Resmi Terkini */}
      <section aria-labelledby="regulations-heading" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mb-1">
              <FileCheck2 className="w-4 h-4" />
              <span>Regulasi & Kepastian Hukum Pelayanan</span>
            </div>
            <h2 id="regulations-heading" className="text-xl font-bold text-slate-900">
              Peraturan & Ketentuan BPJS Kesehatan
            </h2>
          </div>
          <button
            onClick={() => onSelectTab('peraturan')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
          >
            <span>Semua Peraturan ({regulations.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-4">
          {featuredRegulations.map((reg) => (
            <div
              key={reg.id}
              className="p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 bg-slate-50/50 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-bold text-emerald-800 font-mono">{reg.nomor}</span>
                  <span>·</span>
                  <span>Tahun {reg.tahun}</span>
                  <span>·</span>
                  <span className="text-slate-600">{reg.jenisPeraturan}</span>
                  <span>·</span>
                  <span className="text-emerald-700 font-medium">{reg.status}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {reg.judul}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {reg.ringkasan}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onOpenRegulationDetail(reg)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
                >
                  Baca Ringkasan
                </button>
                <a
                  href={reg.linkSumberResmi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Buka sumber resmi (BPK/BPJS)"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: Petugas BPJS di Rumah Sakit (Siaga Membantu) */}
      <section aria-labelledby="officers-heading">
        <div className="flex items-center justify-between gap-3 mb-6 pb-2 border-b border-slate-200">
          <div>
            <h2 id="officers-heading" className="text-xl sm:text-2xl font-bold text-slate-900">
              Petugas BPJS Center Rumah Sakit
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Petugas PIPP (Pemberian Informasi & Penanganan Pengaduan) siaga mendampingi di rumah sakit.
            </p>
          </div>
          <button
            onClick={() => onSelectTab('petugas')}
            className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1"
          >
            <span>Semua Petugas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {activeOfficers.map((officer) => (
            <div
              key={officer.id}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={officer.foto}
                    alt={officer.nama}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm leading-tight">{officer.nama}</h3>
                    <p className="text-xs text-emerald-700 font-medium mt-0.5">{officer.jabatan}</p>
                    <span className="inline-block mt-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Aktif Siaga
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 mb-4 pt-2 border-t border-slate-100">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{officer.lokasiPelayanan}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{officer.jamPelayanan} ({officer.hariPelayanan})</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${officer.nomorKontak.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Hubungi via WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: Repositori Dokumen & Formulir Resmi Terbaru */}
      <section aria-labelledby="documents-heading" className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
              <FolderOpen className="w-4 h-4" />
              <span>Dokumen & Formulir Resmi</span>
            </div>
            <h2 id="documents-heading" className="text-xl sm:text-2xl font-bold">
              Unduh Panduan & Formulir Pasien BPJS
            </h2>
          </div>
          <button
            onClick={() => onSelectTab('dokumen')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>Buka Seluruh Dokumen ({documents.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-4 flex flex-col justify-between hover:border-emerald-500/50 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-red-900/60 text-red-300 border border-red-700/50">
                    {doc.format}
                  </span>
                  <span className="text-[11px] text-slate-400">{doc.ukuran}</span>
                </div>
                <h3 className="font-bold text-white text-xs leading-snug mb-1 line-clamp-2">
                  {doc.namaDokumen}
                </h3>
                <p className="text-[11px] text-slate-400">{doc.kategori}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700 flex items-center justify-between">
                <button
                  onClick={() => onOpenDocumentPreview(doc)}
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  Pratinjau & Baca
                </button>
                <span className="text-[10px] text-slate-400">
                  {doc.downloadCount}x diunduh
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: Butuh Bantuan? (Helpdesk Card) */}
      <section aria-labelledby="helpdesk-heading" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              Pusat Bantuan & Pengaduan
            </span>
            <h2 id="helpdesk-heading" className="text-2xl font-bold text-slate-900 mb-2">
              Butuh Bantuan Pelayanan BPJS di Rumah Sakit?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Petugas BPJS Center dan Liaison Officer siap mendampingi kebutuhan administrasi medis Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400 block mb-1">LOKASI MEJA LAYANAN</span>
                <p className="text-sm font-bold text-slate-900 mb-1">BPJS Center RS</p>
                <p className="text-xs text-slate-600">{settings.bpjsDeskLocation}</p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-200 text-xs text-slate-500">
                Jam Layanan: <strong>{settings.operatingHours.split('|')[0]}</strong>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400 block mb-1">HOTLINE WHATSAPP RS</span>
                <p className="text-sm font-bold text-emerald-800 mb-1">Layanan Pasien RSUD</p>
                <p className="text-xs text-slate-600 font-mono">{settings.bpjsHotlineRS}</p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-200">
                <button
                  onClick={() => onSelectTab('kontak')}
                  className="text-xs font-semibold text-emerald-700 hover:underline"
                >
                  Detail Saluran Kontak &rarr;
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400 block mb-1">KANAL NASIONAL BPJS</span>
                <p className="text-sm font-bold text-blue-900 mb-1">Care Center 165</p>
                <p className="text-xs text-slate-600">PANDAWA WhatsApp: {settings.pandawaNumber}</p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-200 text-xs text-slate-500">
                Layanan 24 Jam Bebas Pulsa
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
