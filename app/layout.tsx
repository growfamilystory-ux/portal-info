import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Portal Informasi BPJS Kesehatan Rumah Sakit',
  description: 'Pusat informasi digital BPJS Kesehatan Rumah Sakit untuk pasien, keluarga, dan petugas. Menyajikan peraturan resmi, alur pelayanan, kanal pendaftaran, direktori petugas BPJS RS, dokumen, FAQ, dan sistem CMS terintegrasi.',
  openGraph: {
    title: 'Portal Informasi BPJS Kesehatan Rumah Sakit',
    description: 'Pusat informasi digital BPJS Kesehatan Rumah Sakit untuk pasien, keluarga, dan petugas. Menyajikan peraturan resmi, alur pelayanan, kanal pendaftaran, direktori petugas BPJS RS, dokumen, FAQ, dan sistem CMS terintegrasi.',
    type: 'website',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portal Informasi BPJS Kesehatan Rumah Sakit',
    description: 'Pusat informasi digital BPJS Kesehatan Rumah Sakit untuk pasien, keluarga, dan petugas.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="id">
      <body suppressHydrationWarning className="bg-slate-50 text-slate-900 antialiased selection:bg-emerald-600 selection:text-white min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
