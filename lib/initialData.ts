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
  BannerSlide
} from './types';

export const initialSettings: HospitalSettings = {
  hospitalName: 'RSUD Sehat Utama',
  hospitalSubname: 'Pusat Rujukan Regional & Mitra Utama BPJS Kesehatan',
  hospitalAddress: 'Jl. Kesehatan Raya No. 45, Kebayoran, Jakarta Selatan 12130',
  bpjsDeskLocation: 'Gedung Rawat Jalan Terpadu Lantai 1, Lobby Barat (Sebelah Admisi)',
  emergencyPhone: '(021) 7890-119',
  bpjsHotlineRS: '(021) 7890-123 ext. 108 / WA: 0812-8899-7711',
  bpjsCenterEmail: 'bpjs-center@rsudsehatutama.go.id',
  operatingHours: 'Senin - Jumat: 07.30 - 15.30 WIB | Sabtu: 07.30 - 12.30 WIB | IGD 24 Jam',
  nationalBpjsCareCenter: '165 (Bebas Pulsa / Tarif Lokal)',
  pandawaNumber: '081 165 165',
  activeMode: 'local',
  gasEndpointUrl: ''
};

export const initialRegulations: Regulation[] = [
  {
    id: 'BPJS-20240508-090000-001',
    judul: 'Perubahan Ketiga atas Perpres Nomor 82 Tahun 2018 tentang Jaminan Kesehatan (Penerapan KRIS)',
    nomor: 'Perpres No. 59 Tahun 2024',
    tahun: 2024,
    jenisPeraturan: 'Peraturan Presiden',
    instansiPenerbit: 'Presiden Republik Indonesia',
    tanggalTerbit: '2024-05-08',
    tanggalBerlaku: '2024-05-08',
    status: 'Aktif',
    ringkasan: 'Mengatur penyempurnaan penyelenggaraan program Jaminan Kesehatan Nasional, termasuk penerapan Kelas Rawat Inap Standar (KRIS) 12 kriteria fasilitas tempat tidur di seluruh rumah sakit paling lambat 30 Juni 2025, pembaruan ketentuan naik kelas rawat inap, dan masa tenggang kepesertaan.',
    isi: `Pasal-pasal penting dalam Perpres 59/2024 meliputi:
1. Fasilitas ruang perawatan pada rawat inap didasarkan pada Kelas Rawat Inap Standar (KRIS) dengan 12 kriteria fisik kenyamanan pasien.
2. Peserta dapat meningkatkan perawatan yang lebih tinggi dari haknya (naik kelas) dengan membayar selisih biaya sesuai ketentuan, kecuali bagi peserta PBI dan peserta yang didaftarkan oleh Pemda pada kelas 3.
3. Penegasan hak bayi baru lahir dari peserta wajib didaftarkan paling lambat 28 hari sejak dilahirkan.
4. Rumah sakit wajib memberikan kepastian informasi ketersediaan tempat tidur secara transparan melalui sistem antrean terintegrasi.`,
    dasarHukum: 'UU No. 40 Tahun 2004 tentang SJSN, UU No. 24 Tahun 2011 tentang BPJS, UU No. 17 Tahun 2023 tentang Kesehatan',
    linkSumberResmi: 'https://peraturan.bpk.go.id/Details/288768/perpres-no-59-tahun-2024',
    catatan: 'Acuan implementasi bertahap ruang rawat inap KRIS di RSUD Sehat Utama hingga 2025/2026.',
    updatedAt: '2026-01-15'
  },
  {
    id: 'BPJS-20230109-100000-002',
    judul: 'Standar Tarif Pelayanan Kesehatan dalam Penyelenggaraan Program Jaminan Kesehatan',
    nomor: 'Permenkes No. 3 Tahun 2023',
    tahun: 2023,
    jenisPeraturan: 'Peraturan Menteri Kesehatan',
    instansiPenerbit: 'Kementerian Kesehatan Republik Indonesia',
    tanggalTerbit: '2023-01-09',
    tanggalBerlaku: '2023-01-24',
    status: 'Aktif',
    ringkasan: 'Menetapkan standar tarif INA-CBGs baru untuk rawat jalan dan rawat inap di FKRTL (Rumah Sakit), tarif Non INA-CBGs untuk obat kemoterapi, obat kronis, kantong darah, dan alat bantu kesehatan (kacamata, protesa, korset).',
    isi: `Peraturan ini menjadi rujukan resmi bagi penjaminan biaya pelayanan kesehatan di rumah sakit:
- Penyesuaian tarif klaim pelayanan medis spesialistik dan subspesialistik.
- Ketentuan pemberian obat kronis Program Rujuk Balik (PRB) di apotek rujukan untuk stabilisasi pasien pasca rawat inap/spesialis.
- Penjaminan skrining kesehatan dan penunjang diagnostik sesuai indikasi medis tanpa pungutan biaya tambahan.
- Larangan membebankan biaya obat, reagen lab, atau bahan medis habis pakai kepada pasien BPJS selama sesuai indikasi klinis.`,
    dasarHukum: 'UU No. 24 Tahun 2011, Perpres No. 82 Tahun 2018',
    linkSumberResmi: 'https://peraturan.bpk.go.id/Details/240182/permenkes-no-3-tahun-2023',
    catatan: 'Dasar hukum larangan iur biaya bagi pasien rawat jalan poli dan rawat inap sesuai hak kelas.',
    updatedAt: '2025-11-20'
  },
  {
    id: 'BPJS-20200814-113000-003',
    judul: 'Tata Cara Pengajuan dan Pembayaran Klaim Pelayanan Kesehatan BPJS Kesehatan',
    nomor: 'Peraturan BPJS Kesehatan No. 2 Tahun 2020',
    tahun: 2020,
    jenisPeraturan: 'Peraturan BPJS Kesehatan',
    instansiPenerbit: 'Direksi BPJS Kesehatan',
    tanggalTerbit: '2020-08-14',
    tanggalBerlaku: '2020-08-14',
    status: 'Aktif',
    ringkasan: 'Mengatur tata kelola verifikasi klaim digital, penyelesaian administrasi klaim rumah sakit, penanganan sengketa klaim medis, serta kepastian hak pasien untuk memperoleh pelayanan tanpa hambatan administratif.',
    isi: `Poin layanan pasien:
- Pasien tidak boleh dibebani berkas fotokopi berulang; rumah sakit diinstruksikan memanfaatkan digitalisasi SEP (Surat Eligibilitas Peserta).
- Sistem finger print / face recognition menjadi verifikasi keabsahan peserta sebelum penerbitan SEP rawat jalan.
- Kejelasan mekanisme penyelesaian selisih administrasi bagi pasien yang memilih naik kelas perawatan secara sukarela.`,
    dasarHukum: 'Perpres 82 Tahun 2018, Permenkes 28 Tahun 2014',
    linkSumberResmi: 'https://bpjs-kesehatan.go.id/peraturan',
    catatan: 'Landasan sistem verifikasi biometrik fingerprint di Loket Admisi RS.',
    updatedAt: '2025-08-10'
  },
  {
    id: 'BPJS-20180918-081500-004',
    judul: 'Jaminan Kesehatan Nasional (Regulasi Induk Pelayanan JKN)',
    nomor: 'Perpres No. 82 Tahun 2018',
    tahun: 2018,
    jenisPeraturan: 'Peraturan Presiden',
    instansiPenerbit: 'Presiden Republik Indonesia',
    tanggalTerbit: '2018-09-18',
    tanggalBerlaku: '2018-09-18',
    status: 'Aktif',
    ringkasan: 'Peraturan Presiden komprehensif mengenai kepesertaan, iuran, manfaat jaminan kesehatan yang dijamin dan tidak dijamin, pelayanan rujukan berjenjang, dan tata cara pelayanan gawat darurat.',
    isi: `Ketentuan pelayanan gawat darurat (Pasal 63):
1. Pelayanan gawat darurat dapat diakses di faskes manapun (baik bekerja sama maupun tidak bekerja sama dengan BPJS Kesehatan) tanpa memerlukan surat rujukan dari FKTP.
2. Kondisi gawat darurat ditentukan oleh dokter penanggung jawab sesuai kriteria medis (mengancam nyawa, membahayakan diri/lingkungan, memerlukan penanganan segera).
3. Biaya ditanggung BPJS sesuai ketentuan sampai kondisi pasien stabil untuk dirujuk atau rawat inap.`,
    dasarHukum: 'UU 40/2004, UU 24/2011',
    linkSumberResmi: 'https://peraturan.bpk.go.id/Details/95315/perpres-no-82-tahun-2018',
    catatan: 'Regulasi utama yang diamandemen oleh Perpres 59/2024.',
    updatedAt: '2024-06-01'
  },
  {
    id: 'BPJS-20140410-140000-005',
    judul: 'Pedoman Pelaksanaan Program Jaminan Kesehatan Nasional',
    nomor: 'Permenkes No. 28 Tahun 2014',
    tahun: 2014,
    jenisPeraturan: 'Peraturan Menteri Kesehatan',
    instansiPenerbit: 'Kementerian Kesehatan Republik Indonesia',
    tanggalTerbit: '2014-04-10',
    tanggalBerlaku: '2014-04-10',
    status: 'Aktif',
    ringkasan: 'Pedoman operasional penyelenggaraan JKN di fasilitas kesehatan, standar rujukan berjenjang horizontal dan vertikal, serta hak pasien atas informasi medis dan obat esensial.',
    isi: `Ketentuan rujukan:
- Sistem rujukan berjenjang dari FKTP (Puskesmas/Klinik Pratama) ke FKRTL (RS Tipe C/B/A).
- Masa berlaku surat rujukan berlaku selama 90 hari sejak tanggal diterbitkan untuk kasus kronis yang memerlukan kontrol berkala.
- Rujukan dapat diperpanjang di rumah sakit melalui Surat Kontrol DPJP (Dokter Penanggung Jawab Pasien).`,
    dasarHukum: 'UU No. 24 Tahun 2011',
    linkSumberResmi: 'https://peraturan.bpk.go.id/Details/116480/permenkes-no-28-tahun-2014',
    catatan: 'Pedoman alur rujukan 90 hari dan surat kontrol rumah sakit.',
    updatedAt: '2024-01-20'
  },
  {
    id: 'BPJS-20111125-080000-006',
    judul: 'Badan Penyelenggara Jaminan Sosial (Dasar Hukum Pembentukan BPJS Kesehatan)',
    nomor: 'Undang-Undang No. 24 Tahun 2011',
    tahun: 2011,
    jenisPeraturan: 'Undang-Undang',
    instansiPenerbit: 'Dewan Perwakilan Rakyat & Presiden RI',
    tanggalTerbit: '2011-11-25',
    tanggalBerlaku: '2014-01-01',
    status: 'Aktif',
    ringkasan: 'Undang-Undang pembentukan BPJS Kesehatan dan BPJS Ketenagakerjaan sebagai badan hukum publik independen yang bertanggung jawab langsung kepada Presiden untuk menyelenggarakan jaminan kesehatan bagi seluruh rakyat Indonesia.',
    isi: `Tujuan dan asas:
- Berlandaskan asas kemanusiaan, manfaat, dan keadilan sosial bagi seluruh rakyat Indonesia.
- Wajib diikuti oleh seluruh penduduk Indonesia untuk perlindungan kesehatan dasar yang komprehensif.`,
    dasarHukum: 'Pasal 20, 28H, dan 34 UUD 1945',
    linkSumberResmi: 'https://peraturan.bpk.go.id/Details/39207/uu-no-24-tahun-2011',
    catatan: 'Undang-Undang pembentukan program BPJS Kesehatan di Indonesia.',
    updatedAt: '2023-10-01'
  }
];

