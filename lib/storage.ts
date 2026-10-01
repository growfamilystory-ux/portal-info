'use client';

import { useSyncExternalStore } from 'react';
import { 
  Regulation, 
  Officer, 
  RegistrationChannel, 
  FlowStep, 
  FAQItem, 
  DocumentItem, 
  Announcement, 
  HospitalSettings,
  HospitalService,
  ActivityLog,
  NavigationTab,
  BannerSlide
} from './types';
import { 
  initialRegulations, 
  initialOfficers, 
  initialRegistrationChannels, 
  initialFlowSteps, 
  initialFAQs, 
  initialDocuments, 
  initialAnnouncements, 
  initialServices, 
  initialSettings,
  initialSlides
} from './initialData';

const STORAGE_KEYS = {
  SETTINGS: 'bpjs_rs_settings_v1',
  REGULATIONS: 'bpjs_rs_regulations_v1',
  OFFICERS: 'bpjs_rs_officers_v1',
  CHANNELS: 'bpjs_rs_channels_v1',
  FLOWS: 'bpjs_rs_flows_v1',
  FAQS: 'bpjs_rs_faqs_v1',
  DOCUMENTS: 'bpjs_rs_documents_v1',
  ANNOUNCEMENTS: 'bpjs_rs_announcements_v1',
  SERVICES: 'bpjs_rs_services_v1',
  SLIDES: 'bpjs_rs_slides_v1',
  LOGS: 'bpjs_rs_logs_v1',
  BOOKMARKS: 'bpjs_rs_bookmarks_v1',
  RECENT: 'bpjs_rs_recent_v1',
  ADMIN_AUTH: 'bpjs_rs_admin_session_v1'
};

// Generates unique timestamp-based ID in Asia/Jakarta timezone: BPJS-YYYYMMDD-HHMMSS-XXX
export function generateBpjsId(prefix: string = 'BPJS'): string {
  const now = new Date();
  // Format in Asia/Jakarta timezone
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).formatToParts(now);

  const lookup: Record<string, string> = {};
  parts.forEach(p => {
    lookup[p.type] = p.value;
  });

  const dateStr = `${lookup.year}${lookup.month}${lookup.day}`;
  const timeStr = `${lookup.hour}${lookup.minute}${lookup.second}`;
  const randomSuffix = Math.floor(100 + Math.random() * 900).toString(); // 3 digit 001-999

  return `${prefix}-${dateStr}-${timeStr}-${randomSuffix}`;
}

export function getJakartaTimeString(): string {
  const now = new Date();
  return new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    dateStyle: 'full',
    timeStyle: 'medium'
  }).format(now) + ' WIB';
}

export function formatShortDate(dateStr: string): string {
  if (!dateStr) return '-';
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(d);
  } catch {
    return dateStr;
  }
}

export function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export interface AppDatabase {
  settings: HospitalSettings;
  regulations: Regulation[];
  officers: Officer[];
  channels: RegistrationChannel[];
  flows: FlowStep[];
  faqs: FAQItem[];
  documents: DocumentItem[];
  announcements: Announcement[];
  services: HospitalService[];
  slides: BannerSlide[];
  logs: ActivityLog[];
}

export const initialDatabaseConst: AppDatabase = {
  settings: initialSettings,
  regulations: initialRegulations,
  officers: initialOfficers,
  channels: initialRegistrationChannels,
  flows: initialFlowSteps,
  faqs: initialFAQs,
  documents: initialDocuments,
  announcements: initialAnnouncements,
  services: initialServices,
  slides: initialSlides,
  logs: []
};

const emptyArray: string[] = [];
const defaultAdminSession: { loggedIn: boolean; username: string } = { loggedIn: false, username: '' };

let dbListeners: Array<() => void> = [];
let cachedDb: AppDatabase | null = null;

let bookmarkListeners: Array<() => void> = [];
let cachedBookmarks: string[] | null = null;

let adminListeners: Array<() => void> = [];
let cachedAdminSession: { loggedIn: boolean; username: string } | null = null;

export class StorageService {
  private static isClient(): boolean {
    return typeof window !== 'undefined';
  }

  static getInitialDatabase(): AppDatabase {
    return initialDatabaseConst;
  }

