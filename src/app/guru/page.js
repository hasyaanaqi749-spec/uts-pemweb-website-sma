// src/app/guru/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Data bawaan awal (jika belum pernah diedit di admin)
const DATA_GURU_DEFAULT = [
  {
    id: 1,
    nama: 'Drs. H. Sugiyarto, M.Pd.',
    nip: '19680512 199403 1 008',
    jabatan: 'Kepala Sekolah',
    mapel: 'Manajemen Pendidikan',
    pendidikan: 'S2 Manajemen Pendidikan',
    kategori: 'Pimpinan'
  },
  {
    id: 2,
    nama: 'Sri Wahyuni, S.Pd., M.Si.',
    nip: '19740920 199903 2 004',
    jabatan: 'Waka Kurikulum',
    mapel: 'Biologi',
    pendidikan: 'S2 Magister Biologi',
    kategori: 'Pimpinan'
  },
  {
    id: 3,
    nama: 'Bambang Irawan, S.Kom.',
    nip: '19850314 200902 1 003',
    jabatan: 'Guru & Tim IT',
    mapel: 'Informatika & TIK',
    pendidikan: 'S1 Ilmu Komputer',
    kategori: 'Guru Mapel'
  },
  {
    id: 4,
    nama: 'Dra. Hj. Nur Hidayati, M.Pd.',
    nip: '19710815 199702 2 001',
    jabatan: 'Guru Kimia',
    mapel: 'Kimia & Sains Terapan',
    pendidikan: 'S2 Pendidikan Kimia',
    kategori: 'Guru Mapel'
  },
  {
    id: 5,
    nama: 'Ahmad Fauzi, S.Pd.I.',
    nip: '19880210 201201 1 005',
    jabatan: 'Guru PAI & Pembina Rohis',
    mapel: 'Pendidikan Agama Islam',
    pendidikan: 'S1 Pendidikan Agama Islam',
    kategori: 'Guru Mapel'
  }
];

export default function GuruPage() {
  const [gurus, setGurus] = useState(DATA_GURU_DEFAULT);
  const [cari, setCari] = useState('');
  const [filterKategori, setFilterKategori] = useState('Semua');

  // Muat data dari localStorage dan pasang sinkronisasi otomatis
  useEffect(() => {
    const muatData = () => {
      try {
        const tersimpan = localStorage.getItem('smandam_next_gurus');
        if (tersimpan) {
          setGurus(JSON.parse(tersimpan));
        } else {
          localStorage.setItem('smandam_next_gurus', JSON.stringify(DATA_GURU_DEFAULT));
        }
      } catch (err) {
        console.error('Gagal memuat guru:', err);
      }
    };

    muatData();

    // Dengarkan event perubahan jika admin mengedit di tab lain
    window.addEventListener('storage', muatData);
    window.addEventListener('guru_data_updated', muatData);
    return () => {
      window.removeEventListener('storage', muatData);
      window.removeEventListener('guru_data_updated', muatData);
    };
  }, []);

  // Filter pencarian dan kategori
  const guruTersaring = gurus.filter((g) => {
    const cocokCari =
      g.nama.toLowerCase().includes(cari.toLowerCase()) ||
      g.mapel.toLowerCase().includes(cari.toLowerCase()) ||
      g.jabatan.toLowerCase().includes(cari.toLowerCase());
    const cocokKategori = filterKategori === 'Semua' || g.kategori === filterKategori;
    return cocokCari && cocokKategori;
  });

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto space-y-10">
      {/* Header Halaman */}
      <div className="text-center space-y-3 border-b border-slate-200 pb-8">
        <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Tenaga Pendidik & Kependidikan
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
          Dewan Guru SMA Negeri 2 Mranggen
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Mengenal tenaga pendidik profesional dan berdedikasi tinggi yang membimbing siswa-siswi SMANDAM.
        </p>
      </div>

      {/* Bar Pencarian & Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          value={cari}
          onChange={(e) => setCari(e.target.value)}
          placeholder="Cari nama guru atau mata pelajaran..."
          className="w-full md:w-80 px-4 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1">
          {['Semua', 'Pimpinan', 'Guru Mapel', 'Tenaga Kependidikan'].map((kat) => (
            <button
              key={kat}
              onClick={() => setFilterKategori(kat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                filterKategori === kat
                  ? 'bg-blue-900 text-yellow-300 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {kat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Guru (Tersambung dengan Admin) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {guruTersaring.map((guru) => (
          <div
            key={guru.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition space-y-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-900 to-indigo-800 text-yellow-300 font-extrabold flex items-center justify-center text-lg shadow shrink-0">
                {guru.nama.split(' ')[1]?.[0] || guru.nama[0] || 'G'}
              </div>
              <div className="min-w-0">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded mb-1">
                  {guru.kategori || 'Guru'}
                </span>
                <h3 className="font-bold text-slate-900 text-sm md:text-base leading-snug truncate">
                  {guru.nama}
                </h3>
                <p className="text-xs font-semibold text-blue-700 truncate">
                  {guru.jabatan}
                </p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 text-xs text-slate-600 space-y-1.5">
              <p>
                <span className="font-semibold text-slate-700">Mata Pelajaran:</span> {guru.mapel}
              </p>
              {guru.pendidikan && (
                <p className="text-slate-500 text-[11px]">
                  <span className="font-semibold text-slate-700">Pendidikan:</span> {guru.pendidikan}
                </p>
              )}
              {guru.nip && (
                <p className="text-slate-400 text-[10px] font-mono">
                  NIP. {guru.nip}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {guruTersaring.length === 0 && (
        <div className="text-center py-12 text-slate-500 text-sm">
          Tidak ada data guru yang cocok. Tambahkan guru baru melalui Dashboard Admin.
        </div>
      )}

      {/* Tombol Kembali */}
      <div className="text-center pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl border border-slate-300 transition"
        >
          &larr; Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}