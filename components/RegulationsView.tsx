'use client';

import React, { useState, useMemo } from 'react';
import { Regulation } from '@/lib/types';
import { 
  FileText, 
  Search, 
  ExternalLink, 
  Bookmark, 
  Share2, 
  Copy, 
  Filter, 
  Calendar, 
  Building,
  CheckCircle,
  Clock,
  ArrowUpDown
} from 'lucide-react';

interface RegulationsViewProps {
  regulations: Regulation[];
  onOpenDetail: (reg: Regulation) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onShowToast: (title: string, msg?: string, type?: 'success' | 'error' | 'info') => void;
}

export default function RegulationsView({
  regulations,
  onOpenDetail,
  bookmarks,
  onToggleBookmark,
  onShowToast
}: RegulationsViewProps) {
  const [search, setSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);
  const [sortBy, setSortBy] = useState<'yearDesc' | 'yearAsc' | 'title'>('yearDesc');

  // Extract unique filter options
  const years = useMemo(() => {
    const list = Array.from(new Set(regulations.map(r => r.tahun))).sort((a, b) => b - a);
    return list;
  }, [regulations]);

  const types = useMemo(() => {
    return Array.from(new Set(regulations.map(r => r.jenisPeraturan)));
  }, [regulations]);

  const filteredRegulations = useMemo(() => {
    return regulations.filter(reg => {
      const matchSearch = 
        search.trim() === '' ||
        reg.judul.toLowerCase().includes(search.toLowerCase()) ||
        reg.nomor.toLowerCase().includes(search.toLowerCase()) ||
        reg.ringkasan.toLowerCase().includes(search.toLowerCase()) ||
        reg.instansiPenerbit.toLowerCase().includes(search.toLowerCase());

      const matchYear = selectedYear === 'all' || reg.tahun.toString() === selectedYear;
      const matchType = selectedType === 'all' || reg.jenisPeraturan === selectedType;
      const matchStatus = selectedStatus === 'all' || reg.status === selectedStatus;
      const matchBookmark = !onlyBookmarks || bookmarks.includes(reg.id);

      return matchSearch && matchYear && matchType && matchStatus && matchBookmark;
    }).sort((a, b) => {
      if (sortBy === 'yearDesc') return b.tahun - a.tahun;
      if (sortBy === 'yearAsc') return a.tahun - b.tahun;
      return a.judul.localeCompare(b.judul);
    });
  }, [regulations, search, selectedYear, selectedType, selectedStatus, onlyBookmarks, bookmarks, sortBy]);

  const handleCopyCitation = (reg: Regulation) => {
    const text = `${reg.nomor} tentang ${reg.judul} (${reg.instansiPenerbit}, ${reg.tahun}). Sumber: ${reg.linkSumberResmi}`;
    navigator.clipboard.writeText(text);
    onShowToast('Kutipan disalin ke clipboard', text, 'success');
  };

  const handleShare = async (reg: Regulation) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: reg.nomor,
          text: `${reg.nomor}: ${reg.judul}`,
          url: reg.linkSumberResmi || window.location.href
        });
      } catch {
        // Ignored if cancelled
      }
    } else {
      handleCopyCitation(reg);
    }
  };

  return (
    <div className="space-y-6 py-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
            <FileText className="w-4 h-4" />
            <span>Koleksi Regulasi Resmi JKN</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Peraturan & Ketentuan BPJS Kesehatan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
            Seluruh peraturan disajikan dengan nomor dokumen sah, tahun penerbitan, dasar hukum, dan sumber resmi dari JDIH BPK RI dan BPJS Kesehatan untuk menjamin kepastian informasi.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nomor, judul, atau kata kunci..."
                className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Year Selector */}
            <div className="md:col-span-2">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full py-2 px-3 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">Semua Tahun</option>
                {years.map(y => (
                  <option key={y} value={y.toString()}>Tahun {y}</option>
                ))}
              </select>
            </div>

            {/* Type Selector */}
            <div className="md:col-span-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full py-2 px-3 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">Semua Jenis Peraturan</option>
                {types.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Status Selector */}
            <div className="md:col-span-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full py-2 px-3 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">Semua Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Digantikan">Digantikan</option>
                <option value="Arsip">Arsip</option>
              </select>
            </div>
          </div>

          {/* Additional Filter Switches & Active Count */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pt-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOnlyBookmarks(!onlyBookmarks)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                  onlyBookmarks 
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold' 
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarks ? 'fill-emerald-700 text-emerald-700' : 'text-slate-400'}`} />
                <span>Hanya Tersimpan ({bookmarks.length})</span>
              </button>

              {(search || selectedYear !== 'all' || selectedType !== 'all' || selectedStatus !== 'all' || onlyBookmarks) && (
                <button
                  onClick={() => {
                    setSearch('');
                    setSelectedYear('all');
                    setSelectedType('all');
                    setSelectedStatus('all');
                    setOnlyBookmarks(false);
                  }}
                  className="text-xs text-rose-600 hover:underline"
                >
                  Reset Filter
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span>Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'yearDesc' | 'yearAsc' | 'title')}
                className="py-1 px-2 text-xs border border-slate-200 rounded bg-white text-slate-700"
              >
                <option value="yearDesc">Tahun Terbaru</option>
                <option value="yearAsc">Tahun Terlama</option>
                <option value="title">Judul (A-Z)</option>
              </select>
              <span>·</span>
              <span className="font-semibold text-slate-700">{filteredRegulations.length} peraturan ditemukan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Regulations List */}
      {filteredRegulations.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
          <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800 mb-1">Peraturan Tidak Ditemukan</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            Tidak ada dokumen yang cocok dengan kata kunci atau filter yang Anda pilih. Silakan sesuaikan kriteria pencarian.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedYear('all');
              setSelectedType('all');
              setSelectedStatus('all');
              setOnlyBookmarks(false);
            }}
            className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors"
          >
            Tampilkan Semua Peraturan
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRegulations.map((reg) => {
            const isBookmarked = bookmarks.includes(reg.id);
            return (
              <article
                key={reg.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Metadata Bar (Zero-Pill Discipline: Unboxed Text with Separators) */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
                    <span className="font-bold text-emerald-800 font-mono tracking-tight">{reg.nomor}</span>
                    <span aria-hidden="true">·</span>
                    <span>Tahun {reg.tahun}</span>
                    <span aria-hidden="true">·</span>
                    <span>{reg.jenisPeraturan}</span>
                    <span aria-hidden="true">·</span>
                    <span className={reg.status === 'Aktif' ? 'text-emerald-700 font-semibold' : 'text-slate-500'}>
                      Status: {reg.status}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-400">Pembaruan: {reg.updatedAt}</span>
                  </div>

                  {/* Title */}
                  <h2 
                    onClick={() => onOpenDetail(reg)}
                    className="text-base sm:text-lg font-bold text-slate-900 hover:text-emerald-800 cursor-pointer transition-colors leading-snug mb-2"
                  >
                    {reg.judul}
                  </h2>

                  {/* Summary */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {reg.ringkasan}
                  </p>

                  {/* Legal Basis Notice */}
                  {reg.dasarHukum && (
                    <div className="bg-slate-50 p-2.5 rounded-lg text-xs text-slate-500 mb-4 border border-slate-100 flex items-start gap-2">
                      <span className="font-semibold text-slate-700 shrink-0">Dasar Hukum:</span>
                      <span className="line-clamp-1">{reg.dasarHukum}</span>
                    </div>
                  )}
                </div>

                {/* Card Actions Footer */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenDetail(reg)}
                      className="px-3.5 py-1.5 font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors"
                    >
                      Baca Isi & Analisis
                    </button>

                    <a
                      href={reg.linkSumberResmi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Sumber Resmi</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onToggleBookmark(reg.id)}
                      className={`p-2 rounded-lg border transition-colors ${
                        isBookmarked
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : 'border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                      }`}
                      title={isBookmarked ? 'Hapus bookmark' : 'Simpan peraturan'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-emerald-700 text-emerald-700' : ''}`} />
                    </button>

                    <button
                      onClick={() => handleCopyCitation(reg)}
                      className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors"
                      title="Salin kutipan resmi"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleShare(reg)}
                      className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors"
                      title="Bagikan informasi"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
