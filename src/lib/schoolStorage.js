// src/lib/schoolStorage.js
'use client';

// 1. Data Default Sekolah (Fallback jika belum ada perubahan)
export const DEFAULT_DATA = {
  prestasi: [
    {
      id: 1,
      judul: 'Juara 1 FLS2N Tingkat Provinsi Jawa Tengah 2024',
      kategori: 'Seni & Budaya',
      peraih: 'Tim Tari Tradisional SMANDAM',
      tingkat: 'Provinsi',
      tahun: '2024',
      deskripsi: 'Meraih medali emas dengan membawakan tari kreasi pesisiran khas Demak.'
    },
    {
      id: 2,
      judul: 'Medali Perak Olimpiade Sains Nasional (OSN) Biologi',
      kategori: 'Akademik',
      peraih: 'Ahmad Faiz (Kelas XI MIPA 1)',
      tingkat: 'Nasional',
      tahun: '2024',
      deskripsi: 'Berhasil menembus babak final dan mengharumkan nama sekolah di kancah nasional.'
    },
    {
      id: 3,
      judul: 'Juara 2 Pencak Silat Popda Kabupaten Demak',
      kategori: 'Olahraga',
      peraih: 'Rizky Pratama (Kelas X-4)',
      tingkat: 'Kabupaten',
      tahun: '2024',
      deskripsi: 'Kategori tanding kelas C putra mewakili kontingen kecamatan.'
    }
  ],
  ekskul: [
    {
      id: 1,
      nama: 'Paskibra (Paspara)',
      kategori: 'Kepemimpinan & Baris-Berbaris',
      pembina: 'Bpk. Hendro, S.Pd.',
      jadwal: 'Selasa & Jumat, 15.30 WIB',
      deskripsi: 'Melatih kedisiplinan, kekompakan baris berbaris, dan pembentukan karakter generasi tangguh.'
    },
    {
      id: 2,
      nama: 'Pramuka (Gudep SMANDAM)',
      kategori: 'Wajib & Kepanduan',
      pembina: 'Ibu Siti Aminah, M.Pd.',
      jadwal: 'Rabu, 15.30 WIB',
      deskripsi: 'Kegiatan kepanduan wajib untuk mengasah keterampilan bertahan hidup, sosial, dan gotong royong.'
    },
    {
      id: 3,
      nama: 'PMR (Palang Merah Remaja)',
      kategori: 'Kemanusiaan & Kesehatan',
      pembina: 'Ibu Ratna, S.Kep.',
      jadwal: 'Kamis, 15.30 WIB',
      deskripsi: 'Pelatihan pertolongan pertama, donor darah, dan kesiapsiagaan tanggap darurat di lingkungan sekolah.'
    },
    {
      id: 4,
      nama: 'Rohis / Rohani Islam',
      kategori: 'Keagamaan',
      pembina: 'Bpk. Ahmad Fauzi, S.Ag.',
      jadwal: 'Jumat, 13.00 WIB',
      deskripsi: 'Kajian rutin, kepemimpinan islami, peringatan hari besar Islam, dan tahsin Al-Quran.'
    }
  ],
  guru: [
    {
      id: 1,
      nama: 'Drs. H. Sugiyarto, M.Pd.',
      nip: '19680512 199403 1 008',
      jabatan: 'Kepala Sekolah',
      mapel: 'Manajemen Pendidikan'
    },
    {
      id: 2,
      nama: 'Sri Wahyuni, S.Pd., M.Si.',
      nip: '19740920 199903 2 004',
      jabatan: 'Waka Kurikulum',
      mapel: 'Biologi'
    },
    {
      id: 3,
      nama: 'Bambang Irawan, S.Kom.',
      nip: '19850314 200902 1 003',
      jabatan: 'Guru & Tim IT',
      mapel: 'Informatika'
    }
  ],
  berita: [
    {
      id: 1,
      judul: 'Informasi SPMB / PPDB SMA Negeri 2 Mranggen Tahun Ajaran 2025/2026',
      kategori: 'SPMB',
      tanggal: '15 Mei 2025',
      ringkasan: 'Jalur zonasi, afirmasi, prestasi, dan perpindahan tugas orang tua telah resmi dibuka.'
    }
  ]
};

// 2. Fungsi Membaca Data dari LocalStorage
export function getSchoolData(key) {
  if (typeof window === 'undefined') return DEFAULT_DATA[key] || [];
  try {
    const raw = localStorage.getItem(`smandam_${key}`);
    if (!raw) {
      // Inisialisasi awal ke localStorage
      localStorage.setItem(`smandam_${key}`, JSON.stringify(DEFAULT_DATA[key] || []));
      return DEFAULT_DATA[key] || [];
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Gagal membaca data dari storage', e);
    return DEFAULT_DATA[key] || [];
  }
}

// 3. Fungsi Menyimpan Data ke LocalStorage & Memicu Event Sinkronisasi
export function saveSchoolData(key, data) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`smandam_${key}`, JSON.stringify(data));
    // Trigger custom event agar halaman publik langsung membaca data terbaru tanpa refresh
    window.dispatchEvent(new Event('school_data_updated'));
  } catch (e) {
    console.error('Gagal menyimpan data ke storage', e);
  }
}

// 4. Fungsi Reset Data ke Default
export function resetSchoolData() {
  if (typeof window === 'undefined') return;
  Object.keys(DEFAULT_DATA).forEach((key) => {
    localStorage.setItem(`smandam_${key}`, JSON.stringify(DEFAULT_DATA[key]));
  });
  window.dispatchEvent(new Event('school_data_updated'));
}