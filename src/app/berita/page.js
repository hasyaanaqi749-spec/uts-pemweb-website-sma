// src/app/berita/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Data Berita Bawaan
const DATA_BERITA_DEFAULT = [
  {
    id: 1,
    judul: 'Informasi SPMB / PPDB SMA Negeri 2 Mranggen Tahun Ajaran 2025/2026',
    kategori: 'Pengumuman',
    tanggal: '15 Mei 2025',
    penulis: 'Panitia SPMB SMANDAM',
    ringkasan: 'Informasi resmi alur pendaftaran, kuota zonasi, afirmasi, prestasi, dan syarat berkas siswa baru.',
    gambar: '/images/logo sma n 2 mranggen.jpeg'
  },
  {
    id: 2,
    judul: 'Siswa SMANDAM Raih Medali Perak OSN Tingkat Nasional Bidang Biologi',
    kategori: 'Prestasi',
    tanggal: '10 Mei 2025',
    penulis: 'Humas Sekolah',
    ringkasan: 'Perjuangan mengharumkan nama Jawa Tengah di tingkat nasional dengan perolehan medali perak.',
    gambar: '/images/logo sma n 2 mranggen.jpeg'
  },
  {
    id: 3,
    judul: 'Peringatan Hari Pendidikan Nasional dan Gelar Karya Projek P5',
    kategori: 'Kegiatan',
    tanggal: '2 Mei 2025',
    penulis: 'Tim Jurnalistik',
    ringkasan: 'Pameran kewirausahaan dan daur ulang sampah plastik karya siswa kelas X dan XI.',
    gambar: '/images/logo sma n 2 mranggen.jpeg'
  }
];

export default function BeritaPage() {
  const [beritas, setBeritas] = useState(DATA_BERITA_DEFAULT);
  const [filterKategori, setFilterKategori] = useState('Semua');

  useEffect(() => {
    const muatBerita = () => {
      try {
        const tersimpan = localStorage.getItem('smandam_next_beritas');
        if (tersimpan) {
          setBeritas(JSON.parse(tersimpan));
        } else {
          localStorage.setItem('smandam_next_beritas', JSON.stringify(DATA_BERITA_DEFAULT));
        }
      } catch (err) {
        console.error('Gagal memuat berita:', err);
      }
    };

    muatBerita();
    window.addEventListener('storage', muatBerita);
    window.addEventListener('berita_data_updated', muatBerita);
    return () => {
      window.removeEventListener('storage', muatBerita);
      window.removeEventListener('berita_data_updated', muatBerita);
    };
  }, []);

  const beritaTersaring = filterKategori === 'Semua' 
    ? beritas 
    : beritas.filter(b => b.kategori === filterKategori);

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-2 border-b border-slate-200 pb-6">
        <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Warta & Informasi Sekolah
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
          Berita Terkini SMANDAM
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto text-sm md:text-base">
          Informasi seputar pendaftaran siswa baru (SPMB), prestasi, dan kegiatan siswa SMA Negeri 2 Mranggen.
        </p>
      </div>

      {/* Filter Kategori */}
      <div className="flex gap-2 justify-center flex-wrap">
        {['Semua', 'Pengumuman', 'Prestasi', 'Kegiatan', 'Akademik'].map((kat) => (
          <button
            key={kat}
            onClick={() => setFilterKategori(kat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
              filterKategori === kat
                ? 'bg-blue-900 text-yellow-300 shadow'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {kat}
          </button>
        ))}
      </div>

      {/* Grid Kartu Berita */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beritaTersaring.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="px-2.5 py-0.5 rounded-full font-bold bg-blue-100 text-blue-800 text-[10px]">
                  {item.kategori}
                </span>
                <span>{item.tanggal}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2">
                {item.judul}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {item.ringkasan}
              </p>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
              <span className="text-[11px] text-slate-400 font-medium truncate max-w-[150px]">
                Oleh: {item.penulis}
              </span>
              <Link
                href={`/berita/${item.id}`}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
              >
                Baca &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>

      {beritaTersaring.length === 0 && (
        <div className="text-center py-12 text-slate-500 text-sm">
          Belum ada berita untuk kategori ini. Tambahkan artikel baru dari Dashboard Admin.
        </div>
      )}
    </div>
  );
}
