import { AppDatabase } from './storage';

export function generateSingleFileHtml(db: AppDatabase): string {
  const jsonDb = JSON.stringify(db).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portal Informasi BPJS Kesehatan Rumah Sakit</title>
  <meta name="description" content="Pusat informasi digital BPJS Kesehatan Rumah Sakit.">
  <!-- Tailwind CSS & Bootstrap Icons -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .tab-content { display: none; }
    .tab-content.active { display: block; }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 antialiased min-h-screen">
  <!-- Top Bar Banner -->
  <header class="bg-emerald-900 text-white text-xs py-1.5 px-4">
    <div class="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
      <div class="flex items-center gap-4">
        <span><i class="bi bi-hospital me-1"></i> ${db.settings.hospitalName}</span>
        <span class="hidden md:inline">·</span>
        <span class="hidden md:inline"><i class="bi bi-clock me-1"></i> ${db.settings.operatingHours}</span>
      </div>
      <div class="flex items-center gap-3">
        <span>Hotline BPJS RS: <strong>${db.settings.bpjsHotlineRS}</strong></span>
        <span>·</span>
        <span>Care Center: <strong>${db.settings.nationalBpjsCareCenter}</strong></span>
      </div>
    </div>
  </header>

  <!-- Main Navigation -->
  <nav class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3 cursor-pointer" onclick="switchTab('beranda')">
        <div class="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
          <i class="bi bi-shield-check"></i>
        </div>
        <div>
          <h1 class="text-base font-bold text-slate-900 leading-tight">Informasi BPJS Kesehatan</h1>
          <p class="text-xs text-slate-500">${db.settings.hospitalName}</p>
        </div>
      </div>

      <!-- Desktop Nav -->
      <div class="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
        <button onclick="switchTab('beranda')" class="nav-btn px-3 py-1.5 rounded-md hover:text-emerald-700 hover:bg-emerald-50 transition-colors" data-tab="beranda">Beranda</button>
        <button onclick="switchTab('peraturan')" class="nav-btn px-3 py-1.5 rounded-md hover:text-emerald-700 hover:bg-emerald-50 transition-colors" data-tab="peraturan">Peraturan</button>
        <button onclick="switchTab('pelayanan')" class="nav-btn px-3 py-1.5 rounded-md hover:text-emerald-700 hover:bg-emerald-50 transition-colors" data-tab="pelayanan">Alur Pelayanan</button>
        <button onclick="switchTab('petugas')" class="nav-btn px-3 py-1.5 rounded-md hover:text-emerald-700 hover:bg-emerald-50 transition-colors" data-tab="petugas">Petugas BPJS</button>
        <button onclick="switchTab('pendaftaran')" class="nav-btn px-3 py-1.5 rounded-md hover:text-emerald-700 hover:bg-emerald-50 transition-colors" data-tab="pendaftaran">Pendaftaran</button>
        <button onclick="switchTab('faq')" class="nav-btn px-3 py-1.5 rounded-md hover:text-emerald-700 hover:bg-emerald-50 transition-colors" data-tab="faq">FAQ</button>
        <button onclick="switchTab('dokumen')" class="nav-btn px-3 py-1.5 rounded-md hover:text-emerald-700 hover:bg-emerald-50 transition-colors" data-tab="dokumen">Dokumen</button>
        <button onclick="switchTab('pengumuman')" class="nav-btn px-3 py-1.5 rounded-md hover:text-emerald-700 hover:bg-emerald-50 transition-colors" data-tab="pengumuman">Pengumuman</button>
        <button onclick="switchTab('kontak')" class="nav-btn px-3 py-1.5 rounded-md hover:text-emerald-700 hover:bg-emerald-50 transition-colors" data-tab="kontak">Kontak</button>
      </div>

      <div class="flex items-center gap-2">
        <button onclick="switchTab('admin')" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5">
          <i class="bi bi-shield-lock"></i>
          <span>Admin Portal</span>
        </button>
      </div>
    </div>
  </nav>

  <!-- Container for Dynamic Tabs -->
  <main class="max-w-7xl mx-auto px-4 py-8">
    <div id="tab-beranda" class="tab-content active">
      <!-- Hero -->
      <section class="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-8 mb-8 shadow-sm">
        <div class="max-w-3xl">
          <span class="inline-flex items-center gap-1.5 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-2">
            <i class="bi bi-check-circle-fill"></i> Portal Resmi Informasi JKN Rumah Sakit
          </span>
          <h2 class="text-3xl font-extrabold tracking-tight mb-3">Informasi BPJS Kesehatan</h2>
          <p class="text-emerald-100 text-base mb-6 leading-relaxed">Temukan regulasi resmi, alur rawat jalan & inap, jadwal petugas BPJS Center, tata cara pendaftaran antrean Mobile JKN, dan dokumen rumah sakit secara transparan.</p>
          <div class="flex flex-wrap gap-2 text-xs">
            <button onclick="switchTab('peraturan')" class="bg-white text-emerald-900 px-4 py-2 rounded-lg font-semibold hover:bg-emerald-50"><i class="bi bi-book me-1"></i> Peraturan BPJS</button>
            <button onclick="switchTab('pelayanan')" class="bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-600"><i class="bi bi-diagram-3 me-1"></i> Alur Pelayanan</button>
            <button onclick="switchTab('pendaftaran')" class="bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-600"><i class="bi bi-phone me-1"></i> Cara Daftar Antrean</button>
            <button onclick="switchTab('petugas')" class="bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-600"><i class="bi bi-person-badge me-1"></i> Petugas PIPP</button>
          </div>
        </div>
      </section>

      <!-- Quick Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div class="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg mb-3">
            <i class="bi bi-patch-question"></i>
          </div>
          <h3 class="font-bold text-slate-900 text-base mb-1">Pertanyaan Sering Diajukan</h3>
          <p class="text-xs text-slate-500 mb-3">Masa berlaku rujukan 90 hari, penjaminan IGD darurat, dan obat Fornas tanpa iur biaya.</p>
          <button onclick="switchTab('faq')" class="text-xs font-semibold text-emerald-700 hover:text-emerald-800">Buka FAQ &rarr;</button>
        </div>

        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div class="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-lg mb-3">
            <i class="bi bi-file-earmark-pdf"></i>
          </div>
          <h3 class="font-bold text-slate-900 text-base mb-1">Repositori Dokumen Resmi</h3>
          <p class="text-xs text-slate-500 mb-3">Unduh formulir persetujuan selisih biaya naik kelas, lembar rujuk balik PRB, dan SOP.</p>
          <button onclick="switchTab('dokumen')" class="text-xs font-semibold text-blue-700 hover:text-blue-800">Unduh Dokumen &rarr;</button>
        </div>

        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div class="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-lg mb-3">
            <i class="bi bi-headset"></i>
          </div>
          <h3 class="font-bold text-slate-900 text-base mb-1">Butuh Bantuan Petugas?</h3>
          <p class="text-xs text-slate-500 mb-3">${db.settings.bpjsDeskLocation} siap membantu setiap hari kerja.</p>
          <button onclick="switchTab('kontak')" class="text-xs font-semibold text-amber-700 hover:text-amber-800">Kontak Petugas &rarr;</button>
        </div>
      </div>
    </div>

    <!-- Other tabs populated dynamically -->
    <div id="tab-peraturan" class="tab-content">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-slate-900">Peraturan & Ketentuan Resmi BPJS Kesehatan</h2>
        <p class="text-sm text-slate-500">Dasar hukum resmi, peraturan menteri, dan ketetapan direksi yang berlaku di rumah sakit.</p>
      </div>
      <div id="regulations-container" class="space-y-4"></div>
    </div>

    <div id="tab-pelayanan" class="tab-content">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-slate-900">Alur Pelayanan Pasien BPJS Kesehatan</h2>
        <p class="text-sm text-slate-500">Panduan langkah demi langkah rawat jalan, rawat inap, dan instalasi gawat darurat.</p>
      </div>
      <div id="flows-container" class="space-y-4"></div>
    </div>

    <div id="tab-petugas" class="tab-content">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-slate-900">Direktori Petugas BPJS Center RS</h2>
        <p class="text-sm text-slate-500">Petugas PIPP dan Liaison Officer yang bertugas mendampingi peserta di rumah sakit.</p>
      </div>
      <div id="officers-container" class="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
    </div>

    <div id="tab-pendaftaran" class="tab-content">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-slate-900">Kanal Pendaftaran & Antrean Pasien</h2>
        <p class="text-sm text-slate-500">Pilihan kanal pendaftaran mandiri digital dan loket verifikasi di rumah sakit.</p>
      </div>
      <div id="channels-container" class="space-y-6"></div>
    </div>

    <div id="tab-faq" class="tab-content">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-slate-900">Tanya Jawab (FAQ) BPJS Kesehatan</h2>
        <p class="text-sm text-slate-500">Jawaban lengkap atas pertanyaan yang paling sering diajukan masyarakat.</p>
      </div>
      <div id="faqs-container" class="space-y-3"></div>
    </div>

    <div id="tab-dokumen" class="tab-content">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-slate-900">Dokumen & Formulir Resmi</h2>
        <p class="text-sm text-slate-500">Unduh dokumen SOP, formulir klaim, dan lembar informasi.</p>
      </div>
      <div id="documents-container" class="space-y-3"></div>
    </div>

    <div id="tab-pengumuman" class="tab-content">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-slate-900">Pengumuman & Berita Terbaru</h2>
        <p class="text-sm text-slate-500">Informasi operasional, jadwal cuti, dan pembaruan sistem BPJS di rumah sakit.</p>
      </div>
      <div id="announcements-container" class="space-y-4"></div>
    </div>

    <div id="tab-kontak" class="tab-content">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-slate-900">Pusat Layanan & Kontak Resmi</h2>
        <p class="text-sm text-slate-500">Lokasi meja pelayanan BPJS Center di rumah sakit dan saluran pengaduan.</p>
      </div>
      <div class="bg-white p-6 rounded-xl border border-slate-200">
        <h3 class="text-lg font-bold text-slate-900 mb-2">${db.settings.hospitalName}</h3>
        <p class="text-sm text-slate-600 mb-4">${db.settings.hospitalAddress}</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div class="p-4 bg-slate-50 rounded-lg">
            <span class="text-xs font-semibold text-slate-400 block mb-1">LOKASI MEJA BPJS RS</span>
            <p class="font-medium text-slate-800">${db.settings.bpjsDeskLocation}</p>
          </div>
          <div class="p-4 bg-slate-50 rounded-lg">
            <span class="text-xs font-semibold text-slate-400 block mb-1">JAM OPERASIONAL</span>
            <p class="font-medium text-slate-800">${db.settings.operatingHours}</p>
          </div>
          <div class="p-4 bg-slate-50 rounded-lg">
            <span class="text-xs font-semibold text-slate-400 block mb-1">HOTLINE WHATSAPP BPJS RS</span>
            <p class="font-bold text-emerald-700">${db.settings.bpjsHotlineRS}</p>
          </div>
          <div class="p-4 bg-slate-50 rounded-lg">
            <span class="text-xs font-semibold text-slate-400 block mb-1">CARE CENTER NASIONAL</span>
            <p class="font-bold text-blue-700">${db.settings.nationalBpjsCareCenter} / PANDAWA: ${db.settings.pandawaNumber}</p>
          </div>
        </div>
      </div>
    </div>

    <div id="tab-admin" class="tab-content">
      <div class="bg-white p-6 rounded-xl border border-slate-200 max-w-md mx-auto my-8">
        <div class="text-center mb-6">
          <div class="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center mx-auto text-xl mb-2">
            <i class="bi bi-shield-lock"></i>
          </div>
          <h2 class="text-xl font-bold text-slate-900">Admin Content Management</h2>
          <p class="text-xs text-slate-500">Kelola informasi BPJS tanpa perlu menyentuh kode aplikasi.</p>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">Username</label>
            <input type="text" id="admin-user" value="admin" class="w-full text-sm px-3 py-2 border rounded-lg bg-slate-50">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">Password</label>
            <input type="password" id="admin-pass" value="bpjs2026" class="w-full text-sm px-3 py-2 border rounded-lg bg-slate-50">
          </div>
          <button onclick="handleAdminLogin()" class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-sm transition-colors">
            Masuk ke Panel Pengelolaan
          </button>
          <p class="text-center text-xs text-slate-400">Default: admin / bpjs2026</p>
        </div>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="bg-white border-t border-slate-200 py-6 px-4 mt-12 text-center text-xs text-slate-500">
    <p class="max-w-2xl mx-auto leading-relaxed mb-2">Informasi ini disediakan sebagai media informasi. Untuk ketentuan resmi, selalu merujuk pada sumber resmi BPJS Kesehatan dan/atau instansi terkait.</p>
    <p>&copy; 2026 ${db.settings.hospitalName} · Sistem Informasi BPJS Kesehatan Terpadu.</p>
  </footer>

  <!-- Single-File JavaScript App -->
  <script>
    const APP_DATA = ${jsonDb};

    function switchTab(tabId) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
      const target = document.getElementById('tab-' + tabId);
      if (target) target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function renderContent() {
      // Regulations
      const regContainer = document.getElementById('regulations-container');
      if (regContainer) {
        regContainer.innerHTML = APP_DATA.regulations.map(r => \`
          <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div class="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
              <span class="font-semibold text-emerald-700">\${r.nomor}</span>
              <span>·</span>
              <span>Tahun \${r.tahun}</span>
              <span>·</span>
              <span class="font-medium \${r.status === 'Aktif' ? 'text-emerald-600' : 'text-slate-500'}">\${r.status}</span>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-2">\${r.judul}</h3>
            <p class="text-xs text-slate-600 leading-relaxed mb-3">\${r.ringkasan}</p>
            <div class="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
              <span class="text-slate-400">Penerbit: \${r.instansiPenerbit}</span>
              <a href="\${r.linkSumberResmi}" target="_blank" rel="noopener noreferrer" class="text-emerald-700 font-semibold hover:underline">
                <i class="bi bi-box-arrow-up-right me-1"></i> Sumber Resmi BPK/BPJS
              </a>
            </div>
          </div>
        \`).join('');
      }

      // Flows
      const flowContainer = document.getElementById('flows-container');
      if (flowContainer) {
        flowContainer.innerHTML = APP_DATA.flows.filter(f => f.alurTipe === 'rawat-jalan').map(f => \`
          <div class="bg-white p-5 rounded-xl border border-slate-200 flex gap-4">
            <div class="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
              \${f.stepNumber}
            </div>
            <div>
              <h4 class="font-bold text-slate-900 text-sm mb-1">\${f.judul}</h4>
              <p class="text-xs text-slate-600 mb-2">\${f.deskripsi}</p>
              <div class="text-xs text-slate-500 flex flex-wrap gap-x-4 gap-y-1">
                <span><i class="bi bi-geo-alt me-1 text-slate-400"></i>\${f.lokasi}</span>
                <span><i class="bi bi-clock me-1 text-slate-400"></i>\${f.estimasiWaktu}</span>
              </div>
            </div>
          </div>
        \`).join('');
      }

      // Officers
      const officerContainer = document.getElementById('officers-container');
      if (officerContainer) {
        officerContainer.innerHTML = APP_DATA.officers.map(o => \`
          <div class="bg-white p-5 rounded-xl border border-slate-200 flex gap-4">
            <img src="\${o.foto}" alt="\${o.nama}" class="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200">
            <div>
              <h4 class="font-bold text-slate-900 text-sm">\${o.nama}</h4>
              <p class="text-xs text-emerald-700 font-medium mb-1">\${o.jabatan}</p>
              <p class="text-xs text-slate-500 mb-2"><i class="bi bi-geo-alt me-1"></i>\${o.lokasiPelayanan}</p>
              <a href="https://wa.me/\${o.nomorKontak.replace(/[^0-9]/g, '')}" target="_blank" class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md hover:bg-emerald-100">
                <i class="bi bi-whatsapp"></i> Hubungi WhatsApp
              </a>
            </div>
          </div>
        \`).join('');
      }

      // Channels
      const channelContainer = document.getElementById('channels-container');
      if (channelContainer) {
        channelContainer.innerHTML = APP_DATA.channels.map(c => \`
          <div class="bg-white p-5 rounded-xl border border-slate-200">
            <div class="flex items-center justify-between mb-2">
              <h4 class="font-bold text-slate-900 text-base">\${c.namaKanal}</h4>
              <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">\${c.jenisKanal}</span>
            </div>
            <p class="text-xs text-slate-600 mb-3">\${c.deskripsi}</p>
            <ol class="list-decimal list-inside text-xs text-slate-600 space-y-1 mb-3">
              \${c.langkah.map(l => \`<li>\${l}</li>\`).join('')}
            </ol>
            <div class="text-xs text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span>Jam Layanan: \${c.jamLayanan}</span>
              \${c.url ? \`<a href="\${c.url}" target="_blank" class="font-semibold text-emerald-700 hover:underline">Buka Aplikasi &rarr;</a>\` : ''}
            </div>
          </div>
        \`).join('');
      }

      // FAQs
      const faqContainer = document.getElementById('faqs-container');
      if (faqContainer) {
        faqContainer.innerHTML = APP_DATA.faqs.map((f, idx) => \`
          <details class="bg-white rounded-xl border border-slate-200 p-4 group">
            <summary class="font-semibold text-slate-900 text-sm cursor-pointer list-none flex justify-between items-center">
              <span>\${f.pertanyaan}</span>
              <i class="bi bi-chevron-down text-slate-400 group-open:rotate-180 transition-transform"></i>
            </summary>
            <p class="text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100 leading-relaxed">\${f.jawaban}</p>
          </details>
        \`).join('');
      }

      // Documents
      const docContainer = document.getElementById('documents-container');
      if (docContainer) {
        docContainer.innerHTML = APP_DATA.documents.map(d => \`
          <div class="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs">PDF</div>
              <div>
                <h4 class="font-bold text-slate-900 text-sm">\${d.namaDokumen}</h4>
                <p class="text-xs text-slate-400">\${d.nomorDokumen} · Ukuran: \${d.ukuran}</p>
              </div>
            </div>
            <a href="\${d.fileUrl}" target="_blank" class="px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200">
              <i class="bi bi-download me-1"></i> Unduh
            </a>
          </div>
        \`).join('');
      }

      // Announcements
      const annContainer = document.getElementById('announcements-container');
      if (annContainer) {
        annContainer.innerHTML = APP_DATA.announcements.map(a => \`
          <div class="bg-white p-5 rounded-xl border border-slate-200">
            <div class="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span class="text-emerald-700 font-semibold">\${a.kategori}</span>
              <span>·</span>
              <span>\${a.tanggal}</span>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-2">\${a.judul}</h3>
            <p class="text-xs text-slate-600 leading-relaxed">\${a.isi}</p>
          </div>
        \`).join('');
      }
    }

    function handleAdminLogin() {
      const u = document.getElementById('admin-user').value;
      const p = document.getElementById('admin-pass').value;
      if (u === 'admin' && p === 'bpjs2026') {
        alert('Login Berhasil! Untuk mengelola data secara dinamis dengan database Google Sheets, gunakan Web App Google AI Studio atau hubungkan URL Web App Google Apps Script.');
      } else {
        alert('Username atau password salah.');
      }
    }

    document.addEventListener('DOMContentLoaded', renderContent);
  </script>
</body>
</html>`;
}
