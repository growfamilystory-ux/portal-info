'use client';

import React from 'react';
import { Regulation, DocumentItem, FAQItem, Announcement } from '@/lib/types';
import { 
  X, 
  ExternalLink, 
  Download, 
  Calendar, 
  Building, 
  FileText, 
  ShieldCheck, 
  Clock, 
  Copy,
  Printer
} from 'lucide-react';

interface DetailModalProps {
  item: Regulation | DocumentItem | FAQItem | Announcement | null;
  type: 'regulation' | 'document' | 'faq' | 'announcement';
  onClose: () => void;
  onShowToast: (title: string, msg?: string, type?: 'success' | 'error' | 'info') => void;
}

export default function DetailModal({ item, type, onClose, onShowToast }: DetailModalProps) {
  if (!item) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    onShowToast('Tautan informasi disalin', window.location.href, 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 relative max-h-[90vh] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
              {type === 'regulation' && 'Dokumen Regulasi Resmi BPJS'}
              {type === 'document' && 'Berkas / Formulir Resmi Rumah Sakit'}
              {type === 'faq' && 'Informasi Tanya Jawab Pasien'}
              {type === 'announcement' && 'Pemberitahuan Resmi Rumah Sakit'}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {'judul' in item ? item.judul : 'namaDokumen' in item ? item.namaDokumen : 'pertanyaan' in item ? item.pertanyaan : 'Rincian Informasi'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Scrollable */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed pr-1">
          {/* REGULATION DETAIL */}
          {type === 'regulation' && (() => {
            const reg = item as Regulation;
            return (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Nomor:</span>
                    <strong className="text-slate-800 font-mono">{reg.nomor}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Tahun:</span>
                    <strong className="text-slate-800">{reg.tahun}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Status:</span>
                    <span className="font-semibold text-emerald-700">{reg.status}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Tanggal Berlaku:</span>
                    <strong className="text-slate-800">{reg.tanggalBerlaku}</strong>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 text-xs uppercase mb-1">Penerbit Resmi:</h4>
                  <p className="text-slate-700">{reg.instansiPenerbit}</p>
                </div>

                {reg.dasarHukum && (
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs uppercase mb-1">Dasar Hukum Terkait:</h4>
                    <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">{reg.dasarHukum}</p>
                  </div>
                )}

                <div>
                  <h4 className="font-bold text-slate-800 text-xs uppercase mb-1">Ringkasan Ketentuan:</h4>
                  <p className="text-slate-700 leading-relaxed">{reg.ringkasan}</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 text-xs uppercase mb-1">Ketentuan & Pasal-Pasal Penting:</h4>
                  <div className="text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100 whitespace-pre-line">
                    {reg.isi}
                  </div>
                </div>

                {reg.catatan && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-xs text-amber-900">
                    <strong>Catatan Rumah Sakit: </strong>{reg.catatan}
                  </div>
                )}
              </>
            );
          })()}

          {/* DOCUMENT DETAIL */}
          {type === 'document' && (() => {
            const doc = item as DocumentItem;
            return (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Jenis:</span>
                    <strong className="text-slate-800">{doc.jenisDokumen}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Format:</span>
                    <strong className="text-red-700 font-mono">{doc.format}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Ukuran:</span>
                    <strong className="text-slate-800 font-mono">{doc.ukuran}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Tahun:</span>
                    <strong className="text-slate-800">{doc.tahun}</strong>
                  </div>
                </div>

                <div className="space-y-2">
                  <p><strong>Nomor Dokumen: </strong><span className="font-mono">{doc.nomorDokumen}</span></p>
                  <p><strong>Kategori: </strong>{doc.kategori}</p>
                  <p><strong>Pengunggah: </strong>{doc.pengunggah} ({doc.tanggalUpload})</p>
                  <p><strong>Total Diunduh: </strong>{doc.downloadCount} kali</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <FileText className="w-10 h-10 text-emerald-700 mx-auto mb-2" />
                  <p className="text-xs text-slate-500 mb-3">
                    Dokumen ini telah diverifikasi oleh tim admisi dan manajemen mutu RSUD Sehat Utama.
                  </p>
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold"
                  >
                    <Download className="w-4 h-4" />
                    <span>Unduh File Lengkap ({doc.ukuran})</span>
                  </a>
                </div>
              </>
            );
          })()}

          {/* FAQ DETAIL */}
          {type === 'faq' && (() => {
            const faq = item as FAQItem;
            return (
              <>
                <div className="p-3 bg-emerald-50 rounded-xl text-emerald-900 text-xs font-semibold mb-2">
                  Kategori: {faq.kategori} · Nomor #{faq.urutan}
                </div>
                <div className="text-slate-800 whitespace-pre-line leading-relaxed">
                  {faq.jawaban}
                </div>
              </>
            );
          })()}

          {/* ANNOUNCEMENT DETAIL */}
          {type === 'announcement' && (() => {
            const ann = item as Announcement;
            return (
              <>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-emerald-800">{ann.kategori}</span>
                  <span>·</span>
                  <span>Dipublikasikan: {ann.tanggal}</span>
                  {ann.masaBerlaku && (
                    <>
                      <span>·</span>
                      <span>Masa Berlaku: {ann.masaBerlaku}</span>
                    </>
                  )}
                </div>

                {ann.gambarUrl && (
                  <img
                    src={ann.gambarUrl}
                    alt={ann.judul}
                    className="w-full rounded-xl border border-slate-200 max-h-64 object-cover"
                  />
                )}

                <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {ann.isi}
                </div>
              </>
            );
          })()}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-medium inline-flex items-center gap-1"
              title="Cetak lembar ini"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cetak</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="p-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-medium inline-flex items-center gap-1"
              title="Salin tautan"
            >
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Salin Link</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {type === 'regulation' && 'linkSumberResmi' in item && (
              <a
                href={(item as Regulation).linkSumberResmi}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg inline-flex items-center gap-1.5"
              >
                <span>Buka JDIH / Sumber Resmi</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