export const initialOfficers: Officer[] = [
  {
    id: 'BPJS-20261001-080100-001',
    nama: 'Rahmat Hidayat, S.K.M.',
    foto: 'https://picsum.photos/seed/officer1/300/300',
    jabatan: 'Koordinator PIPP BPJS Kesehatan (RS Liaison)',
    unit: 'Unit Penanganan Informasi dan Pengaduan Peserta (PIPP) BPJS Center',
    lokasiPelayanan: 'Gedung Rawat Jalan Lt. 1, Meja Layanan BPJS Center 01',
    jamPelayanan: '07.30 - 15.30 WIB',
    hariPelayanan: 'Senin - Jumat',
    nomorKontak: '0812-8899-7711',
    email: 'rahmat.hidayat@bpjs-kesehatan.go.id',
    jenisLayanan: [
      'Pemberian Informasi Resmi BPJS',
      'Penanganan Pengaduan Layanan RS',
      'Verifikasi Status Kepesertaan Non-Aktif',
      'Pendampingan Pasien Khusus & Rujukan Sulit'
    ],
    statusAktif: true
  },
  {
    id: 'BPJS-20261001-080200-002',
    nama: 'dr. Siti Nurhaliza',
    foto: 'https://picsum.photos/seed/officer2/300/300',
    jabatan: 'Dokter Pengendali Mutu & Biaya (KMPK RS)',
    unit: 'Tim Komite Mutu Pelayanan Kesehatan BPJS RS',
    lokasiPelayanan: 'Ruang Komite Medik Lt. 3 / Meja Konsultasi BPJS Center Meja 03',
    jamPelayanan: '09.00 - 14.00 WIB',
    hariPelayanan: 'Senin - Kamis',
    nomorKontak: '0813-7766-5544',
    email: 'siti.nurhaliza@rsudsehatutama.go.id',
    jenisLayanan: [
      'Konsultasi Kesesuaian Obat Formularium Nasional',
      'Persetujuan Prosedur Khusus / High Cost Care',
      'Audit Klinis Penjaminan BPJS',
      'Klarifikasi Medis Rawat Inap'
    ],
    statusAktif: true
  },
  {
    id: 'BPJS-20261001-080300-003',
    nama: 'Dewi Anggraini, A.Md.RMIK',
    foto: 'https://picsum.photos/seed/officer3/300/300',
    jabatan: 'Staf Administrasi & Verifikasi SEP Rawat Inap',
    unit: 'Sub-Bagian Admisi & Penjaminan Pasien',
    lokasiPelayanan: 'Gedung Rawat Inap Terpadu Lt. Dasar (Admisi Sentral)',
    jamPelayanan: '08.00 - 16.00 WIB (Shift 1) & 14.00 - 21.00 WIB (Shift 2)',
    hariPelayanan: 'Senin - Sabtu',
    nomorKontak: '0815-4433-2211',
    email: 'admisi.bpjs@rsudsehatutama.go.id',
    jenisLayanan: [
      'Penerbitan & Legalisir SEP Rawat Inap 3x24 Jam',
      'Pengurusan Bayi Baru Lahir Pasien BPJS',
      'Edukasi Biaya Selisih Naik Kelas Rawat',
      'Pemberkasan Jasa Raharja Pasien Laka Lantas'
    ],
    statusAktif: true
  },
  {
    id: 'BPJS-20261001-080400-004',
    nama: 'Bambang Kusuma, S.Kom',
    foto: 'https://picsum.photos/seed/officer4/300/300',
    jabatan: 'Petugas Helpdesk Mobile JKN & APM Mandiri',
    unit: 'Unit Layanan Mandiri Digital Pasien',
    lokasiPelayanan: 'Area Mesin Anjungan Mandiri (Lobby Poliklinik Lt. 1)',
    jamPelayanan: '07.00 - 14.00 WIB',
    hariPelayanan: 'Senin - Sabtu',
    nomorKontak: '0819-3322-1100',
    email: 'helpdesk.jkn@rsudsehatutama.go.id',
    jenisLayanan: [
      'Bimbingan Check-In Antrean Mobile JKN',
      'Aktivasi & Reset Akun Mobile JKN',
      'Bantuan Mesin Fingerprint & Face Recognition',
      'Pencetakan Bukti Pendaftaran Poliklinik'
    ],
    statusAktif: true
  }
];

