'use client';

import React, { useState } from 'react';
import { 
  AppDatabase, 
  StorageService, 
  generateBpjsId, 
  getJakartaTimeString,
  useAdminSession
} from '@/lib/storage';
import { 
  Regulation, 
  Officer, 
  RegistrationChannel, 
  FAQItem, 
  DocumentItem, 
  Announcement, 
  FlowStep,
  HospitalService,
  ActivityLog,
  BannerSlide
} from '@/lib/types';
import { GOOGLE_APPS_SCRIPT_CODE } from '@/lib/gasCode';
import { generateSingleFileHtml } from '@/lib/exportSingleFile';
import AdminEditModal, { EntityType } from './AdminEditModal';
import { 
  LayoutDashboard, 
  FileText, 
  UserCheck, 
  Send, 
  HelpCircle, 
  FolderOpen, 
  Bell, 
  History, 
  Download, 
  Upload, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Copy, 
  Check, 
  Lock, 
  LogOut, 
  Code2, 
  Database, 
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Building2,
  Save,
  Sparkles
} from 'lucide-react';

interface AdminDashboardProps {
  database: AppDatabase;
  onUpdateDatabase: (newDb: AppDatabase) => void;
  onShowToast: (title: string, msg?: string, type?: 'success' | 'error' | 'info') => void;
}

