'use client';

import React, { useState, useMemo } from 'react';
import { Announcement } from '@/lib/types';
import { 
  Bell, 
  Calendar, 
  Search, 
  Clock, 
  AlertCircle, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface AnnouncementsViewProps {
  announcements: Announcement[];
}

export default function AnnouncementsView({ announcements }: AnnouncementsViewProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = ['all', 'Penting', 'Layanan', 'Operasional', 'Informasi Baru'];

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter(a => {
      if (a.status !== 'Publik') return false;

      const matchSearch =
        search.trim() === '' ||
        a.judul.toLowerCase().includes(search.toLowerCase()) ||
        a.isi.toLowerCase().includes(search.toLowerCase()) ||
        a.ringkasan.toLowerCase().includes(search.toLowerCase());

      const matchCategory = selectedCategory === 'all' || a.kategori === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [announcements, search, selectedCategory]);

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
            <Bell className="w-4 h-4" />
            <span>Pemberitahuan Resmi Pelayanan Rumah Sakit</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Pengumuman & Informasi Terbaru BPJS
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
            Ikuti informasi penting seputar operasional poliklinik saat cuti bersama, instruksi verifikasi sidik jari mandiri, dan standardisasi kamar rawat KRIS.
          </p>
        </div>

        {/* Toolbar */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari pengumuman..."
              className="w-full pl-10 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === c
                    ? 'bg-emerald-700 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c === 'all' ? 'Semua' : c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <article
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs hover:border-slate-300 transition-all"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
                <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {item.kategori}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Tanggal: {item.tanggal}
                </span>
                {item.masaBerlaku && (
                  <>
                    <span>·</span>
                    <span className="text-amber-800">Berlaku s.d: {item.masaBerlaku}</span>
                  </>
                )}
              </div>

              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
                {item.judul}
              </h2>

              {item.gambarUrl && (
                <div className="my-4 overflow-hidden rounded-xl border border-slate-200 max-h-72">
                  <img
                    src={item.gambarUrl}
                    alt={item.judul}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {item.ringkasan}
              </p>

              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl">
                  {item.isi}
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                >
                  <span>{isExpanded ? 'Tutup Isi Pengumuman' : 'Baca Selengkapnya'}</span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