export const initialRegistrationChannels: RegistrationChannel[] = [
  {
    id: 'BPJS-20261001-081000-001',
    namaKanal: 'Aplikasi Mobile JKN (Resmi BPJS Kesehatan)',
    deskripsi: 'Kanal pendaftaran antrean faskes secara online dari rumah. Pasien dapat memilih dokter spesialis, jadwal kedatangan, dan mengambil nomor antrean H-1 hingga 14 hari sebelumnya.',
    jenisKanal: 'Aplikasi Mobile',
    syarat: [
      'Nomor Kartu BPJS / NIK e-KTP aktif',
      'Surat Rujukan dari Puskesmas/Klinik FKTP atau Surat Kontrol RS yang masih berlaku',
      'Smartphone terhubung internet & unduh aplikasi Mobile JKN di Play Store / App Store'
    ],
    langkah: [
      'Buka Aplikasi Mobile JKN lalu masuk dengan NIK/No. Kartu dan password',
      'Pilih menu "Pendaftaran Pelayanan (Antrean)" lalu klik tab "Faskes Rujukan Tingkat Lanjut (FKRTL)"',
      'Pilih RSUD Sehat Utama, poli tujuan spesialis, nama dokter, dan tanggal kunjungan',
      'Sistem akan menerbitkan Kode Booking Antrean',
      'Saat hari H, datang 30-45 menit sebelum jadwal, lakukan Check-In di mesin APM atau via radius GPS di aplikasi Mobile JKN'
    ],
    jamLayanan: 'Online 24 Jam (Pendaftaran antrean dibuka mulai pukul 06.00 WIB H-7)',
    url: 'https://play.google.com/store/apps/details?id=app.bpjs.mobile',
    nomorKontak: 'Care Center 165',
    status: 'Aktif',
    badge: 'Paling Direkomendasikan'
  },
  {
    id: 'BPJS-20261001-081100-002',
    namaKanal: 'Anjungan Pendaftaran Mandiri (APM) Rumah Sakit',
    deskripsi: 'Mesin kios digital di lobi poliklinik rumah sakit untuk check-in mandiri dan cetak SEP langsung tanpa perlu mengantre lama di loket pendaftaran konvensional.',
    jenisKanal: 'Anjungan Mandiri (APM)',
    syarat: [
      'Kartu BPJS fisik / digital di HP atau e-KTP asli',
      'Surat Kontrol RS atau Rujukan FKTP online terdaftar di PCare / VClaim',
      'Pasien telah melakukan perekaman sidik jari (fingerprint) pertama kali'
    ],
    langkah: [
      'Sentuh layar mesin APM RSUD Sehat Utama',
      'Pindai barcode pada e-KTP atau masukkan nomor rujukan / kode booking Mobile JKN',
      'Lakukan verifikasi sidik jari (fingerprint) pada sensor mesin',
      'Pilih poli tujuan dan dokter sesuai jadwal',
      'Mesin otomatis mencetak Surat Eligibilitas Peserta (SEP) dan tiket nomor antrean poli',
      'Langsung menuju ruang tunggu poli spesialis yang tertera di tiket'
    ],
    jamLayanan: 'Senin - Jumat: 06.30 - 13.00 WIB | Sabtu: 06.30 - 11.30 WIB',
    lokasi: 'Lobby Gedung Rawat Jalan Lt. 1 (Tersedia 6 unit mesin)',
    nomorKontak: 'Petugas Duta APM di Area Kios',
    status: 'Aktif',
    badge: 'Cepat & Mandiri di RS'
  },
  {
    id: 'BPJS-20261001-081200-003',
    namaKanal: 'PANDAWA - Pelayanan Administrasi Melalui WhatsApp BPJS',
    deskripsi: 'Layanan administrasi resmi BPJS Kesehatan berbasis pesan instan WhatsApp terpusat nasional untuk perubahan data, pengaktifan kepesertaan, pendaftaran bayi baru lahir, dan informasi status iuran tanpa perlu ke kantor cabang.',
    jenisKanal: 'WhatsApp / Bot',
    syarat: [
      'Nomor WhatsApp aktif',
      'Foto e-KTP dan Kartu Keluarga (KK)',
      'Dokumen pendukung sesuai urusan (Surat Keterangan Lahir untuk bayi, Buku Rekening jika ubah faskes)'
    ],
    langkah: [
      'Kirim pesan sapaan "Halo" ke nomor resmi 0811-8-165-165 (pastikan centang hijau resmi BPJS)',
      'Pilih menu administrasi yang dibutuhkan dari balasan otomatis',
      'Klik link formulir aman yang dikirimkan oleh asisten virtual Chika/Pandawa',
      'Isi data identitas dan unggah foto dokumen yang dipersyaratkan',
      'Petugas verifikator BPJS akan memproses maksimal 1x24 jam kerja'
    ],
    jamLayanan: 'Senin - Jumat: 08.00 - 15.00 WIB (Layanan petugas interaktif)',
    url: 'https://wa.me/628118165165',
    nomorKontak: '0811-8-165-165',
    status: 'Aktif'
  },
  {
    id: 'BPJS-20261001-081300-004',
    namaKanal: 'Loket Pendaftaran Konvensional BPJS Center RS',
    deskripsi: 'Loket tatap muka langsung bagi pasien khusus, pasien baru yang belum pernah berobat di RSUD Sehat Utama, pasien dengan kendala biometrik fingerprint, pasien lansia, disabilitas, atau rujukan luar kota.',
    jenisKanal: 'Loket RS',
    syarat: [
      'e-KTP / Kartu Identitas Anak (KIA) asli dan fotokopi',
      'Kartu BPJS Kesehatan asli / digital',
      'Surat Rujukan FKTP asli / Surat Kontrol RS yang sah',
      'Kartu Berobat RSUD Sehat Utama (bagi pasien lama)'
    ],
    langkah: [
      'Ambil tiket antrean pendaftaran konvensional di mesin antrean utama',
      'Menunggu panggilan di loket 1 - 5 BPJS Center',
      'Serahkan berkas identitas dan surat rujukan kepada petugas admisi',
      'Petugas melakukan verifikasi di sistem V-Claim BPJS dan menerbitkan SEP',
      'Menerima SEP dan menuju ruang perawat di poliklinik yang dituju'
    ],
    jamLayanan: 'Senin - Jumat: 07.00 - 14.00 WIB | Sabtu: 07.00 - 11.30 WIB',
    nomorKontak: '(021) 7890-123 ext. 101',
    status: 'Aktif'
  }
];

