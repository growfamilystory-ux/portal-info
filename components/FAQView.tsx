'use client';

import React, { useState, useMemo } from 'react';
import { FAQItem } from '@/lib/types';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  Copy, 
  ThumbsUp, 
  Tag, 
  MessageSquare
} from 'lucide-react';

interface FAQViewProps {
  faqs: FAQItem[];
  onShowToast: (title: string, msg?: string, type?: 'success' | 'error' | 'info') => void;
}

export default function FAQView({ faqs, onShowToast }: FAQViewProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    [faqs[0]?.id || '']: true
  });
  const [helpfulGiven, setHelpfulGiven] = useState<Record<string, boolean>>({});

  const categories = [
    'all',
    'Rujukan',
    'Kepesertaan',
    'Rawat Jalan',
    'Rawat Inap',
    'Obat & Alkes',
    'Administrasi',
    'Pendaftaran',
    'Pengaduan'
  ];

  const filteredFaqs = useMemo(() => {
    return faqs.filter(f => {
      const matchSearch =
        search.trim() === '' ||
        f.pertanyaan.toLowerCase().includes(search.toLowerCase()) ||
        f.jawaban.toLowerCase().includes(search.toLowerCase()) ||
        f.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));

      const matchCat = selectedCategory === 'all' || f.kategori === selectedCategory;

      return matchSearch && matchCat;
    }).sort((a, b) => a.urutan - b.urutan);
  }, [faqs, search, selectedCategory]);

  const toggleAccordion = (id: string) => {
    setOpenIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyAnswer = (faq: FAQItem) => {
    const text = `Pertanyaan: ${faq.pertanyaan}\n\nJawaban: ${faq.jawaban}\n(Sumber: Portal Informasi BPJS Kesehatan RS)`;
    navigator.clipboard.writeText(text);
    onShowToast('Jawaban disalin ke clipboard', faq.pertanyaan, 'success');
  };

  const handleHelpful = (id: string) => {
    if (helpfulGiven[id]) return;
    setHelpfulGiven(prev => ({ ...prev, [id]: true }));
    onShowToast('Terima kasih atas tanggapan Anda!', 'Masukan Anda membantu kami menyajikan jawaban yang lebih baik.', 'info');
  };

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>Tanya Jawab Seputar Layanan BPJS di Rumah Sakit</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            FAQ (Frequently Asked Questions)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
            Kumpulan pertanyaan yang paling sering ditanyakan pasien mengenai rujukan, kepesertaan, biaya kamar, masa berlaku surat kontrol, dan penjaminan obat.
          </p>
        </div>

        {/* Realtime Search Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="relative max-w-xl">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ketik kata kunci pertanyaan (misal: rujukan, bayi, naik kelas, fornas)..."
              className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
              >
                Hapus
              </button>
            )}
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-4 pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'Semua Kategori' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs List Accordion */}
      {filteredFaqs.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
          <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800 mb-1">Pertanyaan Tidak Ditemukan</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            Coba gunakan kata kunci lain atau hubungi meja layanan BPJS Center rumah sakit untuk bantuan langsung.
          </p>
          <button
            onClick={() => { setSearch(''); setSelectedCategory('all'); }}
            className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-700 text-white rounded-lg hover:bg-emerald-800"
          >
            Tampilkan Semua FAQ
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = !!openIds[faq.id];
            const isHelpful = !!helpfulGiven[faq.id];

            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden transition-all shadow-2xs"
              >
                {/* Question Trigger */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="font-semibold text-emerald-700">{faq.kategori}</span>
                      <span>·</span>
                      <span>No. Urut #{faq.urutan}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {faq.pertanyaan}
                    </h3>
                  </div>

                  <div className={`p-1 rounded-lg text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-700' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {/* Answer Drawer */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-150">
                    <p className="mt-3 text-slate-700 sm:text-sm leading-relaxed whitespace-pre-line">
                      {faq.jawaban}
                    </p>

                    {/* Tags */}
                    {faq.tags && faq.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t border-slate-100">
                        <Tag className="w-3 h-3 text-slate-400" />
                        {faq.tags.map((t, idx) => (
                          <span
                            key={idx}
                            onClick={() => setSearch(t)}
                            className="text-[11px] text-slate-500 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded cursor-pointer transition-colors"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action bar (Feedback & Copy) */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400">
                      <div className="flex items-center gap-3">
                        <span>Apakah jawaban ini membantu?</span>
                        <button
                          onClick={() => handleHelpful(faq.id)}
                          disabled={isHelpful}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                            isHelpful 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>{isHelpful ? 'Membantu (Terima kasih)' : 'Membantu'}</span>
                          <span className="font-mono text-[10px] ml-0.5">
                            ({(faq.helpfulCount || 0) + (isHelpful ? 1 : 0)})
                          </span>
                        </button>
                      </div>

                      <button
                        onClick={() => handleCopyAnswer(faq)}
                        className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 font-medium"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Jawaban</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
