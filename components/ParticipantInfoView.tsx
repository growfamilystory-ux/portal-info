'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  HelpCircle, 
  AlertTriangle,
  HeartPulse,
  BedDouble,
  UserCheck,
  Building2,
  Baby,
  Car
} from 'lucide-react';

export default function ParticipantInfoView() {
  const [activeSection, setActiveSection] = useState<'hak-kewajiban' | 'dokumen' | 'kris' | 'kasus-khusus'>('hak-kewajiban');

  return (
    <div className="space-y-6 py-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Pedoman Hak & Administrasi Peserta</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Informasi Peserta BPJS Kesehatan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
            Ketahui hak medis Anda, kewajiban kepesertaan, kelengkapan berkas administrasi yang wajib disiapkan, serta ketentuan implementasi ruang rawat KRIS di rumah sakit.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-slate-100">
          <button
            onClick={() => setActiveSection('hak-kewajiban')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeSection === 'hak-kewajiban'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Hak & Kewajiban Peserta
          </button>
          <button
            onClick={() => setActiveSection('dokumen')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeSection === 'dokumen'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Checklist Dokumen Wajib
          </button>
          <button
            onClick={() => setActiveSection('kris')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeSection === 'kris'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Ketentuan KRIS & Naik Kelas
          </button>
          <button
            onClick={() => setActiveSection('kasus-khusus')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeSection === 'kasus-khusus'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Bayi Baru Lahir & Laka Lantas
          </button>
        </div>
      </div>

      {/* SECTION 1: HAK & KEWAJIBAN */}
      {activeSection === 'hak-kewajiban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hak Peserta */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-emerald-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Hak Peserta BPJS Kesehatan di Rumah Sakit</h2>
                <span className="text-[11px] text-slate-400">Dijamin UU Kesehatan & Regulasi BPJS</span>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Bebas Iur Biaya: </strong>Mendapatkan pelayanan medis rawat jalan dan rawat inap tanpa tambahan biaya sepanjang sesuai indikasi medis dokter dan hak kelasnya.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Obat & Alat Medis Lengkap: </strong>Memperoleh obat-obatan Formularium Nasional (Fornas), bahan habis pakai, transfusi darah, dan reagen laboratorium tanpa dipungut biaya mandiri.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Pelayanan Kegawatdaruratan: </strong>Mendapatkan tindakan penyelamatan segera di IGD rumah sakit manapun tanpa harus menunjukkan surat rujukan faskes tingkat pertama.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Kepastian Informasi Tempat Tidur: </strong>Memperoleh transparansi informasi ketersediaan kamar rawat inap di rumah sakit secara terbuka melalui sistem antrean.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Hak Mengajukan Pengaduan: </strong>Mendapatkan pendampingan petugas PIPP rumah sakit bila mengalami kendala administrasi, diskriminasi layanan, atau pungutan liar.</span>
              </li>
            </ul>
          </div>

          {/* Kewajiban Peserta */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-amber-100">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Kewajiban Peserta BPJS Kesehatan</h2>
                <span className="text-[11px] text-slate-400">Ketentuan Kepatuhan Administrasi</span>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-2" />
                <span><strong>Menjaga Keaktifan Kartu: </strong>Membayar iuran tepat waktu paling lambat tanggal 10 setiap bulan bagi peserta segmen Mandiri (PBPU).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-2" />
                <span><strong>Mentaati Alur Rujukan: </strong>Berobat secara berjenjang mulai dari Puskesmas/Klinik terdaftar sebelum ke rumah sakit untuk penyakit non-darurat.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-2" />
                <span><strong>Membawa Identitas Sah: </strong>Membawa e-KTP fisik atau kartu digital Mobile JKN serta melakukan perekaman biometrik sidik jari (fingerprint) di mesin APM.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-2" />
                <span><strong>Memenuhi Batas Waktu 3x24 Jam: </strong>Menyelesaikan pengurusan administrasi SEP rawat inap atau SEP IGD dalam batas waktu maksimal 3 x 24 jam hari kerja.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-2" />
                <span><strong>Memberikan Keterangan Medis Jujur: </strong>Menyampaikan riwayat pengobatan dan alergi secara benar kepada tenaga medis rumah sakit.</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* SECTION 2: CHECKLIST DOKUMEN */}
      {activeSection === 'dokumen' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm mb-3 pb-2 border-b border-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              Rawat Jalan Poliklinik
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>• Asli e-KTP / Kartu Identitas Anak (KIA) / KIS Digital</li>
              <li>• Surat Rujukan Online dari FKTP yang masih berlaku (maks 90 hari) ATAU Surat Kontrol DPJP RS</li>
              <li>• Bukti pendaftaran antrean (kode booking Mobile JKN atau tiket mesin APM)</li>
              <li>• Kartu Berobat Rumah Sakit (bagi pasien lama)</li>
            </ul>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm mb-3 pb-2 border-b border-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              Rawat Inap Terencana
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>• Surat Perintah Rawat Inap (SPRI) asli dari dokter spesialis</li>
              <li>• Kartu BPJS Kesehatan aktif</li>
              <li>• Fotokopi e-KTP Pasien dan KTP Penanggung Jawab (keluarga)</li>
              <li>• Fotokopi Kartu Keluarga (KK)</li>
              <li>• Lembar General Consent yang ditandatangani di Admisi</li>
            </ul>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm mb-3 pb-2 border-b border-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              Gawat Darurat (IGD)
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>• Penanganan medis dilakukan segera tanpa menunggu dokumen</li>
              <li>• Identitas NIK e-KTP / Kartu BPJS diserahkan keluarga maksimal 3x24 jam</li>
              <li>• Laporan Polisi (LP) asli khusus untuk kasus kecelakaan lalu lintas</li>
              <li>• Surat kronologis kejadian bermaterai untuk klaim kecelakaan kerja</li>
            </ul>
          </div>
        </div>
      )}

      {/* SECTION 3: KRIS & NAIK KELAS */}
      {activeSection === 'kris' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide block mb-1">
              Regulasi Perpres No. 59 Tahun 2024
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              Ketentuan Fasilitas Kelas Rawat Inap Standar (KRIS) & Penyesuaian Naik Kelas
            </h2>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Pemerintah menyederhanakan ruang rawat inap melalui sistem KRIS agar setiap warga negara memperoleh standar fasilitas tempat tidur yang setara, manusiawi, dan higienis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-2">12 Kriteria Fisik Kamar Rawat Inap Standar (KRIS):</h4>
              <ol className="list-decimal list-inside space-y-1 text-slate-600 leading-relaxed">
                <li>Komponen bangunan tidak memiliki porositas tinggi (anti-jamur/debu).</li>
                <li>Ventilasi udara minimal 6-12 kali pergantian per jam.</li>
                <li>Pencahayaan buatan 250 lux dan pencahayaan tidur 50 lux.</li>
                <li>Kelengkapan tempat tidur minimal 2 stop kontak dan nurse call.</li>
                <li>Tersedia nakas (lemari kecil) per tempat tidur pasien.</li>
                <li>Suhu ruangan stabil antara 20°C - 26°C dengan kelembaban 40-60%.</li>
                <li>Ruangan terbagi atas jenis kelamin, usia, dan penyakit menular/tidak menular.</li>
                <li>Kepadatan ruang rawat: Maksimal 4 tempat tidur dengan tirai pemisah anti-bakteri.</li>
                <li>Kamar mandi di dalam ruangan rawat inap.</li>
                <li>Kamar mandi memenuhi standar disabilitas (pegangan tangan & bell darurat).</li>
                <li>Outlet oksigen terpasang di dinding per tempat tidur.</li>
                <li>Tirai rel plafon tahan api dan bahan mudah dibersihkan.</li>
              </ol>
            </div>

            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/80">
              <h4 className="font-bold text-emerald-950 mb-2">Ketentuan Naik Kelas Rawat Inap Mandiri:</h4>
              <p className="text-slate-700 leading-relaxed mb-3">
                Peserta BPJS segmen <strong>Mandiri (PBPU)</strong> dan <strong>PPU</strong> diperkenankan menaikkan kelas perawatan di atas haknya (misalnya ke ruang VIP/Eksekutif) atas permintaan sendiri, dengan ketentuan:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-slate-700 leading-relaxed">
                <li>Wajib menandatangani <strong>Surat Persetujuan Selisih Biaya</strong> sebelum masuk ruang rawat.</li>
                <li>Membayar selisih biaya antara tarif tarif riil rumah sakit / INA-CBGs kelas yang dituju dikurangi tarif hak peserta BPJS.</li>
                <li><strong>PERHATIAN:</strong> Peserta PBI (Penerima Bantuan Iuran) dan peserta Jamkesda Kelas 3 <strong>TIDAK DIPERBOLEHKAN</strong> naik kelas perawatan dengan iur biaya apapun demi perlindungan bebas biaya penuh.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: KASUS KHUSUS */}
      {activeSection === 'kasus-khusus' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 mb-3">
              <Baby className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm">Pendaftaran Bayi Baru Lahir (BBL)</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Bayi yang dilahirkan oleh ibu peserta BPJS Kesehatan berhak mendapatkan penjaminan penuh sejak lahir, dengan batas waktu pendaftaran maksimal 28 hari kerja:
            </p>
            <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <p><strong>Syarat Berkas:</strong></p>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li>Surat Keterangan Lahir (SKL) dari Rumah Sakit / Bidan</li>
                <li>Kartu BPJS dan e-KTP Ibu kandung</li>
                <li>Kartu Keluarga (KK) orang tua</li>
              </ul>
              <p className="pt-2 text-slate-500">
                Pendaftaran dapat diproses di Loket Admisi BPJS RSUD atau via PANDAWA WhatsApp (08118165165).
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 mb-3">
              <Car className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-sm">Kasus Kecelakaan Lalu Lintas (Laka Lantas)</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Skema koordinasi manfaat antara PT Jasa Raharja dan BPJS Kesehatan:
            </p>
            <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <p><strong>Mekanisme Penjaminan:</strong></p>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li>Kecelakaan ganda: Jasa Raharja sebagai penjamin pertama (maksimal Rp20.000.000).</li>
                <li>Kelebihan biaya dari plafon Jasa Raharja akan dilanjutkan penjaminannya oleh BPJS Kesehatan.</li>
                <li>Syarat mutlak: Melampirkan Laporan Polisi (LP) dari Satlantas kepolisian setempat.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