export default function AdminDashboard({
  database,
  onUpdateDatabase,
  onShowToast
}: AdminDashboardProps) {
  // Auth state from reactive session store
  const adminSession = useAdminSession();
  const isAdminLoggedIn = adminSession.loggedIn;
  const [loginUsername, setLoginUsername] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('bpjs2026');
  const [loginError, setLoginError] = useState('');

  // Active admin tab
  const [activeAdminTab, setActiveAdminTab] = useState<
    'stats' | 'regulations' | 'officers' | 'channels' | 'faqs' | 'documents' | 'announcements' | 'slides' | 'logs' | 'integration'
  >('stats');

  // Search in tables
  const [tableSearch, setTableSearch] = useState('');

  // Modal edit/create state
  const [editModalConfig, setEditModalConfig] = useState<{
    isOpen: boolean;
    entityType: EntityType;
    initialData?: unknown;
  }>({
    isOpen: false,
    entityType: 'regulation'
  });

  // Code copied indicator
  const [copiedCode, setCopiedCode] = useState(false);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(database.settings);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUsername === 'admin' && loginPassword === 'bpjs2026') {
      StorageService.setAdminSession(true, 'admin');
      StorageService.addLog('LOGIN', 'Auth', 'SESSION', 'Admin berhasil login ke Content Management System.');
      onShowToast('Login Berhasil', 'Selamat datang di panel pengelolaan informasi BPJS RS', 'success');
      setLoginError('');
    } else {
      setLoginError('Username atau password tidak sesuai. Gunakan: admin / bpjs2026');
    }
  };

  const handleLogout = () => {
    StorageService.setAdminSession(false, '');
    onShowToast('Logout Berhasil', 'Anda telah keluar dari sesi admin.', 'info');
  };

  // Open modal
  const handleOpenAdd = (type: EntityType) => {
    setEditModalConfig({
      isOpen: true,
      entityType: type,
      initialData: undefined
    });
  };

  const handleOpenEdit = (type: EntityType, item: unknown) => {
    setEditModalConfig({
      isOpen: true,
      entityType: type,
      initialData: item
    });
  };

  // Save from modal
  const handleSaveEntity = (entityType: EntityType, item: unknown) => {
    const entity = item as Record<string, any>;
    const newDb = { ...database };

    if (entityType === 'regulation') {
      const reg = entity as Regulation;
      const idx = newDb.regulations.findIndex(r => r.id === reg.id);
      if (idx >= 0) {
        newDb.regulations[idx] = reg;
        StorageService.addLog('UPDATE', 'Regulations', reg.id, `Perbarui regulasi: ${reg.nomor}`);
      } else {
        newDb.regulations.unshift(reg);
        StorageService.addLog('CREATE', 'Regulations', reg.id, `Tambah regulasi: ${reg.nomor}`);
      }
    } else if (entityType === 'officer') {
      const off = entity as Officer;
      const idx = newDb.officers.findIndex(o => o.id === off.id);
      if (idx >= 0) {
        newDb.officers[idx] = off;
        StorageService.addLog('UPDATE', 'Officers', off.id, `Perbarui data petugas: ${off.nama}`);
      } else {
        newDb.officers.push(off);
        StorageService.addLog('CREATE', 'Officers', off.id, `Tambah petugas: ${off.nama}`);
      }
    } else if (entityType === 'channel') {
      const ch = entity as RegistrationChannel;
      const idx = newDb.channels.findIndex(c => c.id === ch.id);
      if (idx >= 0) {
        newDb.channels[idx] = ch;
        StorageService.addLog('UPDATE', 'RegistrationChannels', ch.id, `Perbarui kanal: ${ch.namaKanal}`);
      } else {
        newDb.channels.push(ch);
        StorageService.addLog('CREATE', 'RegistrationChannels', ch.id, `Tambah kanal: ${ch.namaKanal}`);
      }
    } else if (entityType === 'faq') {
      const f = entity as FAQItem;
      const idx = newDb.faqs.findIndex(item => item.id === f.id);
      if (idx >= 0) {
        newDb.faqs[idx] = f;
        StorageService.addLog('UPDATE', 'FAQs', f.id, `Perbarui FAQ: ${f.pertanyaan}`);
      } else {
        newDb.faqs.push(f);
        StorageService.addLog('CREATE', 'FAQs', f.id, `Tambah FAQ: ${f.pertanyaan}`);
      }
    } else if (entityType === 'document') {
      const doc = entity as DocumentItem;
      const idx = newDb.documents.findIndex(d => d.id === doc.id);
      if (idx >= 0) {
        newDb.documents[idx] = doc;
        StorageService.addLog('UPDATE', 'Documents', doc.id, `Perbarui dokumen: ${doc.namaDokumen}`);
      } else {
        newDb.documents.unshift(doc);
        StorageService.addLog('CREATE', 'Documents', doc.id, `Unggah dokumen: ${doc.namaDokumen}`);
      }
    } else if (entityType === 'announcement') {
      const ann = entity as Announcement;
      const idx = newDb.announcements.findIndex(a => a.id === ann.id);
      if (idx >= 0) {
        newDb.announcements[idx] = ann;
        StorageService.addLog('UPDATE', 'Announcements', ann.id, `Perbarui pengumuman: ${ann.judul}`);
      } else {
        newDb.announcements.unshift(ann);
        StorageService.addLog('CREATE', 'Announcements', ann.id, `Tambah pengumuman: ${ann.judul}`);
      }
    } else if (entityType === 'slide') {
      const sld = entity as BannerSlide;
      if (!newDb.slides) newDb.slides = [];
      const idx = newDb.slides.findIndex(s => s.id === sld.id);
      if (idx >= 0) {
        newDb.slides[idx] = sld;
        StorageService.addLog('UPDATE', 'BannerSlides', sld.id, `Perbarui slide: ${sld.judul}`);
      } else {
        newDb.slides.push(sld);
        StorageService.addLog('CREATE', 'BannerSlides', sld.id, `Tambah slide: ${sld.judul}`);
      }
    }

    onUpdateDatabase(newDb);
    setEditModalConfig({ isOpen: false, entityType: 'regulation' });
    onShowToast('Data Berhasil Disimpan', `${entity.judul || entity.nama || entity.namaDokumen || entity.pertanyaan || entity.id}`, 'success');
  };

  // Delete Entity with confirmation
  const handleDeleteEntity = (entityType: EntityType, id: string, name: string) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus data "${name}"?\nOperasi ini tidak dapat dibatalkan.`)) {
      return;
    }

    const newDb = { ...database };
    if (entityType === 'regulation') {
      newDb.regulations = newDb.regulations.filter(r => r.id !== id);
    } else if (entityType === 'officer') {
      newDb.officers = newDb.officers.filter(o => o.id !== id);
    } else if (entityType === 'channel') {
      newDb.channels = newDb.channels.filter(c => c.id !== id);
    } else if (entityType === 'faq') {
      newDb.faqs = newDb.faqs.filter(f => f.id !== id);
    } else if (entityType === 'document') {
      newDb.documents = newDb.documents.filter(d => d.id !== id);
    } else if (entityType === 'announcement') {
      newDb.announcements = newDb.announcements.filter(a => a.id !== id);
    } else if (entityType === 'slide') {
      newDb.slides = (newDb.slides || []).filter(s => s.id !== id);
    }

    StorageService.addLog('DELETE', entityType, id, `Menghapus data: ${name}`);
    onUpdateDatabase(newDb);
    onShowToast('Data Dihapus', `Data "${name}" berhasil dihapus dari sistem.`, 'info');
  };

  // Export JSON
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(database, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `backup-portal-bpjs-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    StorageService.addLog('EXPORT', 'Database', 'ALL', 'Export database ke file JSON');
    onShowToast('Backup Berhasil', 'File JSON database berhasil diunduh.', 'success');
  };

  // Export CSV for Regulations
  const handleExportCsv = () => {
    const headers = ['ID', 'Nomor', 'Tahun', 'Judul', 'Jenis', 'Instansi', 'Status', 'Tanggal Berlaku', 'Sumber'];
    const rows = database.regulations.map(r => [
      `"${r.id}"`,
      `"${r.nomor.replace(/"/g, '""')}"`,
      r.tahun,
      `"${r.judul.replace(/"/g, '""')}"`,
      `"${r.jenisPeraturan}"`,
      `"${r.instansiPenerbit}"`,
      `"${r.status}"`,
      `"${r.tanggalBerlaku}"`,
      `"${r.linkSumberResmi}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `peraturan-bpjs-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    StorageService.addLog('EXPORT', 'Regulations', 'ALL', 'Export daftar peraturan ke CSV Excel');
    onShowToast('Export CSV Berhasil', 'File CSV kompatibel dengan Microsoft Excel telah diunduh.', 'success');
  };

  // Restore JSON
  const handleRestoreJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && parsed.regulations && parsed.officers) {
            onUpdateDatabase(parsed);
            StorageService.addLog('RESTORE', 'Database', 'ALL', 'Restore database dari file JSON eksternal');
            onShowToast('Restore Berhasil', 'Seluruh data berhasil dipulihkan.', 'success');
          } else {
            alert('Format file JSON tidak sesuai dengan skema database Portal BPJS.');
          }
        } catch {
          alert('Gagal membaca file JSON.');
        }
      };
    }
  };

  // Download Single-File HTML bundle
  const handleDownloadSingleFileHtml = () => {
    const htmlString = generateSingleFileHtml(database);
    const blob = new Blob([htmlString], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    onShowToast('Single-File HTML Siap', 'File index.html mandiri berhasil dibuat untuk deployment GAS / Web Server.', 'success');
  };

  // Copy GAS Code
  const handleCopyGasCode = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
    onShowToast('Code.gs Disalin', 'Kode backend Google Apps Script siap ditempel di script.google.com', 'success');
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const newDb = { ...database, settings: settingsForm };
    onUpdateDatabase(newDb);
    StorageService.addLog('UPDATE', 'Settings', 'GLOBAL', 'Pengaturan portal rumah sakit diperbarui');
    onShowToast('Pengaturan Disimpan', 'Konfigurasi rumah sakit dan backend berhasil diperbarui.', 'success');
  };

  // Reset to default
  const handleResetToDefault = () => {
    if (window.confirm('PERINGATAN: Apakah Anda yakin ingin mengembalikan seluruh data ke data bawaan rumah sakit? Semua data yang baru Anda tambahkan akan direset.')) {
      const defaultDb = StorageService.resetToDefault();
      onUpdateDatabase(defaultDb);
      setSettingsForm(defaultDb.settings);
      onShowToast('Reset Berhasil', 'Database dikembalikan ke konfigurasi awal.', 'info');
    }
  };

  // IF NOT LOGGED IN, SHOW LOGIN SCREEN
  if (!isAdminLoggedIn) {
    return (
      <div className="py-12 max-w-md mx-auto">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center mx-auto text-2xl shadow-sm mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Admin Content Management</h1>
            <p className="text-xs text-slate-500 mt-1">
              Masuk untuk menambah, memperbarui, atau menghapus informasi BPJS tanpa menyentuh kode aplikasi.
            </p>
          </div>

          {loginError && (
            <div className="p-3 mb-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Username Admin</label>
              <input
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 border rounded-xl bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 border rounded-xl bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-xs transition-colors shadow-xs"
            >
              Masuk ke Dashboard CMS
            </button>

            <div className="pt-2 text-center text-[11px] text-slate-400 border-t border-slate-100">
              Demo Kredensial: <strong className="text-slate-600">admin</strong> / <strong className="text-slate-600">bpjs2026</strong>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // LOGGED IN DASHBOARD
  const totalRegulations = database.regulations.length;
  const activeOfficers = database.officers.filter(o => o.statusAktif).length;
  const totalDocs = database.documents.length;
  const totalFaqs = database.faqs.length;
  const totalAnnouncements = database.announcements.length;

  return (
    <div className="space-y-6 py-6">
      {/* Top Admin Action Bar */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Panel Pengelolaan Informasi Rumah Sakit</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Content Management System (CMS)</h1>
          <p className="text-xs text-slate-400 mt-1">
            Kelola data regulasi, alur berobat, petugas, dokumen, FAQ, dan sinkronisasi Google Sheets secara langsung.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJson}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors border border-slate-700"
            title="Cadangkan seluruh data ke JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Backup JSON</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-2 bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-800 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* Admin Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200">
        <button
          onClick={() => setActiveAdminTab('stats')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeAdminTab === 'stats'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Statistik & Ringkasan</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('regulations')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeAdminTab === 'regulations'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Peraturan ({totalRegulations})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('officers')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeAdminTab === 'officers'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Petugas BPJS ({database.officers.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('channels')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeAdminTab === 'channels'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          <span>Kanal Pendaftaran ({database.channels.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('faqs')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeAdminTab === 'faqs'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>FAQ ({totalFaqs})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('documents')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeAdminTab === 'documents'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FolderOpen className="w-3.5 h-3.5" />
          <span>Dokumen ({totalDocs})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('announcements')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeAdminTab === 'announcements'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Pengumuman ({totalAnnouncements})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('slides')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeAdminTab === 'slides'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Banner Slider ({database.slides?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('logs')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeAdminTab === 'logs'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Audit Log ({database.logs.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('integration')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeAdminTab === 'integration'
              ? 'bg-emerald-700 text-white'
              : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Google Apps Script & Sheets</span>
        </button>
      </div>

      {/* STATS TAB */}
      {activeAdminTab === 'stats' && (
        <div className="space-y-6">
          {/* Counters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">Total Peraturan</span>
              <p className="text-2xl font-extrabold text-slate-900">{totalRegulations}</p>
              <span className="text-[10px] text-emerald-700 font-medium">Resmi Terverifikasi</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">Petugas BPJS RS</span>
              <p className="text-2xl font-extrabold text-slate-900">{activeOfficers}</p>
              <span className="text-[10px] text-emerald-700 font-medium">Aktif Siaga</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">Dokumen & SOP</span>
              <p className="text-2xl font-extrabold text-slate-900">{totalDocs}</p>
              <span className="text-[10px] text-blue-700 font-medium">Siap Unduh</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">Pertanyaan FAQ</span>
              <p className="text-2xl font-extrabold text-slate-900">{totalFaqs}</p>
              <span className="text-[10px] text-purple-700 font-medium">Tersedia untuk Pasien</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">Pengumuman</span>
              <p className="text-2xl font-extrabold text-slate-900">{totalAnnouncements}</p>
              <span className="text-[10px] text-amber-700 font-medium">Terbit Aktif</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">Audit Aktivitas</span>
              <p className="text-2xl font-extrabold text-slate-900">{database.logs.length}</p>
              <span className="text-[10px] text-slate-500 font-medium">Terekam Log</span>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Tindakan Cepat (Quick Actions)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <button
                onClick={() => handleOpenAdd('regulation')}
                className="p-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4 text-emerald-700" />
                <span>Tambah Peraturan</span>
              </button>

              <button
                onClick={() => handleOpenAdd('officer')}
                className="p-3 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4 text-blue-700" />
                <span>Tambah Petugas</span>
              </button>

              <button
                onClick={() => handleOpenAdd('document')}
                className="p-3 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4 text-purple-700" />
                <span>Upload Dokumen</span>
              </button>

              <button
                onClick={() => handleOpenAdd('faq')}
                className="p-3 bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4 text-teal-700" />
                <span>Tambah FAQ</span>
              </button>

              <button
                onClick={() => handleOpenAdd('announcement')}
                className="p-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4 text-amber-700" />
                <span>Buat Pengumuman</span>
              </button>
            </div>
          </div>

          {/* Hospital Profile Settings Form */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Pengaturan Rumah Sakit & Kontak Layanan</h3>
                <p className="text-xs text-slate-500">Perbarui informasi identitas faskes yang ditampilkan ke pengunjung.</p>
              </div>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Rumah Sakit</label>
                  <input
                    type="text"
                    value={settingsForm.hospitalName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, hospitalName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sub-Judul / Keterangan</label>
                  <input
                    type="text"
                    value={settingsForm.hospitalSubname}
                    onChange={(e) => setSettingsForm({ ...settingsForm, hospitalSubname: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Lokasi Meja Pelayanan BPJS</label>
                  <input
                    type="text"
                    value={settingsForm.bpjsDeskLocation}
                    onChange={(e) => setSettingsForm({ ...settingsForm, bpjsDeskLocation: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Jam Pelayanan</label>
                  <input
                    type="text"
                    value={settingsForm.operatingHours}
                    onChange={(e) => setSettingsForm({ ...settingsForm, operatingHours: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nomor Hotline BPJS RS</label>
                  <input
                    type="text"
                    value={settingsForm.bpjsHotlineRS}
                    onChange={(e) => setSettingsForm({ ...settingsForm, bpjsHotlineRS: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Telepon IGD 24 Jam</label>
                  <input
                    type="text"
                    value={settingsForm.emergencyPhone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, emergencyPhone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email BPJS Center</label>
                  <input
                    type="email"
                    value={settingsForm.bpjsCenterEmail}
                    onChange={(e) => setSettingsForm({ ...settingsForm, bpjsCenterEmail: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Pengaturan Rumah Sakit</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REGULATIONS CRUD TAB */}
      {activeAdminTab === 'regulations' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Kelola Data Peraturan BPJS Kesehatan</h3>
              <p className="text-xs text-slate-500">Semua data peraturan resmi yang tampil di halaman publik.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCsv}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Excel (CSV)</span>
              </button>
              <button
                onClick={() => handleOpenAdd('regulation')}
                className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Peraturan</span>
              </button>
            </div>
          </div>

          <div className="relative max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              placeholder="Cari peraturan..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border rounded-lg"
            />
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Nomor Peraturan</th>
                  <th className="py-2.5 px-3">Judul</th>
                  <th className="py-2.5 px-3">Tahun</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {database.regulations
                  .filter(r => r.nomor.toLowerCase().includes(tableSearch.toLowerCase()) || r.judul.toLowerCase().includes(tableSearch.toLowerCase()))
                  .map((reg) => (
                    <tr key={reg.id} className="hover:bg-slate-50/60">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{reg.nomor}</td>
                      <td className="py-2.5 px-3 font-medium text-slate-800 max-w-md truncate">{reg.judul}</td>
                      <td className="py-2.5 px-3">{reg.tahun}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          reg.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {reg.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenEdit('regulation', reg)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteEntity('regulation', reg.id, reg.nomor)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* OFFICERS CRUD TAB */}
      {activeAdminTab === 'officers' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Kelola Petugas BPJS RS (PIPP & Admisi)</h3>
              <p className="text-xs text-slate-500">Daftar staf liaison dan petugas meja BPJS Center.</p>
            </div>
            <button
              onClick={() => handleOpenAdd('officer')}
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Petugas</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {database.officers.map((o) => (
              <div key={o.id} className="p-4 rounded-xl border border-slate-200 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <img src={o.foto} alt={o.nama} className="w-12 h-12 rounded-xl object-cover border" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{o.nama}</h4>
                    <p className="text-[11px] text-emerald-700 font-medium">{o.jabatan}</p>
                    <p className="text-[11px] text-slate-500 mt-1">{o.lokasiPelayanan}</p>
                    <p className="text-[11px] text-slate-400">Kontak: {o.nomorKontak}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit('officer', o)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteEntity('officer', o.id, o.nama)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQS CRUD TAB */}
      {activeAdminTab === 'faqs' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Kelola FAQ (Tanya Jawab Pasien)</h3>
              <p className="text-xs text-slate-500">Tambah atau perbarui pertanyaan yang sering diajukan masyarakat.</p>
            </div>
            <button
              onClick={() => handleOpenAdd('faq')}
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah FAQ</span>
            </button>
          </div>

          <div className="space-y-3">
            {database.faqs.map((f) => (
              <div key={f.id} className="p-4 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">{f.kategori}</span>
                    <span>·</span>
                    <span>Urutan #{f.urutan}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{f.pertanyaan}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{f.jawaban}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleOpenEdit('faq', f)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteEntity('faq', f.id, f.pertanyaan)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DOCUMENTS CRUD TAB */}
      {activeAdminTab === 'documents' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Kelola Repositori Dokumen & Formulir</h3>
              <p className="text-xs text-slate-500">Formulir SOP, surat persetujuan selisih biaya, dan pedoman.</p>
            </div>
            <button
              onClick={() => handleOpenAdd('document')}
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Unggah Dokumen Baru</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Nama Dokumen</th>
                  <th className="py-2.5 px-3">Jenis</th>
                  <th className="py-2.5 px-3">Format</th>
                  <th className="py-2.5 px-3">Ukuran</th>
                  <th className="py-2.5 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {database.documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/60">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{doc.namaDokumen}</td>
                    <td className="py-2.5 px-3">{doc.jenisDokumen}</td>
                    <td className="py-2.5 px-3 font-mono text-red-600">{doc.format}</td>
                    <td className="py-2.5 px-3">{doc.ukuran}</td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit('document', doc)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteEntity('document', doc.id, doc.namaDokumen)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ANNOUNCEMENTS CRUD TAB */}
      {activeAdminTab === 'announcements' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Kelola Pengumuman & Berita</h3>
              <p className="text-xs text-slate-500">Informasi operasional dan update layanan untuk pasien.</p>
            </div>
            <button
              onClick={() => handleOpenAdd('announcement')}
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Buat Pengumuman Baru</span>
            </button>
          </div>

          <div className="space-y-3">
            {database.announcements.map((a) => (
              <div key={a.id} className="p-4 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-1">
                    <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">{a.kategori}</span>
                    <span>·</span>
                    <span>{a.tanggal}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{a.judul}</h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{a.ringkasan}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleOpenEdit('announcement', a)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteEntity('announcement', a.id, a.judul)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CHANNELS CRUD TAB */}
      {activeAdminTab === 'channels' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Kelola Kanal Pendaftaran & Antrean</h3>
              <p className="text-xs text-slate-500">Konfigurasi petunjuk Mobile JKN, APM, loket, dan WhatsApp.</p>
            </div>
            <button
              onClick={() => handleOpenAdd('channel')}
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Kanal Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {database.channels.map((ch) => (
              <div key={ch.id} className="p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900">{ch.namaKanal}</span>
                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-medium">{ch.jenisKanal}</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-2">{ch.deskripsi}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-1">
                  <button
                    onClick={() => handleOpenEdit('channel', ch)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteEntity('channel', ch.id, ch.namaKanal)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BANNER SLIDES CRUD TAB */}
      {activeAdminTab === 'slides' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Kelola Menu Slider & Foto Banner Beranda</h3>
              <p className="text-xs text-slate-500">Banner promosi foto beranda yang dapat diklik langsung oleh pasien.</p>
            </div>
            <button
              onClick={() => handleOpenAdd('slide')}
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Slide Banner</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(database.slides || []).map((slide) => (
              <div key={slide.id} className="p-4 rounded-xl border border-slate-200 flex flex-col justify-between overflow-hidden group">
                <div>
                  <div className="relative h-32 rounded-lg overflow-hidden mb-3 border border-slate-100 bg-slate-100">
                    <img 
                      src={slide.foto} 
                      alt={slide.judul} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute top-2 left-2 flex items-center gap-1.5">
                      {slide.badge && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white shadow-xs">
                          {slide.badge}
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        slide.statusAktif ? 'bg-slate-900/80 text-white' : 'bg-rose-900/80 text-rose-200'
                      }`}>
                        {slide.statusAktif ? 'Aktif' : 'Non-Aktif'}
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono">
                      Urutan #{slide.urutan}
                    </div>
                  </div>

                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">{slide.judul}</h4>
                  <p className="text-[11px] text-emerald-700 font-medium mb-1">{slide.subjudul}</p>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-2">{slide.deskripsi}</p>
                  
                  <div className="text-[11px] text-slate-400 bg-slate-50 p-2 rounded-lg mb-2">
                    <span>Aksi Klik Menuju: </span>
                    <strong className="text-slate-700 font-semibold">{slide.targetTab}</strong>
                    <span> · Label: &quot;{slide.labelTombol}&quot;</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-1">
                  <button
                    onClick={() => handleOpenEdit('slide', slide)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                    title="Edit Slide"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteEntity('slide', slide.id, slide.judul)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                    title="Hapus Slide"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AUDIT LOGS TAB */}
      {activeAdminTab === 'logs' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Audit Aktivitas & Riwayat Perubahan</h3>
            <p className="text-xs text-slate-500">Mencatat setiap aksi penambahan, pembaruan, dan penghapusan data secara transparan.</p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Waktu (WIB)</th>
                  <th className="py-2.5 px-3">Pengguna</th>
                  <th className="py-2.5 px-3">Aksi</th>
                  <th className="py-2.5 px-3">Entitas</th>
                  <th className="py-2.5 px-3">Detail Perubahan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 font-mono text-[11px]">
                {database.logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-400">Belum ada riwayat aktivitas.</td>
                  </tr>
                ) : (
                  database.logs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/60">
                      <td className="py-2 px-3 text-slate-500">{log.timestamp}</td>
                      <td className="py-2 px-3 font-semibold text-slate-800">{log.userName}</td>
                      <td className="py-2 px-3">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          log.action === 'CREATE' ? 'bg-emerald-100 text-emerald-800' :
                          log.action === 'UPDATE' ? 'bg-blue-100 text-blue-800' :
                          log.action === 'DELETE' ? 'bg-rose-100 text-rose-800' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-slate-700">{log.entity}</td>
                      <td className="py-2 px-3 text-slate-600 font-sans">{log.details}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* GOOGLE APPS SCRIPT & SHEETS INTEGRATION TAB */}
      {activeAdminTab === 'integration' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold mb-1">
                  <Database className="w-4 h-4" />
                  <span>Arsitektur Google Apps Script & Google Sheets</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Backend Google Sheets & Google Drive Terpadu
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Aplikasi ini dirancang 100% kompatibel dengan Google Apps Script. Anda dapat menyalin skrip backend <code>Code.gs</code> di bawah ini dan menempelkannya langsung ke proyek Google Apps Script Anda.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadSingleFileHtml}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Single-File HTML (GAS Ready)</span>
                </button>
              </div>
            </div>

            {/* Instruction Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="block text-slate-900 mb-1">1. Buat Google Spreadsheet</strong>
                <p className="text-slate-600 leading-relaxed">
                  Buka Google Drive &rarr; Buat Spreadsheet baru. Buka menu <em>Ekstensi &rarr; Apps Script</em>.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="block text-slate-900 mb-1">2. Tempel Kode Code.gs</strong>
                <p className="text-slate-600 leading-relaxed">
                  Salin seluruh kode script di bawah ini ke editor Apps Script. Fungsi <code>initDatabase()</code> otomatis membuat 11 sheet lengkap.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="block text-slate-900 mb-1">3. Terapkan Web App</strong>
                <p className="text-slate-600 leading-relaxed">
                  Klik <em>Deploy &rarr; New Deployment &rarr; Web App</em> (Access: Anyone). Masukkan URL Web App ke form pengaturan di bawah.
                </p>
              </div>
            </div>

            {/* Remote Web App URL configuration */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-3">
              <h4 className="font-bold text-slate-900 text-xs">Konfigurasi Mode Database Aktif</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">URL Google Apps Script Web App (Opsional)</label>
                  <input
                    type="url"
                    value={settingsForm.gasEndpointUrl || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, gasEndpointUrl: e.target.value })}
                    placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pilihan Mode Penyimpanan</label>
                  <select
                    value={settingsForm.activeMode}
                    onChange={(e) => setSettingsForm({ ...settingsForm, activeMode: e.target.value as 'local' | 'gas' })}
                    className="w-full px-3 py-2 border rounded-lg bg-white font-medium"
                  >
                    <option value="local">Local Storage (Mandiri & Cepat)</option>
                    <option value="gas">Google Sheets (Sinkronisasi Cloud GAS)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Code Viewer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 text-xs">Script Backend Google Apps Script (Code.gs):</span>
                <button
                  onClick={handleCopyGasCode}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Tersalin ke Clipboard!' : 'Salin Seluruh Code.gs'}</span>
                </button>
              </div>

              <pre className="p-4 bg-slate-900 text-emerald-300 font-mono text-[11px] rounded-2xl overflow-x-auto max-h-96 leading-relaxed border border-slate-800">
                {GOOGLE_APPS_SCRIPT_CODE}
              </pre>
            </div>

            {/* Database Reset Danger Zone */}
            <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <strong className="text-slate-800 block">Kembalikan ke Data Bawaan Rumah Sakit</strong>
                <span className="text-slate-500">Mereset seluruh data ke peraturan resmi BPJS & petugas seed awal.</span>
              </div>
              <button
                onClick={handleResetToDefault}
                className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg font-semibold transition-colors"
              >
                Reset Database Bawaan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Create Modal */}
      {editModalConfig.isOpen && (
        <AdminEditModal
          entityType={editModalConfig.entityType}
          initialData={editModalConfig.initialData}
          onSave={handleSaveEntity}
          onClose={() => setEditModalConfig({ isOpen: false, entityType: 'regulation' })}
        />
      )}
    </div>
  );
}
