import { NextRequest, NextResponse } from 'next/server';
import { 
  initialRegulations, 
  initialOfficers, 
  initialRegistrationChannels, 
  initialFlowSteps, 
  initialFAQs, 
  initialDocuments, 
  initialAnnouncements, 
  initialServices, 
  initialSettings 
} from '@/lib/initialData';
import { generateBpjsId, getJakartaTimeString } from '@/lib/utils';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action') || 'getDashboardStats';

  switch (action) {
    case 'getSettings':
      return NextResponse.json({
        success: true,
        message: 'Data settings berhasil diambil',
        data: initialSettings,
        timestamp: getJakartaTimeString()
      });

    case 'getRegulations':
      return NextResponse.json({
        success: true,
        message: 'Data peraturan berhasil diambil',
        data: initialRegulations,
        timestamp: getJakartaTimeString()
      });

    case 'getOfficers':
      return NextResponse.json({
        success: true,
        message: 'Data petugas BPJS RS berhasil diambil',
        data: initialOfficers,
        timestamp: getJakartaTimeString()
      });

    case 'getRegistrationChannels':
      return NextResponse.json({
        success: true,
        message: 'Data kanal pendaftaran berhasil diambil',
        data: initialRegistrationChannels,
        timestamp: getJakartaTimeString()
      });

    case 'getFlows':
      return NextResponse.json({
        success: true,
        message: 'Data alur pelayanan berhasil diambil',
        data: initialFlowSteps,
        timestamp: getJakartaTimeString()
      });

    case 'getFAQs':
      return NextResponse.json({
        success: true,
        message: 'Data FAQ berhasil diambil',
        data: initialFAQs,
        timestamp: getJakartaTimeString()
      });

    case 'getDocuments':
      return NextResponse.json({
        success: true,
        message: 'Data dokumen berhasil diambil',
        data: initialDocuments,
        timestamp: getJakartaTimeString()
      });

    case 'getAnnouncements':
      return NextResponse.json({
        success: true,
        message: 'Data pengumuman berhasil diambil',
        data: initialAnnouncements,
        timestamp: getJakartaTimeString()
      });

    case 'getServices':
      return NextResponse.json({
        success: true,
        message: 'Data layanan rumah sakit berhasil diambil',
        data: initialServices,
        timestamp: getJakartaTimeString()
      });

    case 'getDashboardStats':
      return NextResponse.json({
        success: true,
        message: 'Statistik dashboard',
        data: {
          totalRegulations: initialRegulations.length,
          activeRegulations: initialRegulations.filter(r => r.status === 'Aktif').length,
          totalOfficers: initialOfficers.length,
          activeOfficers: initialOfficers.filter(o => o.statusAktif).length,
          totalDocuments: initialDocuments.length,
          totalFaqs: initialFAQs.length,
          totalAnnouncements: initialAnnouncements.length,
          lastUpdated: getJakartaTimeString()
        },
        timestamp: getJakartaTimeString()
      });

    default:
      return NextResponse.json({
        success: false,
        message: `Action '${action}' tidak dikenali`,
        data: null,
        error: 'INVALID_ACTION'
      }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const action = body.action;
    const user = body.user || 'Admin BPJS RS';

    if (action === 'authenticateAdmin') {
      const { username, password } = body;
      if (username === 'admin' && password === 'bpjs2026') {
        return NextResponse.json({
          success: true,
          message: 'Autentikasi admin berhasil',
          data: {
            username: 'admin',
            name: 'Koordinator BPJS RS',
            role: 'Super Admin',
            token: generateBpjsId('AUTH')
          }
        });
      }
      return NextResponse.json({
        success: false,
        message: 'Username atau password salah',
        data: null,
        error: 'AUTH_FAILED'
      }, { status: 401 });
    }

    if (action === 'uploadDocument') {
      const { fileName, fileSize } = body.data || {};
      return NextResponse.json({
        success: true,
        message: 'Dokumen berhasil diproses ke Google Drive RS',
        data: {
          id: generateBpjsId('DOC'),
          fileUrl: `https://drive.google.com/file/d/rsud-${Date.now()}/view`,
          fileName: fileName || 'dokumen-bpjs.pdf',
          size: fileSize || '1.2 MB',
          uploadedAt: getJakartaTimeString(),
          user
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: `Aksi '${action}' berhasil diproses di server`,
      data: body.data || {},
      timestamp: getJakartaTimeString()
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({
      success: false,
      message: 'Gagal memproses request POST',
      error: errorMsg
    }, { status: 500 });
  }
}