export const initialFlowSteps: FlowStep[] = [
  {
    id: 'BPJS-20261001-082000-001',
    alurTipe: 'rawat-jalan',
    stepNumber: 1,
    judul: 'Persiapan & Pendaftaran Antrean Online',
    deskripsi: 'Sebelum datang ke rumah sakit, pastikan memiliki surat rujukan aktif dari Faskes Tingkat Pertama (Puskesmas/Klinik Pratama) atau Surat Kontrol dari dokter RS. Ambil nomor antrean melalui aplikasi Mobile JKN.',
    lokasi: 'Dari Rumah / Gadget Pribadi',
    dokumen: ['Rujukan FKTP Online / Surat Kontrol RS', 'Kartu BPJS Kesehatan / e-KTP'],
    estimasiWaktu: '3 - 5 Menit di Aplikasi',
    tips: 'Daftar H-1 hingga H-7 untuk mendapatkan kuota dokter yang diinginkan.'
  },
  {
    id: 'BPJS-20261001-082000-002',
    alurTipe: 'rawat-jalan',
    stepNumber: 2,
    judul: 'Check-In & Perekaman Biometrik (Fingerprint)',
    deskripsi: 'Tiba di rumah sakit 30 menit sebelum jam praktek. Lakukan check-in pada mesin Anjungan Pendaftaran Mandiri (APM) di lobby dengan scan e-KTP dan verifikasi sidik jari/face recognition.',
    lokasi: 'Lobby Gedung Rawat Jalan Lt. 1 (Mesin APM)',
    dokumen: ['e-KTP Asli', 'Bukti Booking Mobile JKN'],
    estimasiWaktu: '2 - 5 Menit',
    tips: 'Jika sidik jari tidak terbaca lebih dari 3x, petugas Duta APM akan membantu aktivasi manual di Meja PIPP.'
  },
  {
    id: 'BPJS-20261001-082000-003',
    alurTipe: 'rawat-jalan',
    stepNumber: 3,
    judul: 'Penerbitan SEP (Surat Eligibilitas Peserta)',
    deskripsi: 'Mesin APM mencetak dokumen SEP dan bukti antrean poli secara otomatis. Tidak perlu fotokopi berkas apapun jika data rujukan telah sinkron.',
    lokasi: 'Mesin APM / Loket BPJS Center (untuk kasus khusus)',
    dokumen: ['SEP tercetak dari mesin'],
    estimasiWaktu: '1 Menit',
    tips: 'Simpan lembar SEP untuk diserahkan ke perawat di ruang poliklinik.'
  },
  {
    id: 'BPJS-20261001-082000-004',
    alurTipe: 'rawat-jalan',
    stepNumber: 4,
    judul: 'Pemeriksaan Tanda Vital & Konsultasi Dokter Spesialis',
    deskripsi: 'Menunggu di ruang tunggu poliklinik spesialis. Perawat melakukan anamnesa dan tensi darah. Dokter spesialis melakukan pemeriksaan medis diagnostik.',
    lokasi: 'Poliklinik Spesialis (Gedung B Lt. 1 - Lt. 3)',
    dokumen: ['SEP', 'Buku Rekam Medis / Identitas Pasien'],
    estimasiWaktu: '15 - 45 Menit (Sesuai nomor urut)',
    tips: 'Jelaskan riwayat penyakit dan alergi obat secara terbuka kepada dokter.'
  },
  {
    id: 'BPJS-20261001-082000-005',
    alurTipe: 'rawat-jalan',
    stepNumber: 5,
    judul: 'Pemeriksaan Penunjang (Laboratorium / Radiologi / EKG)',
    deskripsi: 'Bila dokter memberikan rujukan internal untuk tes penunjang medis (tes darah, rontgen, USG, CT Scan), lakukan pemeriksaan di instalasi terkait tanpa biaya tambahan.',
    lokasi: 'Instalasi Laboratorium Lt. 1 / Radiologi Lt. Basement',
    dokumen: ['Form Pengantar Penunjang dari Dokter', 'Lembar SEP'],
    estimasiWaktu: '30 - 90 Menit tergantung jenis tes',
    tips: 'Hasil tes penunjang otomatis terkirim secara elektronik ke komputer poli dokter.'
  },
  {
    id: 'BPJS-20261001-082000-006',
    alurTipe: 'rawat-jalan',
    stepNumber: 6,
    judul: 'Pengambilan Obat di Farmasi & Surat Kontrol Ulang',
    deskripsi: 'Jika dokter meresepkan obat, serahkan resep ke Farmasi Rawat Jalan BPJS. Jika memerlukan kontrol berikutnya, mintalah Surat Kontrol DPJP atau Surat Rujuk Balik (PRB) ke Puskesmas.',
    lokasi: 'Depo Farmasi BPJS Lantai 1',
    dokumen: ['Resep Elektronik / Manual Dokter', 'Lembar SEP'],
    estimasiWaktu: '15 - 30 Menit (Racikan: 45 Menit)',
    tips: 'Pastikan menerima penjelasan aturan pakai obat dari apoteker sebelum meninggalkan rumah sakit.'
  },
  // Rawat Inap steps
  {
    id: 'BPJS-20261001-082100-001',
    alurTipe: 'rawat-inap',
    stepNumber: 1,
    judul: 'Surat Pengantar Rawat Inap (SPRI)',
    deskripsi: 'Diterbitkan oleh dokter spesialis poliklinik atau dokter jaga IGD yang menyatakan indikasi medis wajib rawat inap.',
    lokasi: 'Poliklinik / IGD',
    dokumen: ['Surat Rekomendasi Rawat / SPRI Dokter'],
    estimasiWaktu: 'Langsung dari dokter',
    tips: 'Pastikan kelas rawat sesuai dengan hak kelas kepesertaan BPJS Anda.'
  },
  {
    id: 'BPJS-20261001-082100-002',
    alurTipe: 'rawat-inap',
    stepNumber: 2,
    judul: 'Pendaftaran & Verifikasi Kamar di Admisi Rawat Inap',
    deskripsi: 'Keluarga pasien menuju loket Admisi Sentral untuk validasi kepesertaan, pemilihan kamar rawat sesuai hak kelas BPJS (atau KRIS), serta penandatanganan General Consent.',
    lokasi: 'Loket Admisi Rawat Inap Lt. Dasar',
    dokumen: ['SPRI Dokter', 'Kartu BPJS Pasien', 'KTP Pasien & Penanggung Jawab', 'Kartu Keluarga'],
    estimasiWaktu: '15 - 25 Menit',
    tips: 'Pengurusan SEP Rawat Inap wajib diselesaikan dalam 3 x 24 jam hari kerja.'
  },
  {
    id: 'BPJS-20261001-082100-003',
    alurTipe: 'rawat-inap',
    stepNumber: 3,
    judul: 'Transfer ke Ruang Perawatan & Pelayanan Medis',
    deskripsi: 'Pasien diantar perawat ke bangsal rawat inap. Seluruh tindakan medis, visit dokter spesialis, makanan diet gizi, obat-obatan, dan alkes ditanggung penuh oleh BPJS.',
    lokasi: 'Bangsal Rawat Inap Gedung C',
    dokumen: ['Gelang Pasien', 'Berkas Rekam Medis Rawat Inap'],
    estimasiWaktu: 'Sesuai masa perawatan klinis',
    tips: 'Tidak ada biaya tambahan untuk obat atau visite selama sesuai formularium dan hak kelas.'
  },
  {
    id: 'BPJS-20261001-082100-004',
    alurTipe: 'rawat-inap',
    stepNumber: 4,
    judul: 'Penyelesaian Administrasi Kepulangan Pasien',
    deskripsi: 'Saat dokter mengizinkan pulang, keluarga menyelesaikan administrasi di loket kasir penjaminan BPJS untuk verifikasi penutupan berkas klaim dan pengambilan resume medis serta obat pulang.',
    lokasi: 'Kasir & Farmasi Rawat Inap Lt. 1',
    dokumen: ['Surat Izin Pulang Dokter', 'SEP Rawat Inap'],
    estimasiWaktu: '30 - 60 Menit',
    tips: 'Mintalah Surat Kontrol Pasca Rawat Inap sebelum meninggalkan ruang farmasi.'
  },
  // IGD steps
  {
    id: 'BPJS-20261001-082200-001',
    alurTipe: 'igd',
    stepNumber: 1,
    judul: 'Triase & Penanganan Kegawatdaruratan Segera',
    deskripsi: 'Pasien langsung masuk ke Instalasi Gawat Darurat (IGD) tanpa memerlukan surat rujukan FKTP. Dokter IGD segera melakukan triase (Merah/Kuning) dan tindakan stabilisasi nyawa.',
    lokasi: 'Instalasi Gawat Darurat (IGD) - Akses 24 Jam',
    dokumen: ['Penanganan medis didahulukan tanpa syarat berkas di awal'],
    estimasiWaktu: 'Segera (< 5 Menit Triase)',
    tips: 'Keselamatan pasien adalah prioritas mutlak; administrasi dapat diurus setelah pasien stabil.'
  },
  {
    id: 'BPJS-20261001-082200-002',
    alurTipe: 'igd',
    stepNumber: 2,
    judul: 'Pendaftaran SEP Gawat Darurat 3 x 24 Jam',
    deskripsi: 'Keluarga pasien mendaftarkan kepesertaan BPJS di loket Admisi IGD maksimal 3 x 24 jam kerja sejak pasien masuk atau sebelum pasien diperbolehkan pulang.',
    lokasi: 'Admisi 24 Jam IGD',
    dokumen: ['Kartu BPJS / NIK e-KTP Pasien', 'Identitas Keluarga'],
    estimasiWaktu: '10 Menit',
    tips: 'Untuk kasus kecelakaan lalu lintas, sertakan Laporan Polisi (LP) untuk penjaminan Jasa Raharja sebagai penjamin pertama.'
  },
  {
    id: 'BPJS-20261001-082200-003',
    alurTipe: 'igd',
    stepNumber: 3,
    judul: 'Keputusan Tindak Lanjut Medis (Pulang / Rawat Inap / Operasi Cito)',
    deskripsi: 'Dokter memutuskan apakah pasien cukup rawat jalan, harus segera masuk ICU/kamar rawat inap, atau tindakan operasi darurat cito.',
    lokasi: 'Ruang Observasi IGD / Kamar Operasi Cito',
    dokumen: ['Resume Medis IGD', 'Lembar Persetujuan Tindakan'],
    estimasiWaktu: 'Masa Observasi Maksimal 6 - 8 Jam',
    tips: 'Bila kondisi dinilai bukan kegawatdaruratan medis, pasien akan diedukasi untuk berobat ke Puskesmas/Klinik FKTP pada jam kerja.'
  }
];

