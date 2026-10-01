'use client';

import React, { useState, useMemo } from 'react';
import { Officer } from '@/lib/types';
import { 
  UserCheck, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Search, 
  CheckCircle2, 
  Copy, 
  ExternalLink,
  Building,
  HelpCircle,
  MessageCircle
} from 'lucide-react';

interface OfficersViewProps {
  officers: Officer[];
  onShowToast: (title: string, msg?: string, type?: 'success' | 'error' | 'info') => void;
}

export default function OfficersView({ officers, onShowToast }: OfficersViewProps) {
  const [search, setSearch] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const units = useMemo(() => {
    return Array.from(new Set(officers.map(o => o.unit)));
  }, [officers]);

  const allServices = useMemo(() => {
    const set = new Set<string>();
    officers.forEach(o => o.jenisLayanan.forEach(s => set.add(s)));
    return Array.from(set);
  }, [officers]);

  const filteredOfficers = useMemo(() => {
    return officers.filter(o => {
      const matchSearch =
        search.trim() === '' ||
        o.nama.toLowerCase().includes(search.toLowerCase()) ||
        o.jabatan.toLowerCase().includes(search.toLowerCase()) ||
        o.lokasiPelayanan.toLowerCase().includes(search.toLowerCase());

      const matchUnit = selectedUnit === 'all' || o.unit === selectedUnit;
      const matchService = selectedService === 'all' || o.jenisLayanan.includes(selectedService);
      const matchStatus = 
        selectedStatus === 'all' || 
        (selectedStatus === 'aktif' && o.statusAktif) || 
        (selectedStatus === 'nonaktif' && !o.statusAktif);

      return matchSearch && matchUnit && matchService && matchStatus;
    });
  }, [officers, search, selectedUnit, selectedService, selectedStatus]);

  const handleCopyPhone = (phone: string, name: string) => {
    navigator.clipboard.writeText(phone);
    onShowToast('Nomor kontak disalin', `${phone} (${name})`, 'success');
  };

  return (
    <div className="space-y-6 py-6">
      {/* Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
            <UserCheck className="w-4 h-4" />
            <span>Petugas Pendampingan Pasien Rumah Sakit</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Petugas BPJS Kesehatan di Rumah Sakit
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
            Petugas PIPP (Pemberian Informasi dan Penanganan Pengaduan), Dokter Pengendali Mutu BPJS, serta Tim Admisi siaga mendampingi proses administrasi, edukasi hak peserta, dan penyelesaian keluhan pasien di rumah sakit.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama petugas, jabatan, atau meja..."
              className="w-full pl-10 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="w-full py-2 px-3 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Semua Unit / Bagian</option>
              {units.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full py-2 px-3 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Semua Jenis Layanan</option>
              {allServices.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full py-2 px-3 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Semua Status</option>
              <option value="aktif">Aktif Siaga</option>
              <option value="nonaktif">Non-Aktif</option>
            </select>
          </div>
        </div>
      </div>

      {/* Officers Grid */}
      {filteredOfficers.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
          <UserCheck className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800 mb-1">Petugas Tidak Ditemukan</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            Tidak ada petugas yang cocok dengan kata kunci atau filter yang Anda pilih.
          </p>
          <button
            onClick={() => { setSearch(''); setSelectedUnit('all'); setSelectedService('all'); setSelectedStatus('all'); }}
            className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-700 text-white rounded-lg hover:bg-emerald-800"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOfficers.map((officer) => {
            const cleanPhone = officer.nomorKontak.replace(/[^0-9]/g, '');
            const waLink = `https://wa.me/${cleanPhone}?text=Halo%20${encodeURIComponent(officer.nama)},%20saya%20memerlukan%20informasi%20layanan%20BPJS%20di%20Rumah%20Sakit.`;

            return (
              <div
                key={officer.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-all"
              >
                <div>
                  {/* Officer Header Info */}
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={officer.foto}
                      alt={officer.nama}
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0 shadow-xs"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          officer.statusAktif 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {officer.statusAktif ? 'Aktif Siaga' : 'Sedang Tidak Bertugas'}
                        </span>
                      </div>
                      <h2 className="text-base font-bold text-slate-900 leading-snug">
                        {officer.nama}
                      </h2>
                      <p className="text-xs font-semibold text-emerald-700">
                        {officer.jabatan}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5 truncate">
                        {officer.unit}
                      </p>
                    </div>
                  </div>

                  {/* Duty Details */}
                  <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-100 mb-4">
                    <div className="flex items-start gap-2 text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-800">Meja Layanan: </span>
                        <span>{officer.lokasiPelayanan}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-800">Jam Dinas: </span>
                        <span>{officer.jamPelayanan} ({officer.hariPelayanan})</span>
                      </div>
                    </div>

                    {officer.email && (
                      <div className="flex items-center gap-2 text-slate-700">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-mono text-slate-600 truncate">{officer.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Handled Services Checklist */}
                  <div className="mb-4">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-2">
                      Jenis Layanan yang Ditangani:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {officer.jenisLayanan.map((srv, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact Actions Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Chat WhatsApp</span>
                  </a>

                  <button
                    onClick={() => handleCopyPhone(officer.nomorKontak, officer.nama)}
                    className="p-2 border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors"
                    title="Salin nomor kontak"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
