'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  NavigationTab, 
  Regulation, 
  DocumentItem, 
  FAQItem, 
  Announcement 
} from '@/lib/types';
import { 
  StorageService, 
  AppDatabase,
  useAppDatabase,
  useBookmarks,
  useAdminSession
} from '@/lib/storage';

// UI Components
import Header from '@/components/Header';
import HeroSearch from '@/components/HeroSearch';
import HomeView from '@/components/HomeView';
import RegulationsView from '@/components/RegulationsView';
import FlowsView from '@/components/FlowsView';
import OfficersView from '@/components/OfficersView';
import RegistrationChannelsView from '@/components/RegistrationChannelsView';
import ParticipantInfoView from '@/components/ParticipantInfoView';
import FAQView from '@/components/FAQView';
import DocumentsView from '@/components/DocumentsView';
import AnnouncementsView from '@/components/AnnouncementsView';
import ContactView from '@/components/ContactView';
import AdminDashboard from '@/components/AdminDashboard';
import DetailModal from '@/components/DetailModal';
import GlobalSearchModal from '@/components/GlobalSearchModal';
import ToastContainer, { ToastMessage } from '@/components/Toast';
import Footer from '@/components/Footer';

export default function App() {
  const database = useAppDatabase();
  const bookmarks = useBookmarks();
  const adminSession = useAdminSession();
  const [currentTab, setCurrentTab] = useState<NavigationTab>('beranda');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Detail Modal State
  const [detailModalState, setDetailModalState] = useState<{
    isOpen: boolean;
    item: Regulation | DocumentItem | FAQItem | Announcement | null;
    type: 'regulation' | 'document' | 'faq' | 'announcement';
  }>({
    isOpen: false,
    item: null,
    type: 'regulation'
  });

  // Update Database state & persist to LocalStorage
  const handleUpdateDatabase = useCallback((newDb: AppDatabase) => {
    StorageService.saveDatabase(newDb);
  }, []);

  // Toast notification helper
  const showToast = useCallback((title: string, message?: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Toggle bookmark
  const handleToggleBookmark = (id: string) => {
    const isNowBookmarked = StorageService.toggleBookmark(id);
    if (isNowBookmarked) {
      showToast('Peraturan Disimpan', 'Tersimpan di daftar favorit Anda.', 'success');
    } else {
      showToast('Bookmark Dihapus', 'Dihapus dari daftar favorit.', 'info');
    }
  };

  // Modal open helpers
  const handleOpenRegulationDetail = (reg: Regulation) => {
    setDetailModalState({
      isOpen: true,
      item: reg,
      type: 'regulation'
    });
  };

  const handleOpenDocumentPreview = (doc: DocumentItem) => {
    setDetailModalState({
      isOpen: true,
      item: doc,
      type: 'document'
    });
  };

  const handleOpenAnnouncementDetail = (announcement: Announcement) => {
    setDetailModalState({
      isOpen: true,
      item: announcement,
      type: 'announcement'
    });
  };

  // Tab switch
  const handleSelectTab = (tab: NavigationTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Global Keyboard Shortcuts (Cmd+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
        setDetailModalState(prev => ({ ...prev, isOpen: false }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        settings={database.settings}
        bookmarksCount={bookmarks.length}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        isAdminLoggedIn={adminSession.loggedIn}
      />

      {/* Hero Banner (Always on Beranda) */}
      {currentTab === 'beranda' && (
        <HeroSearch
          settings={database.settings}
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            if (q.trim()) {
              setIsSearchModalOpen(true);
            }
          }}
          onSelectTab={handleSelectTab}
          totalRegulations={database.regulations.length}
          totalOfficers={database.officers.filter(o => o.statusAktif).length}
          totalDocs={database.documents.length}
        />
      )}

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {currentTab === 'beranda' && (
          <HomeView
            settings={database.settings}
            regulations={database.regulations}
            officers={database.officers}
            documents={database.documents}
            announcements={database.announcements}
            services={database.services}
            slides={database.slides}
            onSelectTab={handleSelectTab}
            onOpenRegulationDetail={handleOpenRegulationDetail}
            onOpenDocumentPreview={handleOpenDocumentPreview}
            onOpenAnnouncementDetail={handleOpenAnnouncementDetail}
          />
        )}

        {currentTab === 'peraturan' && (
          <RegulationsView
            regulations={database.regulations}
            onOpenDetail={handleOpenRegulationDetail}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'pelayanan' && (
          <FlowsView
            flows={database.flows}
            hospitalName={database.settings.hospitalName}
          />
        )}

        {currentTab === 'petugas' && (
          <OfficersView
            officers={database.officers}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'pendaftaran' && (
          <RegistrationChannelsView
            channels={database.channels}
            hospitalName={database.settings.hospitalName}
          />
        )}

        {currentTab === 'informasi-peserta' && (
          <ParticipantInfoView />
        )}

        {currentTab === 'faq' && (
          <FAQView
            faqs={database.faqs}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'dokumen' && (
          <DocumentsView
            documents={database.documents}
            onOpenPreview={handleOpenDocumentPreview}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'pengumuman' && (
          <AnnouncementsView
            announcements={database.announcements}
          />
        )}

        {currentTab === 'kontak' && (
          <ContactView
            settings={database.settings}
            officers={database.officers}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'admin' && (
          <AdminDashboard
            database={database}
            onUpdateDatabase={handleUpdateDatabase}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Universal Detail Modal */}
      {detailModalState.isOpen && (
        <DetailModal
          item={detailModalState.item}
          type={detailModalState.type}
          onClose={() => setDetailModalState(prev => ({ ...prev, isOpen: false }))}
          onShowToast={showToast}
        />
      )}

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        database={database}
        onSelectTab={handleSelectTab}
        onOpenRegulationDetail={handleOpenRegulationDetail}
        onOpenDocumentPreview={handleOpenDocumentPreview}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Official Footer */}
      <Footer
        settings={database.settings}
        onSelectTab={handleSelectTab}
      />
    </div>
  );
}