export const initialFAQs: FAQItem[] = [
  {
    id: 'BPJS-20261001-083000-001',
    pertanyaan: 'Apakah saya bisa langsung berobat ke rumah sakit dengan BPJS tanpa surat rujukan?',
    jawaban: 'Tidak bisa untuk pengobatan rawat jalan biasa. BPJS menganut sistem rujukan berjenjang; pasien wajib berobat ke Fasilitas Kesehatan Tingkat Pertama (FKTP) seperti Puskesmas atau Klinik Pratama tempat terdaftar terlebih dahulu. Rujukan ke rumah sakit hanya diberikan apabila dokter FKTP menilai pasien membutuhkan penanganan dokter spesialis atau sarana penunjang tingkat lanjut. Pengecualian: Khusus kondisi GAWAT DARURAT (emergency) yang mengancam nyawa, pasien DAPAT LANGSUNG ke IGD rumah sakit manapun tanpa surat rujukan.',
    kategori: 'Rujukan',
    tags: ['rujukan', 'fktp', 'igd', 'darurat'],
    urutan: 1,
    status: 'Publik',
    helpfulCount: 342
  },
  {
    id: 'BPJS-20261001-083000-002',
    pertanyaan: 'Berapa lama masa berlaku surat rujukan dari FKTP/Puskesmas ke rumah sakit?',
    jawaban: 'Masa berlaku Surat Rujukan dari FKTP berlaku selama 90 hari (3 bulan) sejak tanggal rujukan diterbitkan. Selama masa 90 hari tersebut, jika Anda memerlukan kontrol ulang di rumah sakit pada poli spesialis yang sama, Anda cukup menggunakan Surat Kontrol yang diterbitkan oleh dokter penanggung jawab pasien (DPJP) RS tanpa perlu bolak-balik meminta rujukan baru ke Puskesmas.',
    kategori: 'Rujukan',
    tags: ['masa berlaku', 'surat kontrol', '90 hari'],
    urutan: 2,
    status: 'Publik',
    helpfulCount: 285
  },
  {
    id: 'BPJS-20261001-083000-003',
    pertanyaan: 'Apa yang harus dilakukan jika kartu BPJS Kesehatan berstatus tidak aktif atau menunggak saat di rumah sakit?',
    jawaban: 'Segera lakukan pelunasan tunggakan iuran melalui kanal pembayaran (Mobile Banking, Indomaret/Alfamart, Tokopedia, dll). Setelah pembayaran berhasil, kepesertaan otomatis aktif kembali dalam waktu beberapa menit. Jika terdapat kendala finansial untuk tunggakan di atas 12 bulan, peserta Mandiri dapat mengikuti program REHAB (Rencana Pembayaran Bertahap) via Mobile JKN. Silakan konsultasikan kendala Anda langsung ke Meja PIPP BPJS Center di Lobby Lantai 1 RSUD Sehat Utama.',
    kategori: 'Kepesertaan',
    tags: ['status aktif', 'tunggakan', 'rehab', 'pipp'],
    urutan: 3,
    status: 'Publik',
    helpfulCount: 198
  },
  {
    id: 'BPJS-20261001-083000-004',
    pertanyaan: 'Apakah pasien BPJS yang dirawat inap boleh naik kelas kamar perawatan?',
    jawaban: 'Sesuai ketentuan Perpres No. 59 Tahun 2024 dan regulasi BPJS: Peserta BPJS diperbolehkan meningkatkan kelas perawatan (naik kelas) dengan membayar selisih biaya antara tarif kamar/INA-CBGs yang dituju dengan hak kelasnya. Namun ketentuan ini HANYA berlaku untuk peserta BPJS Mandiri (PBPU) dan Pekerja Penerima Upah (PPU). Peserta PBI (Penerima Bantuan Iuran) dan peserta Jamkesda/KP Kelas 3 TIDAK diperkenankan naik kelas secara mandiri demi kepastian pembebasan biaya total.',
    kategori: 'Rawat Inap',
    tags: ['naik kelas', 'kris', 'selisih biaya', 'pbi'],
    urutan: 4,
    status: 'Publik',
    helpfulCount: 220
  },
  {
    id: 'BPJS-20261001-083000-005',
    pertanyaan: 'Bagaimana cara mendaftarkan bayi baru lahir agar langsung dijamin BPJS Kesehatan?',
    jawaban: 'Bayi baru lahir dari ibu peserta BPJS wajib didaftarkan paling lambat 28 hari sejak dilahirkan. Bawa berkas berikut ke Meja PIPP / Loket Admisi RS: 1) Surat Keterangan Kelahiran dari RS/Bidan, 2) Kartu BPJS dan KTP Ibu, 3) Kartu Keluarga. Bayi baru lahir dari peserta segmen PBI otomatis didaftarkan dan dijamin penuh sejak hari kelahirannya.',
    kategori: 'Pendaftaran',
    tags: ['bayi baru lahir', 'bbl', 'administrasi', 'pbi'],
    urutan: 5,
    status: 'Publik',
    helpfulCount: 174
  },
  {
    id: 'BPJS-20261001-083000-006',
    pertanyaan: 'Apakah semua jenis obat dan pemeriksaan di rumah sakit gratis untuk peserta BPJS?',
    jawaban: 'Ya, seluruh pemeriksaan laboratorium, radiologi (Rontgen, USG, CT-Scan, MRI), tindakan operasi, dan obat-obatan GRATIS (tidak ada iur biaya tambahan) sepanjang diberikan atas INDIKASI MEDIS oleh dokter spesialis dan tercantum dalam Formularium Nasional (Fornas) serta Formularium Rumah Sakit. Pasien tidak diperbolehkan diminta membeli obat atau alat medis di luar rumah sakit secara mandiri.',
    kategori: 'Obat & Alkes',
    tags: ['obat gratis', 'fornas', 'tidak ada iur biaya', 'ct scan'],
    urutan: 6,
    status: 'Publik',
    helpfulCount: 410
  },
  {
    id: 'BPJS-20261001-083000-007',
    pertanyaan: 'Apakah korban kecelakaan lalu lintas ditanggung oleh BPJS Kesehatan?',
    jawaban: 'Untuk kecelakaan lalu lintas ganda (melibatkan 2 kendaraan atau lebih / kendaraan dengan pejalan kaki), penjamin UTAMA adalah PT Jasa Raharja (maksimal plafon hingga Rp20.000.000). Jika biaya melebihi plafon Jasa Raharja, selisih biaya akan dijamin oleh BPJS Kesehatan sebagai penjamin kedua dengan syarat melampirkan Laporan Polisi (LP). Untuk kecelakaan tunggal, dapat langsung dijamin BPJS Kesehatan setelah melampirkan Laporan Polisi.',
    kategori: 'Administrasi',
    tags: ['kecelakaan', 'laka lantas', 'jasa raharja', 'laporan polisi'],
    urutan: 7,
    status: 'Publik',
    helpfulCount: 153
  },
  {
    id: 'BPJS-20261001-083000-008',
    pertanyaan: 'Ke mana saya harus melapor jika mengalami perlakuan diskriminasi atau diminta iur biaya tidak wajar?',
    jawaban: 'Anda dapat segera melapor ke: 1) Petugas PIPP BPJS Center RSUD Sehat Utama di Lobby Lantai 1 Meja 01, 2) Menghubungi hotline resmi BPJS RS di 0812-8899-7711, 3) Call Center BPJS 165, atau 4) Menu "Pengaduan Layanan" di Aplikasi Mobile JKN. RSUD Sehat Utama berkomitmen memberikan layanan yang adil tanpa diskriminasi sesuai Pakta Integritas Fasilitas Kesehatan.',
    kategori: 'Pengaduan',
    tags: ['lapor', 'pengaduan', 'diskriminasi', 'hotline', 'pipp'],
    urutan: 8,
    status: 'Publik',
    helpfulCount: 265
  }
];

