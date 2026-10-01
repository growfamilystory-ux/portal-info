'use client';

import React, { useState } from 'react';
import { 
  NavigationTab, 
  HospitalSettings 
} from '@/lib/types';
import { 
  Building2, 
  Search, 
  ShieldCheck, 
  Menu, 
  X, 
  Phone, 
  Clock, 
  Bookmark, 
  Settings2,
  FileText,
  UserCheck,
  Send,
  HelpCircle,
  FolderOpen,
  Bell,
  HeartPulse
} from 'lucide-react';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  settings: HospitalSettings;
  bookmarksCount: number;
  onOpenSearch: () => void;
  isAdminLoggedIn: boolean;
}

export default function Header({
  currentTab,
  onSelectTab,
  settings,
  bookmarksCount,
  onOpenSearch,
  isAdminLoggedIn
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { tab: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { tab: 'beranda', label: 'Beranda', icon: HeartPulse },
    { tab: 'peraturan', label: 'Peraturan', icon: FileText },
    { tab: 'pelayanan', label: 'Alur Pelayanan', icon: Building2 },
    { tab: 'petugas', label: 'Petugas BPJS', icon: UserCheck },
    { tab: 'pendaftaran', label: 'Pendaftaran', icon: Send },
    { tab: 'informasi-peserta', label: 'Info Peserta', icon: ShieldCheck },
    { tab: 'faq', label: 'FAQ', icon: HelpCircle },
    { tab: 'dokumen', label: 'Dokumen', icon: FolderOpen },
    { tab: 'pengumuman', label: 'Pengumuman', icon: Bell },
    { tab: 'kontak', label: 'Kontak', icon: Phone }
  ];

  const handleNavClick = (tab: NavigationTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      {/* Top Utility Hospital Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 font-medium">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{settings.hospitalName}</span>
              <span className="text-emerald-500 hidden sm:inline">·</span>
              <span className="text-emerald-300 font-normal hidden sm:inline">{settings.hospitalSubname}</span>
            </div>
            <div className="hidden lg:flex items-center gap-1 text-emerald-300">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{settings.operatingHours}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400 font-semibold">Hotline BPJS RS:</span>
              <span className="text-white font-mono font-medium">{settings.bpjsHotlineRS.split('/')[0]}</span>
            </div>
            <span className="text-emerald-700 hidden md:inline">|</span>
            <div className="hidden md:flex items-center gap-1.5">
              <span className="text-emerald-400">Care Center Nasional:</span>
              <span className="text-white font-semibold">165</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Brand & Actions */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <button
          onClick={() => handleNavClick('beranda')}
          className="flex items-center gap-3 text-left group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-lg p-1 -m-1"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-xs shrink-0 group-hover:shadow-md transition-shadow">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-slate-900 tracking-tight leading-tight">
                Informasi BPJS Kesehatan
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">{settings.hospitalName}</p>
          </div>
        </button>

        {/* Global Search Bar (Desktop) */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-slate-500 bg-slate-50 hover:bg-slate-100/90 border border-slate-200 rounded-lg transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600 cursor-text shadow-xs"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <span>Cari regulasi, alur rawat, dokter, FAQ, dokumen...</span>
            </div>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded shadow-xs">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right CTA / Admin Access */}
        <div className="flex items-center gap-2">
          {/* Mobile search button */}
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Cari informasi"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Bookmarks Counter if any */}
          {bookmarksCount > 0 && (
            <button
              onClick={() => handleNavClick('peraturan')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
              title="Peraturan tersimpan"
            >
              <Bookmark className="w-3.5 h-3.5 text-emerald-700 fill-emerald-700" />
              <span>{bookmarksCount} Disimpan</span>
            </button>
          )}

          {/* Admin Portal Button */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'admin'
                ? 'bg-slate-900 text-white shadow-xs'
                : isAdminLoggedIn
                ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isAdminLoggedIn ? 'Panel Admin (Aktif)' : 'Kelola Konten'}</span>
            <span className="sm:hidden">Admin</span>
          </button>

          {/* Hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Buka menu navigasi"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Primary Navigation Bar (Desktop) */}
      <nav className="hidden lg:block border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => handleNavClick(item.tab)}
                  className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-emerald-700 bg-emerald-50/90 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-[11px] text-slate-500 font-medium py-1">
            <span>Zona Waktu: </span>
            <strong className="text-slate-700">WIB (Asia/Jakarta)</strong>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
            Menu Navigasi Portal
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => handleNavClick(item.tab)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold bg-slate-900 text-white rounded-lg"
            >
              <Settings2 className="w-4 h-4" />
              <span>Akses CMS Admin & Pengaturan</span>
            </button>
            <div className="text-[11px] text-slate-500 text-center py-1">
              Hotline RS: <span className="font-semibold text-slate-800">{settings.bpjsHotlineRS}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
