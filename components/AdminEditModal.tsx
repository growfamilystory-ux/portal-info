'use client';

import React, { useState } from 'react';
import { 
  Regulation, 
  Officer, 
  RegistrationChannel, 
  FAQItem, 
  DocumentItem, 
  Announcement,
  BannerSlide 
} from '@/lib/types';
import { generateBpjsId, getJakartaTimeString } from '@/lib/storage';
import { X, Save, AlertCircle } from 'lucide-react';

export type EntityType = 'regulation' | 'officer' | 'channel' | 'faq' | 'document' | 'announcement' | 'slide';

interface AdminEditModalProps {
  entityType: EntityType;
  initialData?: unknown;
  onSave: (entityType: EntityType, item: unknown) => void;
  onClose: () => void;
}

export default function AdminEditModal({
  entityType,
  initialData,
  onSave,
  onClose
}: AdminEditModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    if (initialData) return { ...(initialData as Record<string, any>) };

    // New item defaults with generated ID
    const baseId = generateBpjsId(entityType.substring(0, 4).toUpperCase());

    switch (entityType) {
      case 'regulation':
        return {
          id: baseId,
          judul: '',
          nomor: '',
          tahun: 2026,
          jenisPeraturan: 'Peraturan Presiden',
          instansiPenerbit: 'Presiden Republik Indonesia',
          tanggalTerbit: new Date().toISOString().split('T')[0],
          tanggalBerlaku: new Date().toISOString().split('T')[0],
          status: 'Aktif',
          ringkasan: '',
          isi: '',
          dasarHukum: '',
          linkSumberResmi: 'https://bpjs-kesehatan.go.id',
          catatan: '',
          updatedAt: getJakartaTimeString()
        };
      case 'officer':
        return {
          id: baseId,
          nama: '',
          foto: 'https://picsum.photos/seed/officer/300/300',
          jabatan: 'Petugas PIPP BPJS Kesehatan RS',
          unit: 'Unit Penanganan Informasi dan Pengaduan Peserta (PIPP)',
          lokasiPelayanan: 'Gedung Rawat Jalan Lt. 1 Meja BPJS Center',
          jamPelayanan: '08.00 - 15.30 WIB',
          hariPelayanan: 'Senin - Jumat',
          nomorKontak: '0812-0000-0000',
          email: '',
          jenisLayanan: ['Pemberian Informasi Resmi', 'Penanganan Keluhan Pasien'],
          statusAktif: true
        };
      case 'channel':
        return {
          id: baseId,
          namaKanal: '',
          deskripsi: '',
          jenisKanal: 'Aplikasi Mobile',
          syarat: ['e-KTP / Kartu BPJS aktif', 'Surat Rujukan FKTP / Surat Kontrol'],
          langkah: ['Buka aplikasi', 'Pilih menu antrean', 'Pilih faskes tujuan dan dokter'],
          jamLayanan: 'Online 24 Jam',
          url: '',
          nomorKontak: '',
          status: 'Aktif',
          badge: ''
        };
      case 'faq':
        return {
          id: baseId,
          pertanyaan: '',
          jawaban: '',
          kategori: 'Kepesertaan',
          tags: ['bpjs', 'rumah sakit'],
          urutan: 1,
          status: 'Publik',
          helpfulCount: 0
        };
      case 'document':
        return {
          id: baseId,
          namaDokumen: '',
          jenisDokumen: 'SOP',
          nomorDokumen: '',
          tahun: 2026,
          kategori: 'Standar Operasional Prosedur',
          ukuran: '1.5 MB',
          format: 'PDF',
          tanggalUpload: new Date().toISOString().split('T')[0],
          pengunggah: 'Admin BPJS RS',
          fileUrl: 'https://raw.githubusercontent.com/bpjs-rs/docs/main/sample.pdf',
          downloadCount: 0,
          status: 'Aktif'
        };
      case 'announcement':
        return {
          id: baseId,
          judul: '',
          kategori: 'Penting',
          tanggal: new Date().toISOString().split('T')[0],
          masaBerlaku: '',
          ringkasan: '',
          isi: '',
          gambarUrl: '',
          status: 'Publik'
        };
      case 'slide':
        return {
          id: baseId,
          judul: '',
          subjudul: '',
          deskripsi: '',
          foto: 'https://picsum.photos/seed/slide/1200/500',
          labelTombol: 'Pelajari Selengkapnya',
          targetTab: 'beranda',
          badge: 'Informasi Baru',
          urutan: 1,
          statusAktif: true
        };
      default:
        return {};
    }
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (field: string, value: unknown) => {
    setFormData((prev: Record<string, unknown>) => ({ ...prev, [field]: value }));
  };

  const handleArrayStringChange = (field: string, value: string) => {
    const arr = value.split('\n').map(s => s.trim()).filter(Boolean);
    setFormData((prev: Record<string, unknown>) => ({ ...prev, [field]: arr }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (entityType === 'regulation') {
      if (!formData.judul?.trim()) {
        setErrorMsg('Judul peraturan wajib diisi!');
        return;
      }
      if (!formData.nomor?.trim()) {
        setErrorMsg('Nomor peraturan resmi wajib diisi!');
        return;
      }
      if (!formData.tahun || isNaN(Number(formData.tahun))) {
        setErrorMsg('Tahun peraturan harus berupa angka!');
        return;
      }
    } else if (entityType === 'officer') {
      if (!formData.nama?.trim()) {
        setErrorMsg('Nama petugas wajib diisi!');
        return;
      }
      if (!formData.nomorKontak?.trim()) {
        setErrorMsg('Nomor kontak resmi petugas wajib diisi!');
        return;
      }
    } else if (entityType === 'faq') {
      if (!formData.pertanyaan?.trim() || !formData.jawaban?.trim()) {
        setErrorMsg('Pertanyaan dan jawaban FAQ wajib diisi!');
        return;
      }
    } else if (entityType === 'document') {
      if (!formData.namaDokumen?.trim()) {
        setErrorMsg('Nama dokumen wajib diisi!');
        return;
      }
      if (!formData.nomorDokumen?.trim()) {
        setErrorMsg('Nomor dokumen resmi wajib diisi!');
        return;
      }
    } else if (entityType === 'announcement') {
      if (!formData.judul?.trim() || !formData.ringkasan?.trim()) {
        setErrorMsg('Judul dan ringkasan pengumuman wajib diisi!');
        return;
      }
    } else if (entityType === 'slide') {
      if (!formData.judul?.trim()) {
        setErrorMsg('Judul slide banner wajib diisi!');
        return;
      }
      if (!formData.foto?.trim()) {
        setErrorMsg('URL foto banner wajib diisi!');
        return;
      }
    }

    onSave(entityType, formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 relative max-h-[90vh] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
              Formulir Pengelolaan Konten (CMS)
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              {initialData ? 'Perbarui Data' : 'Tambah Data Baru'} - {entityType.toUpperCase()}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">ID: {formData.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error notification if validation fails */}
        {errorMsg && (
          <div className="mt-3 p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Body Scrollable */}
        <form onSubmit={handleSubmit} id="edit-form" className="flex-1 overflow-y-auto py-4 space-y-4 text-xs pr-1">
          {/* REGULATION FIELDS */}
          {entityType === 'regulation' && (
            <>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Judul Lengkap Peraturan *</label>
                <input
                  type="text"
                  required
                  value={formData.judul || ''}
                  onChange={(e) => handleChange('judul', e.target.value)}
                  placeholder="Contoh: Perubahan Ketiga atas Perpres 82/2018 tentang Jaminan Kesehatan"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nomor Peraturan *</label>
                  <input
                    type="text"
                    required
                    value={formData.nomor || ''}
                    onChange={(e) => handleChange('nomor', e.target.value)}
                    placeholder="Contoh: Perpres No. 59 Tahun 2024"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tahun *</label>
                  <input
                    type="number"
                    required
                    value={formData.tahun || 2026}
                    onChange={(e) => handleChange('tahun', Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status Berlaku *</label>
                  <select
                    value={formData.status || 'Aktif'}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Digantikan">Digantikan</option>
                    <option value="Arsip">Arsip</option>
                    <option value="Dalam Peninjauan">Dalam Peninjauan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Jenis Peraturan</label>
                  <select
                    value={formData.jenisPeraturan || 'Peraturan Presiden'}
                    onChange={(e) => handleChange('jenisPeraturan', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    <option value="Undang-Undang">Undang-Undang</option>
                    <option value="Peraturan Presiden">Peraturan Presiden</option>
                    <option value="Peraturan Menteri Kesehatan">Peraturan Menteri Kesehatan</option>
                    <option value="Peraturan BPJS Kesehatan">Peraturan BPJS Kesehatan</option>
                    <option value="Surat Edaran Direksi BPJS">Surat Edaran Direksi BPJS</option>
                    <option value="SOP Rumah Sakit">SOP Rumah Sakit</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Instansi Penerbit</label>
                  <input
                    type="text"
                    value={formData.instansiPenerbit || ''}
                    onChange={(e) => handleChange('instansiPenerbit', e.target.value)}
                    placeholder="Contoh: Presiden RI / Kemenkes / Direksi BPJS"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Dasar Hukum Terkait</label>
                <input
                  type="text"
                  value={formData.dasarHukum || ''}
                  onChange={(e) => handleChange('dasarHukum', e.target.value)}
                  placeholder="Contoh: UU No. 24 Tahun 2011, Perpres 82 Tahun 2018"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Ringkasan Ketentuan *</label>
                <textarea
                  rows={2}
                  value={formData.ringkasan || ''}
                  onChange={(e) => handleChange('ringkasan', e.target.value)}
                  placeholder="Ringkasan singkat pokok regulasi..."
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Isi / Ketentuan Penting</label>
                <textarea
                  rows={4}
                  value={formData.isi || ''}
                  onChange={(e) => handleChange('isi', e.target.value)}
                  placeholder="Poin-poin pasal penting bagi pasien dan rumah sakit..."
                  className="w-full px-3 py-2 border rounded-lg font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Link Sumber Resmi (JDIH / BPJS)</label>
                <input
                  type="url"
                  value={formData.linkSumberResmi || ''}
                  onChange={(e) => handleChange('linkSumberResmi', e.target.value)}
                  placeholder="https://peraturan.bpk.go.id/..."
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </>
          )}

          {/* OFFICER FIELDS */}
          {entityType === 'officer' && (
            <>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap & Gelar *</label>
                <input
                  type="text"
                  required
                  value={formData.nama || ''}
                  onChange={(e) => handleChange('nama', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Jabatan *</label>
                  <input
                    type="text"
                    required
                    value={formData.jabatan || ''}
                    onChange={(e) => handleChange('jabatan', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Unit / Bagian</label>
                  <input
                    type="text"
                    value={formData.unit || ''}
                    onChange={(e) => handleChange('unit', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nomor Kontak (WhatsApp) *</label>
                  <input
                    type="text"
                    required
                    value={formData.nomorKontak || ''}
                    onChange={(e) => handleChange('nomorKontak', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Resmi</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Lokasi Meja Pelayanan di RS</label>
                <input
                  type="text"
                  value={formData.lokasiPelayanan || ''}
                  onChange={(e) => handleChange('lokasiPelayanan', e.target.value)}
                  placeholder="Contoh: Gedung Rawat Jalan Lt. 1 Meja BPJS Center 01"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Jam Pelayanan</label>
                  <input
                    type="text"
                    value={formData.jamPelayanan || ''}
                    onChange={(e) => handleChange('jamPelayanan', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hari Pelayanan</label>
                  <input
                    type="text"
                    value={formData.hariPelayanan || ''}
                    onChange={(e) => handleChange('hariPelayanan', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Jenis Layanan yang Ditangani (1 baris per jenis)</label>
                <textarea
                  rows={3}
                  value={Array.isArray(formData.jenisLayanan) ? formData.jenisLayanan.join('\n') : ''}
                  onChange={(e) => handleArrayStringChange('jenisLayanan', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="statusAktif"
                  checked={!!formData.statusAktif}
                  onChange={(e) => handleChange('statusAktif', e.target.checked)}
                  className="rounded text-emerald-700 focus:ring-emerald-500 w-4 h-4"
                />
                <label htmlFor="statusAktif" className="font-semibold text-slate-700">Status Petugas Aktif Siaga di Rumah Sakit</label>
              </div>
            </>
          )}

          {/* FAQ FIELDS */}
          {entityType === 'faq' && (
            <>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pertanyaan Pasien / Masyarakat *</label>
                <input
                  type="text"
                  required
                  value={formData.pertanyaan || ''}
                  onChange={(e) => handleChange('pertanyaan', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kategori FAQ *</label>
                  <select
                    value={formData.kategori || 'Kepesertaan'}
                    onChange={(e) => handleChange('kategori', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    <option value="Rujukan">Rujukan</option>
                    <option value="Kepesertaan">Kepesertaan</option>
                    <option value="Rawat Jalan">Rawat Jalan</option>
                    <option value="Rawat Inap">Rawat Inap</option>
                    <option value="Obat & Alkes">Obat & Alkes</option>
                    <option value="Administrasi">Administrasi</option>
                    <option value="Pendaftaran">Pendaftaran</option>
                    <option value="Pengaduan">Pengaduan</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nomor Urut Tampil</label>
                  <input
                    type="number"
                    value={formData.urutan || 1}
                    onChange={(e) => handleChange('urutan', Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Jawaban Lengkap & Jelas *</label>
                <textarea
                  rows={5}
                  required
                  value={formData.jawaban || ''}
                  onChange={(e) => handleChange('jawaban', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </>
          )}

          {/* DOCUMENT FIELDS */}
          {entityType === 'document' && (
            <>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Dokumen / Formulir *</label>
                <input
                  type="text"
                  required
                  value={formData.namaDokumen || ''}
                  onChange={(e) => handleChange('namaDokumen', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nomor Dokumen *</label>
                  <input
                    type="text"
                    required
                    value={formData.nomorDokumen || ''}
                    onChange={(e) => handleChange('nomorDokumen', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Jenis Dokumen</label>
                  <select
                    value={formData.jenisDokumen || 'SOP'}
                    onChange={(e) => handleChange('jenisDokumen', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    <option value="SOP">SOP</option>
                    <option value="Formulir">Formulir</option>
                    <option value="Brosur & Panduan">Brosur & Panduan</option>
                    <option value="Peraturan Resmi">Peraturan Resmi</option>
                    <option value="Surat Keputusan">Surat Keputusan</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Format File</label>
                  <select
                    value={formData.format || 'PDF'}
                    onChange={(e) => handleChange('format', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    <option value="PDF">PDF</option>
                    <option value="DOCX">DOCX</option>
                    <option value="XLSX">XLSX</option>
                    <option value="PNG">PNG</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">URL File Google Drive / Unduhan</label>
                <input
                  type="url"
                  value={formData.fileUrl || ''}
                  onChange={(e) => handleChange('fileUrl', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </>
          )}

          {/* ANNOUNCEMENT FIELDS */}
          {entityType === 'announcement' && (
            <>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Judul Pengumuman *</label>
                <input
                  type="text"
                  required
                  value={formData.judul || ''}
                  onChange={(e) => handleChange('judul', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kategori Pengumuman</label>
                  <select
                    value={formData.kategori || 'Penting'}
                    onChange={(e) => handleChange('kategori', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    <option value="Penting">Penting</option>
                    <option value="Layanan">Layanan</option>
                    <option value="Operasional">Operasional</option>
                    <option value="Informasi Baru">Informasi Baru</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Masa Berlaku (Opsional)</label>
                  <input
                    type="date"
                    value={formData.masaBerlaku || ''}
                    onChange={(e) => handleChange('masaBerlaku', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Ringkasan Singkat *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.ringkasan || ''}
                  onChange={(e) => handleChange('ringkasan', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Isi Lengkap Pengumuman</label>
                <textarea
                  rows={5}
                  value={formData.isi || ''}
                  onChange={(e) => handleChange('isi', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </>
          )}

          {/* CHANNEL FIELDS */}
          {entityType === 'channel' && (
            <>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Kanal Pendaftaran *</label>
                <input
                  type="text"
                  required
                  value={formData.namaKanal || ''}
                  onChange={(e) => handleChange('namaKanal', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Jenis Kanal</label>
                  <select
                    value={formData.jenisKanal || 'Aplikasi Mobile'}
                    onChange={(e) => handleChange('jenisKanal', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    <option value="Aplikasi Mobile">Aplikasi Mobile</option>
                    <option value="Anjungan Mandiri (APM)">Anjungan Mandiri (APM)</option>
                    <option value="WhatsApp / Bot">WhatsApp / Bot</option>
                    <option value="Call Center">Call Center</option>
                    <option value="Loket RS">Loket RS</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Badge (Contoh: Paling Direkomendasikan)</label>
                  <input
                    type="text"
                    value={formData.badge || ''}
                    onChange={(e) => handleChange('badge', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deskripsi Kanal</label>
                <textarea
                  rows={2}
                  value={formData.deskripsi || ''}
                  onChange={(e) => handleChange('deskripsi', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Syarat Penggunaan (1 baris per syarat)</label>
                <textarea
                  rows={3}
                  value={Array.isArray(formData.syarat) ? formData.syarat.join('\n') : ''}
                  onChange={(e) => handleArrayStringChange('syarat', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Langkah-Langkah (1 baris per langkah)</label>
                <textarea
                  rows={4}
                  value={Array.isArray(formData.langkah) ? formData.langkah.join('\n') : ''}
                  onChange={(e) => handleArrayStringChange('langkah', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Jam Layanan</label>
                  <input
                    type="text"
                    value={formData.jamLayanan || ''}
                    onChange={(e) => handleChange('jamLayanan', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">URL Resmi / Download</label>
                  <input
                    type="url"
                    value={formData.url || ''}
                    onChange={(e) => handleChange('url', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
            </>
          )}

          {/* SLIDE FIELDS */}
          {entityType === 'slide' && (
            <>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Judul Banner Slider *</label>
                <input
                  type="text"
                  required
                  value={formData.judul || ''}
                  onChange={(e) => handleChange('judul', e.target.value)}
                  placeholder="Contoh: Penerapan Ruang Rawat Inap Standar (KRIS)"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sub-Judul / Kicker</label>
                  <input
                    type="text"
                    value={formData.subjudul || ''}
                    onChange={(e) => handleChange('subjudul', e.target.value)}
                    placeholder="Contoh: Implementasi Perpres 59/2024"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Badge Teks (Opsional)</label>
                  <input
                    type="text"
                    value={formData.badge || ''}
                    onChange={(e) => handleChange('badge', e.target.value)}
                    placeholder="Contoh: Standar Baru, Antrean Cepat"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">URL Foto Banner *</label>
                <input
                  type="url"
                  required
                  value={formData.foto || ''}
                  onChange={(e) => handleChange('foto', e.target.value)}
                  placeholder="https://picsum.photos/seed/.../1200/500"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {formData.foto && (
                  <div className="mt-2 h-28 rounded-xl overflow-hidden border border-slate-200">
                    <img src={formData.foto} alt="Pratinjau" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deskripsi Singkat Banner</label>
                <textarea
                  rows={3}
                  value={formData.deskripsi || ''}
                  onChange={(e) => handleChange('deskripsi', e.target.value)}
                  placeholder="Penjelasan ringkas materi promosi atau panduan..."
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Teks Tombol Aksi</label>
                  <input
                    type="text"
                    value={formData.labelTombol || 'Pelajari Selengkapnya'}
                    onChange={(e) => handleChange('labelTombol', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Halaman / Tab Saat Di-klik *</label>
                  <select
                    value={formData.targetTab || 'beranda'}
                    onChange={(e) => handleChange('targetTab', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-white font-medium"
                  >
                    <option value="beranda">Beranda</option>
                    <option value="peraturan">Peraturan BPJS</option>
                    <option value="pelayanan">Alur Pelayanan Pasien</option>
                    <option value="petugas">Petugas BPJS RS</option>
                    <option value="pendaftaran">Kanal Pendaftaran Antrean</option>
                    <option value="informasi-peserta">Info Peserta (Hak & KRIS)</option>
                    <option value="faq">FAQ</option>
                    <option value="dokumen">Pusat Dokumen & SOP</option>
                    <option value="pengumuman">Pengumuman</option>
                    <option value="kontak">Kontak RS</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nomor Urut Tampil</label>
                  <input
                    type="number"
                    value={formData.urutan || 1}
                    onChange={(e) => handleChange('urutan', Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="statusAktifSlide"
                  checked={!!formData.statusAktif}
                  onChange={(e) => handleChange('statusAktif', e.target.checked)}
                  className="rounded text-emerald-700 focus:ring-emerald-500 w-4 h-4"
                />
                <label htmlFor="statusAktifSlide" className="font-semibold text-slate-700">
                  Tampilkan Slide Banner di Halaman Utama
                </label>
              </div>
            </>
          )}
        </form>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg"
          >
            Batal
          </button>
          <button
            type="submit"
            form="edit-form"
            className="px-4 py-2 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg inline-flex items-center gap-1.5 shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Data</span>
          </button>
        </div>
      </div>
    </div>
  );
}