export const initialDocuments: DocumentItem[] = [
  {
    id: 'BPJS-20261001-084000-001',
    namaDokumen: 'SOP Alur Pelayanan Pasien BPJS Kesehatan Rawat Jalan & Inap RSUD',
    jenisDokumen: 'SOP',
    nomorDokumen: 'SOP/MED-BPJS/2025/012',
    tahun: 2025,
    kategori: 'Standar Operasional Prosedur',
    ukuran: '2.4 MB',
    format: 'PDF',
    tanggalUpload: '2025-10-15',
    pengunggah: 'Bagian Mutu & Akreditasi RS',
    fileUrl: 'https://raw.githubusercontent.com/bpjs-rs/docs/main/sop-alur-layanan.pdf',
    downloadCount: 1420,
    status: 'Aktif'
  },
  {
    id: 'BPJS-20261001-084100-002',
    namaDokumen: 'Formulir Persetujuan Selisih Biaya Peningkatan Kelas Rawat Inap (Naik Kelas)',
    jenisDokumen: 'Formulir',
    nomorDokumen: 'FORM-ADM-042/REV-03',
    tahun: 2024,
    kategori: 'Formulir Administrasi',
    ukuran: '480 KB',
    format: 'PDF',
    tanggalUpload: '2024-06-20',
    pengunggah: 'Unit Admisi Rawat Inap',
    fileUrl: 'https://raw.githubusercontent.com/bpjs-rs/docs/main/form-selisih-biaya.pdf',
    downloadCount: 890,
    status: 'Aktif'
  },
  {
    id: 'BPJS-20261001-084200-003',
    namaDokumen: 'Buku Panduan Praktis Pelayanan Peserta JKN di Fasilitas Rujukan (Kemenkes & BPJS)',
    jenisDokumen: 'Brosur & Panduan',
    nomorDokumen: 'PANDUAN-JKN-2024',
    tahun: 2024,
    kategori: 'Edukasi Pasien',
    ukuran: '4.8 MB',
    format: 'PDF',
    tanggalUpload: '2024-08-01',
    pengunggah: 'Humas RS & BPJS Kesehatan',
    fileUrl: 'https://raw.githubusercontent.com/bpjs-rs/docs/main/panduan-peserta-jkn.pdf',
    downloadCount: 2310,
    status: 'Aktif'
  },
  {
    id: 'BPJS-20261001-084300-004',
    namaDokumen: 'Formulir Pendaftaran Program Rujuk Balik (PRB) Pasien Kronis Stabil',
    jenisDokumen: 'Formulir',
    nomorDokumen: 'FORM-PRB-RSUD-07',
    tahun: 2025,
    kategori: 'Formulir Medis',
    ukuran: '320 KB',
    format: 'PDF',
    tanggalUpload: '2025-02-11',
    pengunggah: 'Komite Rujuk Balik RS',
    fileUrl: 'https://raw.githubusercontent.com/bpjs-rs/docs/main/formulir-prb.pdf',
    downloadCount: 645,
    status: 'Aktif'
  },
  {
    id: 'BPJS-20261001-084400-005',
    namaDokumen: 'Salinan Resmi Peraturan Presiden Nomor 59 Tahun 2024 tentang Jaminan Kesehatan',
    jenisDokumen: 'Peraturan Resmi',
    nomorDokumen: 'LN.2024/NO.86',
    tahun: 2024,
    kategori: 'Regulasi Pemerintah',
    ukuran: '3.1 MB',
    format: 'PDF',
    tanggalUpload: '2024-05-10',
    pengunggah: 'Bagian Hukum & Organisasi',
    fileUrl: 'https://peraturan.bpk.go.id/Details/288768/perpres-no-59-tahun-2024',
    downloadCount: 3120,
    status: 'Aktif'
  },
  {
    id: 'BPJS-20261001-084500-006',
    namaDokumen: 'Daftar Obat Formularium Nasional (Fornas) Terpenuhi di Instalasi Farmasi RSUD',
    jenisDokumen: 'Brosur & Panduan',
    nomorDokumen: 'FORNAS-EDISI-2025',
    tahun: 2025,
    kategori: 'Informasi Obat & Alkes',
    ukuran: '1.8 MB',
    format: 'PDF',
    tanggalUpload: '2025-01-05',
    pengunggah: 'Instalasi Farmasi RS',
    fileUrl: 'https://raw.githubusercontent.com/bpjs-rs/docs/main/daftar-obat-fornas.pdf',
    downloadCount: 1180,
    status: 'Aktif'
  }
];