  static getDatabase(): AppDatabase {
    if (!this.isClient()) {
      return this.getInitialDatabase();
    }

    try {
      const settings = JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || 'null') || initialSettings;
      const regulations = JSON.parse(localStorage.getItem(STORAGE_KEYS.REGULATIONS) || 'null') || initialRegulations;
      const officers = JSON.parse(localStorage.getItem(STORAGE_KEYS.OFFICERS) || 'null') || initialOfficers;
      const channels = JSON.parse(localStorage.getItem(STORAGE_KEYS.CHANNELS) || 'null') || initialRegistrationChannels;
      const flows = JSON.parse(localStorage.getItem(STORAGE_KEYS.FLOWS) || 'null') || initialFlowSteps;
      const faqs = JSON.parse(localStorage.getItem(STORAGE_KEYS.FAQS) || 'null') || initialFAQs;
      const documents = JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCUMENTS) || 'null') || initialDocuments;
      const announcements = JSON.parse(localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS) || 'null') || initialAnnouncements;
      const services = JSON.parse(localStorage.getItem(STORAGE_KEYS.SERVICES) || 'null') || initialServices;
      const slides = JSON.parse(localStorage.getItem(STORAGE_KEYS.SLIDES) || 'null') || initialSlides;
      const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.LOGS) || 'null') || [];

      return {
        settings,
        regulations,
        officers,
        channels,
        flows,
        faqs,
        documents,
        announcements,
        services,
        slides,
        logs
      };
    } catch (e) {
      console.error('Error loading database from localStorage', e);
      return {
        settings: initialSettings,
        regulations: initialRegulations,
        officers: initialOfficers,
        channels: initialRegistrationChannels,
        flows: initialFlowSteps,
        faqs: initialFAQs,
        documents: initialDocuments,
        announcements: initialAnnouncements,
        services: initialServices,
        slides: initialSlides,
        logs: []
      };
    }
  }

  static subscribeDatabase(callback: () => void): () => void {
    dbListeners.push(callback);
    return () => {
      dbListeners = dbListeners.filter(l => l !== callback);
    };
  }

  static getDatabaseSnapshot(): AppDatabase {
    if (!cachedDb) {
      cachedDb = StorageService.getDatabase();
    }
    return cachedDb;
  }

  static getServerDatabaseSnapshot(): AppDatabase {
    return initialDatabaseConst;
  }

  static saveDatabase(db: AppDatabase): void {
    cachedDb = db;
    if (this.isClient()) {
      try {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(db.settings));
        localStorage.setItem(STORAGE_KEYS.REGULATIONS, JSON.stringify(db.regulations));
        localStorage.setItem(STORAGE_KEYS.OFFICERS, JSON.stringify(db.officers));
        localStorage.setItem(STORAGE_KEYS.CHANNELS, JSON.stringify(db.channels));
        localStorage.setItem(STORAGE_KEYS.FLOWS, JSON.stringify(db.flows));
        localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(db.faqs));
        localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(db.documents));
        localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(db.announcements));
        localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(db.services));
        localStorage.setItem(STORAGE_KEYS.SLIDES, JSON.stringify(db.slides));
        localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(db.logs));
      } catch (e) {
        console.error('Error saving database to localStorage', e);
      }
    }
    dbListeners.forEach(l => l());
  }

  static resetToDefault(): AppDatabase {
    const db: AppDatabase = {
      ...initialDatabaseConst,
      logs: [{
        id: generateBpjsId('LOG'),
        timestamp: getJakartaTimeString(),
        userName: 'Sistem',
        role: 'Super Admin',
        action: 'RESTORE',
        entity: 'Database',
        targetId: 'ALL',
        details: 'Database dikembalikan ke konfigurasi awal bawaan rumah sakit.'
      }]
    };
    this.saveDatabase(db);
    return db;
  }

  static addLog(action: ActivityLog['action'], entity: string, targetId: string, details: string, user = 'Admin BPJS RS'): void {
    if (!this.isClient()) return;
    const db = this.getDatabase();
    const newLog: ActivityLog = {
      id: generateBpjsId('LOG'),
      timestamp: getJakartaTimeString(),
      userName: user,
      role: 'Super Admin',
      action,
      entity,
      targetId,
      details
    };
    db.logs.unshift(newLog);
    if (db.logs.length > 200) {
      db.logs = db.logs.slice(0, 200);
    }
    this.saveDatabase(db);
  }

  // Bookmarks
  static subscribeBookmarks(callback: () => void): () => void {
    bookmarkListeners.push(callback);
    return () => {
      bookmarkListeners = bookmarkListeners.filter(l => l !== callback);
    };
  }

  static getBookmarks(): string[] {
    if (!this.isClient()) return emptyArray;
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS) || '[]');
    } catch {
      return emptyArray;
    }
  }

  static getBookmarksSnapshot(): string[] {
    if (!cachedBookmarks) {
      cachedBookmarks = StorageService.getBookmarks();
    }
    return cachedBookmarks;
  }

  static getServerBookmarksSnapshot(): string[] {
    return emptyArray;
  }

  static toggleBookmark(id: string): boolean {
    if (!this.isClient()) return false;
    const list = [...this.getBookmarks()];
    const index = list.indexOf(id);
    let bookmarked = false;
    if (index >= 0) {
      list.splice(index, 1);
      bookmarked = false;
    } else {
      list.push(id);
      bookmarked = true;
    }
    cachedBookmarks = list;
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(list));
    } catch (e) {
      console.error('Error saving bookmarks', e);
    }
    bookmarkListeners.forEach(l => l());
    return bookmarked;
  }

  // Admin Session
  static subscribeAdminSession(callback: () => void): () => void {
    adminListeners.push(callback);
    return () => {
      adminListeners = adminListeners.filter(l => l !== callback);
    };
  }

  static getAdminSession(): { loggedIn: boolean; username: string } {
    if (!this.isClient()) return defaultAdminSession;
    try {
      const sess = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) || 'null');
      return sess || defaultAdminSession;
    } catch {
      return defaultAdminSession;
    }
  }

  static getAdminSessionSnapshot(): { loggedIn: boolean; username: string } {
    if (!cachedAdminSession) {
      cachedAdminSession = StorageService.getAdminSession();
    }
    return cachedAdminSession;
  }

  static getServerAdminSessionSnapshot(): { loggedIn: boolean; username: string } {
    return defaultAdminSession;
  }

  static setAdminSession(loggedIn: boolean, username: string): void {
    cachedAdminSession = { loggedIn, username };
    if (this.isClient()) {
      try {
        if (loggedIn) {
          sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, JSON.stringify({ loggedIn: true, username }));
        } else {
          sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
        }
      } catch (e) {
        console.error('Error saving admin session', e);
      }
    }
    adminListeners.forEach(l => l());
  }

  // Remote GAS execution with fallback
  static async executeGasAction(action: string, payload?: unknown): Promise<{ success: boolean; data?: unknown; message?: string }> {
    const db = this.getDatabase();
    const endpoint = db.settings.gasEndpointUrl;

    if (!endpoint || db.settings.activeMode !== 'gas') {
      return { success: false, message: 'Mode aktif adalah Local Storage' };
    }

    try {
      const url = new URL(endpoint);
      url.searchParams.set('action', action);

      let response: Response;
      if (payload) {
        response = await fetch(url.toString(), {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        response = await fetch(url.toString(), { method: 'GET', mode: 'cors' });
      }

      const resJson = await response.json();
      return resJson;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Koneksi ke Google Apps Script gagal';
      return { success: false, message };
    }
  }
}

// React hooks for hydration-safe external store consumption
export function useAppDatabase(): AppDatabase {
  return useSyncExternalStore(
    StorageService.subscribeDatabase,
    StorageService.getDatabaseSnapshot,
    StorageService.getServerDatabaseSnapshot
  );
}

export function useBookmarks(): string[] {
  return useSyncExternalStore(
    StorageService.subscribeBookmarks,
    StorageService.getBookmarksSnapshot,
    StorageService.getServerBookmarksSnapshot
  );
}

export function useAdminSession(): { loggedIn: boolean; username: string } {
  return useSyncExternalStore(
    StorageService.subscribeAdminSession,
    StorageService.getAdminSessionSnapshot,
    StorageService.getServerAdminSessionSnapshot
  );
}
