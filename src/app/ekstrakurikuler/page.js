// src/app/ekstrakurikuler/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Data default jika belum ada data di browser
const DATA_EKSKUL_AWAL = [
  {
    id: 1,
    nama: 'Gerakan Pramuka (Gudep SMANDAM)',
    kategori: 'Wajib',
    jadwal: 'Jumat, 14.00 - 16.30 WIB',
    pembina: 'Drs. Maryanto',
    deskripsi: 'Membina kedisiplinan, kemandirian, kepemimpinan regu, keterampilan tali temali, penjelajahan alam, dan bakti sosial masyarakat.'
  },
  {
    id: 2,
    nama: 'Paskibra (Pasukan Pengibar Bendera)',
    kategori: 'Pilihan',
    jadwal: 'Sabtu, 08.00 - 11.00 WIB',
    pembina: 'Bambang S., S.Pd.',
    deskripsi: 'Pelatihan baris-berbaris (PBB) variasi formasi, pembentukan postur tangguh, dan bertugas pada upacara bendera.'
  },
  {
    id: 3,
    nama: 'PMR (Palang Merah Remaja Wira)',
    kategori: 'Pilihan',
    jadwal: 'Kamis, 15.30 - 17.00 WIB',
    pembina: 'Siti Rahmawati, S.Kep.',
    deskripsi: 'Pertolongan pertama gawat darurat (PPGD), tandu darurat, donor darah, dan kesiapsiagaan Palang Merah.'
  },
  {
    id: 4,
    nama: 'Bola Basket SMANDAM',
    kategori: 'Olahraga',
    jadwal: 'Senin & Kamis, 15.30 WIB',
    pembina: 'Coach Hendra Wicaksono',
    deskripsi: 'Pengembangan teknik dribbling, shooting, strategi tim, dan persiapan kompetisi DBL pelajar.'
  },
  {
    id: 5,
    nama: 'Futsal & Sepak Bola Pelajar',
    kategori: 'Olahraga',
    jadwal: 'Selasa & Jumat, 15.30 WIB',
    pembina: 'Agus Riyadi, S.Pd.Jas.',
    deskripsi: 'Klub futsal binaan sekolah untuk melatih fisik prima, kekompakan tim, dan turnamen pelajar Demak.'
  },
  {
    id: 6,
    nama: 'Rohis (Kerohanian Islam) & Hadroh',
    kategori: 'Pilihan',
    jadwal: 'Rabu, 15.30 - 17.00 WIB',
    pembina: 'Ust. Ahmad Fauzan, S.Pd.I.',
    deskripsi: 'Kajian fiqih remaja, tilawatil quran, rebana hadroh kontemporer, dan kegiatan hari besar Islam.'
  }
];

export default function EkskulPage() {
  const [ekskuls, setEkskuls] = useState(DATA_EKSKUL_AWAL);

  useEffect(() => {
    // Fungsi untuk memuat data dari LocalStorage
    const muatDataEkskul = () => {
      try {
        const tersimpan = localStorage.getItem('smandam_next_ekskuls');
        if (tersimpan) {
          const parsed = JSON.parse(tersimpan);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setEkskuls(parsed);
          }
        }
      } catch (err) {
        console.error('Gagal membaca data ekskul:', err);
      }
    };

    // Muat data saat halaman pertama kali dibuka
    muatDataEkskul();

    // Dengarkan event sinkronisasi real-time dari Dashboard Admin
    window.addEventListener('school_data_updated', muatDataEkskul);
    window.addEventListener('smandam_ekskul_updated', muatDataEkskul);
    window.addEventListener('storage', muatDataEkskul);

    return () => {
      window.removeEventListener('school_data_updated', muatDataEkskul);
      window.removeEventListener('smandam_ekskul_updated', muatDataEkskul);
      window.removeEventListener('storage', muatDataEkskul);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Halaman */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
            Pengembangan Bakat Siswa
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-950">
            Ekstrakurikuler SMA Negeri 2 Mranggen
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Wadah kegiatan siswa untuk mengasah bakat kepemimpinan, seni budaya, olahraga, dan kepanduan di luar jam belajar formal.
          </p>
        </div>

        {/* Jumlah Kegiatan */}
        <div className="flex justify-between items-center text-xs text-slate-500 font-semibold border-b border-slate-200 pb-3">
          <span>Menampilkan {ekskuls.length} Kegiatan Ekstrakurikuler</span>
          <Link href="/admin" className="text-blue-700 hover:underline">
            + Kelola di Dashboard Admin &rarr;
          </Link>
        </div>

        {/* Grid Ekskul yang Otomatis Sinkron dengan Admin */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ekskuls.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-yellow-400 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    {item.kategori || 'Pilihan'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    ID #{item.id}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-slate-900 mt-2 mb-1">
                  {item.nama}
                </h3>
                <p className="text-xs font-semibold text-slate-600 mb-3">
                  👤 Pembina: <span className="text-slate-800">{item.pembina || '-'}</span>
                </p>

                <div className="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-3 text-slate-700">
                  🕒 Jadwal: <span className="font-semibold text-slate-900">{item.jadwal || 'Sesuai Pengumuman'}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.deskripsi}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  ✓ Aktif
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Navigasi Balik */}
        <div className="text-center pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl border border-slate-300 transition shadow-sm"
          >
            &larr; Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}