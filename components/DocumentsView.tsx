'use client';

import React, { useState, useMemo } from 'react';
import { DocumentItem } from '@/lib/types';
import { 
  FolderOpen, 
  Search, 
  Download, 
  Eye, 
  FileText, 
  Filter, 
  Calendar, 
  User, 
  CheckCircle, 
  ExternalLink 
} from 'lucide-react';

interface DocumentsViewProps {
  documents: DocumentItem[];
  onOpenPreview: (doc: DocumentItem) => void;
  onShowToast: (title: string, msg?: string, type?: 'success' | 'error' | 'info') => void;
}

export default function DocumentsView({ documents, onOpenPreview, onShowToast }: DocumentsViewProps) {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');

  const docTypes = useMemo(() => {
    return Array.from(new Set(documents.map(d => d.jenisDokumen)));
  }, [documents]);

  const filteredDocs = useMemo(() => {
    return documents.filter(d => {
      const matchSearch =
        search.trim() === '' ||
        d.namaDokumen.toLowerCase().includes(search.toLowerCase()) ||
        d.nomorDokumen.toLowerCase().includes(search.toLowerCase()) ||
        d.kategori.toLowerCase().includes(search.toLowerCase());

      const matchType = selectedType === 'all' || d.jenisDokumen === selectedType;
      const matchFormat = selectedFormat === 'all' || d.format === selectedFormat;

      return matchSearch && matchType && matchFormat;
    });
  }, [documents, search, selectedType, selectedFormat]);

  const handleDownload = (doc: DocumentItem) => {
    onShowToast('Mengunduh dokumen', `${doc.namaDokumen} (${doc.ukuran})`, 'success');
    window.open(doc.fileUrl, '_blank');
  };

  const getFormatBadgeClass = (fmt: DocumentItem['format']) => {
    switch (fmt) {
      case 'PDF':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'DOCX':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'XLSX':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
            <FolderOpen className="w-4 h-4" />
            <span>Pusat Berkas & Dokumen Rumah Sakit</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Dokumen & Formulir Resmi Pelayanan BPJS
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
            Unduh formulir persetujuan selisih biaya naik kelas, formulir rujuk balik (PRB), panduan hak peserta, dan SOP alur pelayanan medis di rumah sakit secara langsung.
          </p>
        </div>

        {/* Toolbar */}
        <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama formulir, nomor dokumen, atau kategori..."
              className="w-full pl-10 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full py-2 px-3 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Semua Jenis Dokumen</option>
              {docTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full py-2 px-3 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Semua Format File</option>
              <option value="PDF">Format PDF</option>
              <option value="DOCX">Format DOCX</option>
              <option value="XLSX">Format XLSX</option>
            </select>
          </div>
        </div>
      </div>

      {/* Documents Grid / Table */}
      {filteredDocs.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
          <FolderOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800 mb-1">Dokumen Tidak Ditemukan</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            Tidak ada dokumen yang cocok dengan filter atau kata kunci yang dimasukkan.
          </p>
          <button
            onClick={() => { setSearch(''); setSelectedType('all'); setSelectedFormat('all'); }}
            className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-700 text-white rounded-lg hover:bg-emerald-800"
          >
            Tampilkan Semua Dokumen
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className={`px-2.5 py-0.5 text-[11px] font-bold uppercase rounded-md border ${getFormatBadgeClass(doc.format)}`}>
                    {doc.format}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {doc.ukuran}
                  </span>
                </div>

                <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug mb-1">
                  {doc.namaDokumen}
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-3">
                  <span className="font-mono">{doc.nomorDokumen}</span>
                  <span>·</span>
                  <span>{doc.kategori}</span>
                  <span>·</span>
                  <span>Tahun {doc.tahun}</span>
                </div>

                <div className="text-[11px] text-slate-400 space-y-1 mb-4 pt-2 border-t border-slate-100">
                  <p>Diunggah: {doc.tanggalUpload} oleh {doc.pengunggah}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenPreview(doc)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Pratinjau Ringkasan</span>
                </button>

                <button
                  onClick={() => handleDownload(doc)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Dokumen</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
