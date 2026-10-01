export type NavigationTab = 
  | 'beranda'
  | 'peraturan'
  | 'pelayanan'
  | 'petugas'
  | 'pendaftaran'
  | 'informasi-peserta'
  | 'faq'
  | 'dokumen'
  | 'pengumuman'
  | 'kontak'
  | 'admin';

export interface Regulation {
  id: string;
  judul: string;
  nomor: string;
  tahun: number;
  jenisPeraturan: 'Undang-Undang' | 'Peraturan Presiden' | 'Peraturan Menteri Kesehatan' | 'Peraturan BPJS Kesehatan' | 'Surat Edaran Direksi BPJS' | 'SOP Rumah Sakit';
  instansiPenerbit: string;
  tanggalTerbit: string;
  tanggalBerlaku: string;
  status: 'Aktif' | 'Digantikan' | 'Arsip' | 'Dalam Peninjauan';
  ringkasan: string;
  isi: string;
  dasarHukum?: string;
  fileUrl?: string;
  linkSumberResmi: string;
  catatan?: string;
  updatedAt: string;
}

export interface Officer {
  id: string;
  nama: string;
  foto: string;
  jabatan: string; // e.g. "Petugas PIPP BPJS Kesehatan RS", "Liaison Officer RS", "Verifikator BPJS"
  unit: string;
  lokasiPelayanan: string; // e.g. "Gedung A Lantai 1 - Counter BPJS Center Meja 02"
  jamPelayanan: string; // e.g. "08.00 - 15.00 WIB"
  hariPelayanan: string; // e.g. "Senin - Jumat"
  nomorKontak: string; // e.g. "+62 811-XXXX-XXXX"
  email?: string;
  jenisLayanan: string[]; // e.g. ["Pemberian Informasi", "Penanganan Keluhan", "Aktivasi Bayi Baru Lahir"]
  statusAktif: boolean;
}

export interface RegistrationChannel {
  id: string;
  namaKanal: string;
  deskripsi: string;
  jenisKanal: 'Aplikasi Mobile' | 'Anjungan Mandiri (APM)' | 'WhatsApp / Bot' | 'Call Center' | 'Loket RS';
  syarat: string[];
  langkah: string[];
  jamLayanan: string;
  lokasi?: string;
  url?: string;
  nomorKontak?: string;
  status: 'Aktif' | 'Pemeliharaan' | 'Nonaktif';
  badge?: string;
}

export interface FlowStep {
  id: string;
  alurTipe: 'rawat-jalan' | 'rawat-inap' | 'igd' | 'rujukan-balik';
  stepNumber: number;
  judul: string;
  deskripsi: string;
  lokasi: string;
  dokumen: string[];
  estimasiWaktu: string;
  tips: string;
}

export interface FAQItem {
  id: string;
  pertanyaan: string;
  jawaban: string;
  kategori: 'Kepesertaan' | 'Pendaftaran' | 'Rujukan' | 'Rawat Jalan' | 'Rawat Inap' | 'Administrasi' | 'Obat & Alkes' | 'Pengaduan';
  tags: string[];
  urutan: number;
  status: 'Publik' | 'Draft';
  helpfulCount?: number;
}

export interface DocumentItem {
  id: string;
  namaDokumen: string;
  jenisDokumen: 'SOP' | 'Formulir' | 'Brosur & Panduan' | 'Peraturan Resmi' | 'Surat Keputusan';
  nomorDokumen: string;
  tahun: number;
  kategori: string;
  ukuran: string;
  format: 'PDF' | 'DOCX' | 'XLSX' | 'PNG';
  tanggalUpload: string;
  pengunggah: string;
  fileUrl: string;
  downloadCount: number;
  status: 'Aktif' | 'Arsip';
}

export interface Announcement {
  id: string;
  judul: string;
  kategori: 'Penting' | 'Layanan' | 'Operasional' | 'Informasi Baru';
  tanggal: string;
  masaBerlaku?: string;
  ringkasan: string;
  isi: string;
  gambarUrl?: string;
  lampiranUrl?: string;
  status: 'Publik' | 'Draft' | 'Arsip';
}

export interface BannerSlide {
  id: string;
  judul: string;
  subjudul: string;
  deskripsi: string;
  foto: string;
  labelTombol: string;
  targetTab: NavigationTab;
  announcementId?: string;
  badge?: string;
  urutan: number;
  statusAktif: boolean;
}

export interface HospitalService {
  id: string;
  namaLayanan: string;
  kategori: string;
  deskripsi: string;
  syarat: string[];
  dokumen: string[];
  lokasi: string;
  catatanKhusus?: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string; // Asia/Jakarta ISO string
  userName: string;
  role: 'Super Admin' | 'Petugas BPJS RS' | 'Staf Admisi';
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'EXPORT' | 'RESTORE' | 'LOGIN';
  entity: string;
  targetId: string;
  details: string;
}

export interface HospitalSettings {
  hospitalName: string;
  hospitalSubname: string;
  hospitalAddress: string;
  bpjsDeskLocation: string;
  emergencyPhone: string;
  bpjsHotlineRS: string;
  bpjsCenterEmail: string;
  operatingHours: string;
  nationalBpjsCareCenter: string;
  pandawaNumber: string;
  gasEndpointUrl?: string; // Optional Google Apps Script URL
  activeMode: 'local' | 'gas';
}

export interface GlobalSearchResult {
  id: string;
  type: 'peraturan' | 'petugas' | 'pendaftaran' | 'faq' | 'dokumen' | 'pengumuman' | 'pelayanan';
  title: string;
  subtitle: string;
  targetTab: NavigationTab;
  category?: string;
  data: unknown;
}