export const initialAnnouncements: Announcement[] = [
  {
    id: 'BPJS-20261001-085000-001',
    judul: 'Kewajiban Verifikasi Biometrik Fingerprint & Face Recognition di Seluruh Poliklinik',
    kategori: 'Penting',
    tanggal: '2026-09-20',
    masaBerlaku: '2026-12-31',
    ringkasan: 'Mulai 1 Oktober 2026, seluruh pasien rawat jalan poliklinik wajib melakukan verifikasi sidik jari/wajah di mesin APM mandiri untuk validasi keabsahan SEP tanpa fotokopi kartu identitas.',
    isi: `Kepada Seluruh Sahabat Pasien BPJS Kesehatan RSUD Sehat Utama,

Dalam rangka implementasi digitalisasi layanan dan pencegahan antrean penumpukan di loket admisi konvensional:
1. Pasien yang telah terdaftar sidik jarinya dapat langsung menuju mesin APM mandiri di Lobby Lantai 1 untuk melakukan rekam sidik jari dan cetak nomor antrean poli.
2. Bagi pasien baru atau pasien yang sidik jarinya belum pernah direkam di sistem BPJS, silakan mendatangi Loket 02 Perekaman Biometrik dengan membawa e-KTP asli.
3. Pasien disabilitas, luka bakar, atau balita (< 5 tahun) dikecualikan dari perekaman sidik jari dan dilayani melalui jalur khusus admisi manual.

Mari manfaatkan kemudahan sistem digital untuk pelayanan yang lebih cepat dan nyaman.`,
    gambarUrl: 'https://picsum.photos/seed/biometric/800/400',
    status: 'Publik'
  },
  {
    id: 'BPJS-20261001-085100-002',
    judul: 'Sosialisasi Kesiapan Ruang Perawatan Kelas Rawat Inap Standar (KRIS) di RSUD Sehat Utama',
    kategori: 'Layanan',
    tanggal: '2026-08-15',
    masaBerlaku: '2026-12-31',
    ringkasan: 'RSUD Sehat Utama telah menyelesaikan standardisasi 12 kriteria fisik KRIS pada 85% kapasitas tempat tidur rawat inap, menghadirkan kenyamanan maksimal bagi peserta JKN.',
    isi: `Sesuai amanat Peraturan Presiden No. 59 Tahun 2024, manajemen RSUD Sehat Utama mengumumkan bahwa:
- Fasilitas ruang rawat inap KRIS kini telah dilengkapi dengan pendingin udara (AC), tirai antar tempat tidur tahan api/bakteri, stop kontak per bed, nakas, kamar mandi di dalam ruangan dengan standar aksesibilitas disabilitas, dan pencahayaan alami yang optimal.
- Kapasitas tempat tidur per ruangan kini dibatasi maksimal 4 bed untuk menjaga privasi dan kenyamanan pemulihan pasien.
- Seluruh pasien BPJS Kesehatan mendapatkan standar fasilitas yang sama tanpa pembedaan kualitas layanan klinis dokter dan perawat.`,
    gambarUrl: 'https://picsum.photos/seed/krisroom/800/400',
    status: 'Publik'
  },
  {
    id: 'BPJS-20261001-085200-003',
    judul: 'Jadwal Operasional Pelayanan Poliklinik BPJS Selama Cuti Bersama & Libur Nasional',
    kategori: 'Operasional',
    tanggal: '2026-05-10',
    masaBerlaku: '2026-10-30',
    ringkasan: 'Layanan rawat jalan poliklinik spesialis tutup pada hari libur nasional resmi, namun Instalasi Gawat Darurat (IGD) dan Farmasi Cito tetap siaga penuh 24 jam nonstop.',
    isi: `Pemberitahuan kepada seluruh pasien dan keluarga:
1. Poliklinik Rawat Jalan dan Loket BPJS Center tutup pada hari libur nasional dan cuti bersama resmi pemerintah.
2. Pelayanan GAWAT DARURAT (IGD) tetap beroperasi PENUH 24 JAM melayani kegawatdaruratan medis pasien BPJS tanpa perlu rujukan.
3. Pasien penyakit kronis yang jadwal pengambilan obatnya bertepatan dengan hari libur dihimbau untuk mengambil obat 1 (satu) hari kerja sebelumnya di Instalasi Farmasi RSUD Sehat Utama.`,
    status: 'Publik'
  }
];

