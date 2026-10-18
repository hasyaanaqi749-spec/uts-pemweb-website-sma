'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Data bawaan awal sekolah (tampil jika admin belum mengubah data)
const DATA_PRESTASI_DEFAULT = [
  {
    id: 1,
    judul: 'Medali Emas Olimpiade Sains Pelajar Bidang Biologi',
    tingkat: 'Tingkat Provinsi',
    kategori: 'Sains & Teknologi',
    tahun: '2026',
    pemenang: 'Aisyah Putri Azzahra (Kelas XI MIPA 1)',
    deskripsi: 'Menyisihkan ratusan delegasi terbaik jenjang SMA dari berbagai kabupaten/kota se-Jawa Tengah dengan skor praktikum laboratorium tertinggi.'
  },
  {
    id: 2,
    judul: 'Juara 1 Festival Seni Siswa Nasional (FLS2N) Tari Kreasi',
    tingkat: 'Tingkat Kabupaten',
    kategori: 'Seni & Budaya',
    tahun: '2026',
    pemenang: 'Sanggar Tari Sasadhara SMANDAM',
    deskripsi: 'Menampilkan kreasi tari kontemporer pesisir Demak yang dinilai dewan juri memadukan keselarasan wiraga, wirama, dan wirasa.'
  },
  {
    id: 3,
    judul: 'Juara 2 Lomba Debat Bahasa Indonesia Pelajar',
    tingkat: 'Karisidenan Semarang',
    kategori: 'Bahasa & Literasi',
    tahun: '2025',
    pemenang: 'Tim Debat SMANDAM (Rizky, Clara, Danu)',
    deskripsi: 'Membahas topik hilirisasi teknologi dan etika kecerdasan buatan dalam dunia pendidikan nasional.'
  },
  {
    id: 4,
    judul: 'Runner-Up Kejuaraan Bola Basket Pelajar Demak-Semarang Cup',
    tingkat: 'Tingkat Regional',
    kategori: 'Olahraga',
    tahun: '2026',
    pemenang: 'Tim Basket Putra SMANDAM',
    deskripsi: 'Melaju hingga babak final setelah mengalahkan tim unggulan dari Kota Semarang dengan selisih skor tipis.'
  },
  {
    id: 5,
    judul: 'Juara Umum Kemah Bakti Pramuka Penegak Bantara',
    tingkat: 'Tingkat Kabupaten',
    kategori: 'Kepramukaan',
    tahun: '2025',
    pemenang: 'Gugus Depan Pangkalan SMA N 2 Mranggen',
    deskripsi: 'Meraih medali terbanyak di cabang ketangkasan pionering, navigasi darat, sandi morse, dan parade pentas budaya ambalan.'
  }
];

export default function PrestasiPage() {
  const [prestasis, setPrestasis] = useState(DATA_PRESTASI_DEFAULT);

  useEffect(() => {
    // Fungsi untuk memuat data dari LocalStorage Admin
    const muatDataPrestasi = () => {
      try {
        const tersimpan = localStorage.getItem('smandam_next_prestasis');
        if (tersimpan) {
          const parsed = JSON.parse(tersimpan);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setPrestasis(parsed);
            return;
          }
        }
        // Fallback jika belum pernah ada data di admin
        setPrestasis(DATA_PRESTASI_DEFAULT);
      } catch (err) {
        console.error('Gagal membaca data prestasi:', err);
      }
    };

    // 1. Ambil data saat pertama kali halaman dibuka
    muatDataPrestasi();

    // 2. Dengarkan sinyal update saat ada Tambah, Edit, Hapus dari Admin
    window.addEventListener('smandam_prestasi_updated', muatDataPrestasi);
    window.addEventListener('school_data_updated', muatDataPrestasi);
    window.addEventListener('storage', muatDataPrestasi);

    // Bersihkan listener saat unmount
    return () => {
      window.removeEventListener('smandam_prestasi_updated', muatDataPrestasi);
      window.removeEventListener('school_data_updated', muatDataPrestasi);
      window.removeEventListener('storage', muatDataPrestasi);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Halaman */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold tracking-widest text-amber-700 uppercase bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            Katalog Prestasi Siswa
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-950">
            Prestasi SMA Negeri 2 Mranggen
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Daftar perolehan medali, kejuaraan, dan penghargaan yang diraih siswa-siswi berprestasi.
          </p>
        </div>

        {/* Grid Prestasi Tersambung ke Admin */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prestasis.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3 gap-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                    {item.tingkat}
                  </span>
                  <span className="text-xs font-black text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    🏆 {item.tahun}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 mb-2 leading-snug">
                  {item.judul}
                </h3>

                {/* Mendukung item.pemenang (dari admin) atau item.peraih */}
                <p className="text-xs font-semibold text-blue-900 mb-2">
                  Peraih: <span className="font-bold text-slate-800">{item.pemenang || item.peraih || '-'}</span>
                </p>

                {item.kategori && (
                  <p className="text-[11px] text-slate-500 mb-2">
                    Kategori: <span className="font-medium text-slate-700">{item.kategori}</span>
                  </p>
                )}

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.deskripsi || 'Tidak ada deskripsi tambahan.'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {prestasis.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
            Belum ada data prestasi. Silakan tambahkan melalui Dashboard Admin.
          </div>
        )}

        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold px-5 py-2.5 rounded-xl transition"
          >
            &larr; Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}