'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  AppDatabase 
} from '@/lib/storage';
import { 
  NavigationTab, 
  GlobalSearchResult,
  Regulation,
  Officer,
  DocumentItem,
  FAQItem,
  Announcement
} from '@/lib/types';
import { 
  Search, 
  X, 
  FileText, 
  UserCheck, 
  Send, 
  HelpCircle, 
  FolderOpen, 
  Bell, 
  ArrowRight,
  Stethoscope
} from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  database: AppDatabase;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenRegulationDetail: (reg: Regulation) => void;
  onOpenDocumentPreview: (doc: DocumentItem) => void;
}

export default function GlobalSearchModal({
  isOpen,
  onClose,
  database,
  onSelectTab,
  onOpenRegulationDetail,
  onOpenDocumentPreview
}: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  const results: GlobalSearchResult[] = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const list: GlobalSearchResult[] = [];

    // Search in regulations
    database.regulations.forEach(r => {
      if (r.judul.toLowerCase().includes(q) || r.nomor.toLowerCase().includes(q) || r.ringkasan.toLowerCase().includes(q)) {
        list.push({
          id: r.id,
          type: 'peraturan',
          title: r.nomor,
          subtitle: r.judul,
          targetTab: 'peraturan',
          category: r.jenisPeraturan,
          data: r
        });
      }
    });

    // Search in officers
    database.officers.forEach(o => {
      if (o.nama.toLowerCase().includes(q) || o.jabatan.toLowerCase().includes(q) || o.lokasiPelayanan.toLowerCase().includes(q)) {
        list.push({
          id: o.id,
          type: 'petugas',
          title: o.nama,
          subtitle: `${o.jabatan} · ${o.lokasiPelayanan}`,
          targetTab: 'petugas',
          category: 'Petugas BPJS',
          data: o
        });
      }
    });

    // Search in FAQs
    database.faqs.forEach(f => {
      if (f.pertanyaan.toLowerCase().includes(q) || f.jawaban.toLowerCase().includes(q) || f.tags.some(t => t.toLowerCase().includes(q))) {
        list.push({
          id: f.id,
          type: 'faq',
          title: f.pertanyaan,
          subtitle: f.jawaban.substring(0, 90) + '...',
          targetTab: 'faq',
          category: f.kategori,
          data: f
        });
      }
    });

    // Search in Documents
    database.documents.forEach(d => {
      if (d.namaDokumen.toLowerCase().includes(q) || d.nomorDokumen.toLowerCase().includes(q) || d.kategori.toLowerCase().includes(q)) {
        list.push({
          id: d.id,
          type: 'dokumen',
          title: d.namaDokumen,
          subtitle: `${d.nomorDokumen} · Format ${d.format} (${d.ukuran})`,
          targetTab: 'dokumen',
          category: d.jenisDokumen,
          data: d
        });
      }
    });

    // Search in Channels
    database.channels.forEach(c => {
      if (c.namaKanal.toLowerCase().includes(q) || c.deskripsi.toLowerCase().includes(q)) {
        list.push({
          id: c.id,
          type: 'pendaftaran',
          title: c.namaKanal,
          subtitle: c.deskripsi,
          targetTab: 'pendaftaran',
          category: c.jenisKanal,
          data: c
        });
      }
    });

    // Search in Announcements
    database.announcements.forEach(a => {
      if (a.judul.toLowerCase().includes(q) || a.ringkasan.toLowerCase().includes(q)) {
        list.push({
          id: a.id,
          type: 'pengumuman',
          title: a.judul,
          subtitle: a.ringkasan,
          targetTab: 'pengumuman',
          category: a.kategori,
          data: a
        });
      }
    });

    return list.slice(0, 15);
  }, [query, database]);

  if (!isOpen) return null;

  const handleSelectResult = (item: GlobalSearchResult) => {
    handleClose();
    if (item.type === 'peraturan') {
      onSelectTab('peraturan');
      onOpenRegulationDetail(item.data as Regulation);
    } else if (item.type === 'dokumen') {
      onSelectTab('dokumen');
      onOpenDocumentPreview(item.data as DocumentItem);
    } else {
      onSelectTab(item.targetTab);
    }
  };

  const getTypeIcon = (type: GlobalSearchResult['type']) => {
    switch (type) {
      case 'peraturan': return FileText;
      case 'petugas': return UserCheck;
      case 'pendaftaran': return Send;
      case 'faq': return HelpCircle;
      case 'dokumen': return FolderOpen;
      case 'pengumuman': return Bell;
      default: return Stethoscope;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari regulasi, nomor peraturan, alur rawat, dokter, FAQ, formulir..."
            className="w-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 px-1 py-0.5"
            >
              Hapus
            </button>
          )}
          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {!query.trim() ? (
            <div className="p-8 text-center text-xs text-slate-400">
              Ketik kata kunci untuk mencari di seluruh database informasi BPJS Kesehatan Rumah Sakit.
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              Tidak ada hasil pencarian untuk &quot;<strong className="text-slate-700">{query}</strong>&quot;.
            </div>
          ) : (
            results.map((res) => {
              const Icon = getTypeIcon(res.type);
              return (
                <div
                  key={`${res.type}-${res.id}`}
                  onClick={() => handleSelectResult(res)}
                  className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-0.5">
                      <span className="font-semibold text-emerald-800">{res.category || res.type}</span>
                      <span>·</span>
                      <span>Di tab: {res.targetTab}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-emerald-800 transition-colors truncate">
                      {res.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{res.subtitle}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-700 transition-colors shrink-0 self-center" />
                </div>
              );
            })
          )}
        </div>

        <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-[11px] text-slate-400 px-4">
          <span>Gunakan panah & tombol enter untuk navigasi cepat</span>
          <span>ESC untuk menutup</span>
        </div>
      </div>
    </div>
  );
}