export const initialServices: HospitalService[] = [
  {
    id: 'BPJS-20261001-086000-001',
    namaLayanan: 'Pelayanan Poliklinik Spesialis Rawat Jalan',
    kategori: 'Rawat Jalan',
    deskripsi: 'Pemeriksaan dan tindakan medis terpadu oleh dokter spesialis (Penyakit Dalam, Jantung, Anak, Kebidanan, Bedah, Saraf, Mata, THT, Jiwa, Kulit & Kelamin, Paru, Ortopedi, dan Gigi Spesialistik).',
    syarat: ['Rujukan FKTP aktif (Puskesmas/Klinik) atau Surat Kontrol RS', 'Kartu BPJS Kesehatan aktif / NIK e-KTP'],
    dokumen: ['e-KTP Asli', 'Bukti Antrean Mobile JKN / APM'],
    lokasi: 'Gedung B Lantai 1, 2, dan 3',
    catatanKhusus: 'Gunakan antrean online Mobile JKN untuk kepastian jam kedatangan dokter.'
  },
  {
    id: 'BPJS-20261001-086100-002',
    namaLayanan: 'Pelayanan Rawat Inap & Intensif (ICU / ICCU / PICU / NICU)',
    kategori: 'Rawat Inap',
    deskripsi: 'Perawatan inap komprehensif didukung ruang perawatan KRIS berfasilitas lengkap serta unit perawatan intensif gawat darurat.',
    syarat: ['Surat Perintah Rawat Inap (SPRI) dari Dokter Spesialis atau Dokter Jaga IGD'],
    dokumen: ['SPRI Dokter', 'Kartu BPJS', 'e-KTP Pasien & Penanggung Jawab', 'Kartu Keluarga'],
    lokasi: 'Gedung C Lantai 2 s.d. Lantai 7',
    catatanKhusus: 'Pengurusan SEP Rawat Inap wajib diselesaikan dalam 3 x 24 jam hari kerja.'
  },
  {
    id: 'BPJS-20261001-086200-003',
    namaLayanan: 'Instalasi Gawat Darurat (IGD) 24 Jam',
    kategori: 'Gawat Darurat',
    deskripsi: 'Pelayanan medis darurat untuk kondisi kritis mengancam jiwa tanpa perlu surat rujukan dari FKTP.',
    syarat: ['Kondisi kriteria gawat darurat sesuai penilaian dokter triase'],
    dokumen: ['Identitas KTP / BPJS diserahkan keluarga setelah penanganan medis stabil'],
    lokasi: 'Gedung IGD Lobby Timur (Akses Ambulance 24 Jam)',
    catatanKhusus: 'Pelayanan medis penyelamatan jiwa didahulukan di atas urusan administratif.'
  },
  {
    id: 'BPJS-20261001-086300-004',
    namaLayanan: 'Hemodialisa (Cuci Darah) Rutin Pasien BPJS',
    kategori: 'Layanan Unggulan',
    deskripsi: 'Unit cuci darah berkapasitas 30 mesin dialisis modern dengan perawat bersertifikasi ginjal terakreditasi dan dokter spesialis nefrologi.',
    syarat: ['Surat Rujukan Hemodialisa Berkala dari Spesialis Penyakit Dalam / Konsultan Ginjal Hipertensi'],
    dokumen: ['Rujukan Khusus Hemodialisa (Berlaku 90 hari)', 'SEP Dialisis Rutin'],
    lokasi: 'Gedung Teratai Lt. 2 Unit Hemodialisa',
    catatanKhusus: 'Tersedia penjadwalan rutin Shift Pagi dan Shift Siang.'
  },
  {
    id: 'BPJS-20261001-086400-005',
    namaLayanan: 'Program Rujuk Balik (PRB) Pasien Kronis',
    kategori: 'Program Khusus',
    deskripsi: 'Program pemeliharaan kesehatan bagi pasien penyakit kronis yang kondisinya sudah stabil (Diabetes Melitus, Hipertensi, Jantung, PPOK, Stroke, Asma) untuk kontrol dan ambil obat di FKTP/Apotek terdekat.',
    syarat: ['Kondisi medis telah dinyatakan STABIL oleh dokter spesialis RSUD'],
    dokumen: ['Surat Rujuk Balik (SRB) dari DPJP', 'Buku Rujuk Balik Pasien'],
    lokasi: 'Meja Layanan Khusus PRB di BPJS Center Lt. 1',
    catatanKhusus: 'Mendapatkan kemudahan obat kronis 30 hari di apotek jejaring BPJS tanpa antre di RS.'
  }
];

export const initialSlides: BannerSlide[] = [
  {
    id: 'BPJS-SLIDE-001',
    judul: 'Penerapan Ruang Rawat Inap Standar (KRIS)',
    subjudul: 'Implementasi Perpres Nomor 59 Tahun 2024',
    deskripsi: 'Standardisasi 12 kriteria fisik kenyamanan kamar rawat inap bagi seluruh peserta BPJS Kesehatan tanpa diskriminasi kelas.',
    foto: 'https://picsum.photos/seed/kris_hospital_room/1200/500',
    labelTombol: 'Buka Pengumuman & Info KRIS',
    targetTab: 'pengumuman',
    announcementId: 'BPJS-20261001-085100-002',
    badge: 'Standar Baru Rawat Inap',
    urutan: 1,
    statusAktif: true
  },
  {
    id: 'BPJS-SLIDE-002',
    judul: 'Ambil Antrean Poliklinik dari Rumah via Mobile JKN',
    subjudul: 'Layanan Antrean Online Terintegrasi',
    deskripsi: 'Pilih dokter spesialis, tentukan tanggal kunjungan H-1 hingga H-7, dan check-in mandiri cepat di mesin APM lobi rumah sakit.',
    foto: 'https://picsum.photos/seed/mobile_jkn_queue/1200/500',
    labelTombol: 'Lihat Panduan Mobile JKN',
    targetTab: 'pendaftaran',
    badge: 'Pendaftaran Mandiri',
    urutan: 2,
    statusAktif: true
  },
  {
    id: 'BPJS-SLIDE-003',
    judul: 'Petugas PIPP BPJS Siaga di Meja Pelayanan Lantai 1',
    subjudul: 'Pusat Bantuan & Penanganan Keluhan Pasien',
    deskripsi: 'Pendampingan langsung kendala administrasi, verifikasi sidik jari, pendaftaran bayi baru lahir, dan informasi hak jaminan medis.',
    foto: 'https://picsum.photos/seed/bpjs_pipp_officer/1200/500',
    labelTombol: 'Hubungi Petugas BPJS',
    targetTab: 'petugas',
    badge: 'Layanan Pasien',
    urutan: 3,
    statusAktif: true
  },
  {
    id: 'BPJS-SLIDE-004',
    judul: 'Kewajiban Verifikasi Biometrik Fingerprint & Face Recognition',
    subjudul: 'Validasi Digital Keabsahan Peserta di RS',
    deskripsi: 'Mulai 1 Oktober 2026 seluruh pasien rawat jalan poliklinik wajib verifikasi biometrik di mesin APM mandiri tanpa fotokopi kartu.',
    foto: 'https://picsum.photos/seed/biometric/1200/500',
    labelTombol: 'Baca Detail Pengumuman',
    targetTab: 'pengumuman',
    announcementId: 'BPJS-20261001-085000-001',
    badge: 'Pengumuman Penting',
    urutan: 4,
    statusAktif: true
  },
  {
    id: 'BPJS-SLIDE-005',
    judul: 'Pelayanan Gawat Darurat (IGD 24 Jam Nonstop)',
    subjudul: 'Kondisi Emergency Tanpa Perlu Rujukan FKTP',
    deskripsi: 'Penanganan medis darurat penyelamatan nyawa didahulukan di IGD tanpa syarat rujukan faskes tingkat pertama.',
    foto: 'https://picsum.photos/seed/emergency_igd_care/1200/500',
    labelTombol: 'Lihat Alur IGD',
    targetTab: 'pelayanan',
    badge: 'Siaga 24 Jam',
    urutan: 5,
    statusAktif: true
  }
];
