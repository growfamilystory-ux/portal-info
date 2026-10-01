import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generates unique timestamp-based ID in Asia/Jakarta timezone: BPJS-YYYYMMDD-HHMMSS-XXX
export function generateBpjsId(prefix: string = 'BPJS'): string {
  const now = new Date();
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
  const randomSuffix = Math.floor(100 + Math.random() * 900).toString();

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

