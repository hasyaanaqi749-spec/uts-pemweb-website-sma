'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Data default awal
const DATA_GURU_AWAL = [
  { id: 1, nama: 'Drs. Sugiharto, M.Pd.', jabatan: 'Kepala Sekolah', mapel: 'Manajemen Pendidikan', nip: '19680512 199412 1 002' },
  { id: 2, nama: 'Dra. Sri Mulyani, M.Si.', jabatan: 'Wakasek Kurikulum', mapel: 'Kimia', nip: '19710315 199702 2 001' },
  { id: 3, nama: 'Budi Santoso, S.Pd., M.Kom.', jabatan: 'Wakasek Kesiswaan', mapel: 'Informatika', nip: '19800420 200501 1 008' },
  { id: 4, nama: 'H. Maryanto, S.Pd.', jabatan: 'Wakasek Sarpras', mapel: 'Fisika', nip: '19730811 199803 1 004' },
  { id: 5, nama: 'Rina Kusumawati, S.Pd., M.Pd.', jabatan: 'Wakasek Humas', mapel: 'Bahasa Indonesia', nip: '19820925 200801 2 012' },
  { id: 6, nama: 'Ahmad Fauzan, S.Pd.I.', jabatan: 'Guru PAI', mapel: 'Pendidikan Agama Islam', nip: '19851102 201001 1 015' },
  { id: 7, nama: 'Agus Riyadi, S.Pd.Jas.', jabatan: 'Guru PJOK', mapel: 'Pendidikan Jasmani & Olahraga', nip: '19870614 201101 1 009' },
  { id: 8, nama: 'Endang Sulistyo, S.Sn.', jabatan: 'Guru Seni', mapel: 'Seni Budaya & Keterampilan', nip: '19890219 201402 2 007' }
];

const DATA_EKSKUL_AWAL = [
  { id: 1, nama: 'Gerakan Pramuka (Gudep SMANDAM)', kategori: 'Wajib', jadwal: 'Jumat, 14.00 WIB', pembina: 'Drs. Maryanto', deskripsi: 'Pendidikan kepanduan, kepemimpinan regu, sandi morse, tali temali, dan bakti perkemahan.' },
  { id: 2, nama: 'Paskibra (Pasukan Pengibar Bendera)', kategori: 'Pilihan', jadwal: 'Sabtu, 08.00 WIB', pembina: 'Bambang S., S.Pd.', deskripsi: 'Pelatihan baris-berbaris (PBB) formasi upacara dan persiapan paskibraka kabupaten.' },
  { id: 3, nama: 'PMR (Palang Merah Remaja Wira)', kategori: 'Pilihan', jadwal: 'Kamis, 15.30 WIB', pembina: 'Siti Rahmawati, S.Kep.', deskripsi: 'Pertolongan pertama gawat darurat, tandu darurat, donor darah, dan bakti kemanusiaan.' },
  { id: 4, nama: 'Bola Basket SMANDAM', kategori: 'Olahraga', jadwal: 'Senin & Kamis, 15.30 WIB', pembina: 'Hendra Wicaksono', deskripsi: 'Latihan teknik dribble, shooting, pola taktik tim, dan persiapan kejuaraan DBL.' },
  { id: 5, nama: 'Futsal & Sepak Bola', kategori: 'Olahraga', jadwal: 'Selasa & Jumat, 15.30 WIB', pembina: 'Agus Riyadi, S.Pd.Jas.', deskripsi: 'Klub futsal binaan sekolah untuk melatih fisik, kerja sama tim, dan turnamen pelajar.' },
  { id: 6, nama: 'Rohis (Kerohanian Islam) & Hadroh', kategori: 'Pilihan', jadwal: 'Rabu, 15.30 WIB', pembina: 'Ust. Ahmad Fauzan, S.Pd.I.', deskripsi: 'Kajian fiqih remaja, tilawatil quran, rebana hadroh kontemporer, dan PHBI sekolah.' }
];

const DATA_PRESTASI_AWAL = [
  { id: 1, judul: 'Medali Emas Olimpiade Sains Nasional (OSN) Biologi', tingkat: 'Tingkat Provinsi', pemenang: 'Aisyah Putri Azzahra (XI MIPA 1)', tahun: '2026', kategori: 'Sains' },
  { id: 2, judul: 'Juara 1 FLS2N Tari Kreasi Tradisional Jawa Tengah', tingkat: 'Tingkat Kabupaten', pemenang: 'Sanggar Tari SMANDAM', tahun: '2026', kategori: 'Seni' },
  { id: 3, judul: 'Juara 2 Lomba Debat Bahasa Indonesia Pelajar', tingkat: 'Karisidenan Semarang', pemenang: 'Tim Debat SMANDAM', tahun: '2025', kategori: 'Bahasa' },
  { id: 4, judul: 'Runner-Up Kejuaraan Bola Basket Pelajar Demak-Semarang Cup', tingkat: 'Tingkat Regional', pemenang: 'Tim Basket Putra', tahun: '2026', kategori: 'Olahraga' },
  { id: 5, judul: 'Juara Umum Kemah Bakti Pramuka Penegak Bantara', tingkat: 'Tingkat Kabupaten', pemenang: 'Gugus Depan SMANDAM', tahun: '2025', kategori: 'Pramuka' }
];

const DATA_BERITA_AWAL = [
  { id: 1, judul: 'Pengumuman Resmi SPMB & PPDB SMA Negeri 2 Mranggen 2026/2027', kategori: 'Pengumuman', tanggal: '8 Oktober 2026', penulis: 'Humas SMANDAM', ringkasan: 'Dinas Pendidikan Provinsi Jawa Tengah resmi membuka informasi alur SPMB SMA Negeri 2 Mranggen.' },
  { id: 2, judul: 'Siswa SMA Negeri 2 Mranggen Raih Medali Emas Olimpiade Sains', kategori: 'Prestasi', tanggal: '4 Oktober 2026', penulis: 'Tim Kesiswaan', ringkasan: 'Delegasi sains SMANDAM mengharumkan nama sekolah dengan medali emas bidang biologi.' },
  { id: 3, judul: 'Edukasi Remaja Sehat: Kolaborasi Mahasiswa USM dan SMA N 2 Mranggen', kategori: 'Kegiatan', tanggal: '28 September 2026', penulis: 'Redaksi Sekolah', ringkasan: 'Program pengabdian masyarakat mengenai pertemanan sehat dan anti perundungan (anti-bullying).' },
  { id: 4, judul: 'Gelar Karya P5: Siswa SMANDAM Tampilkan Inovasi Daur Ulang', kategori: 'Akademik', tanggal: '22 September 2026', penulis: 'Kurikulum', ringkasan: 'Ratusan karya kreasi Proyek Profil Pelajar Pancasila dipamerkan dengan sentuhan kearifan lokal.' }
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('guru'); // 'guru' | 'ekskul' | 'prestasi' | 'berita'
  const [searchQuery, setSearchQuery] = useState('');
  const [pesan, setPesan] = useState('');

  // State data dengan sinkronisasi LocalStorage
  const [gurus, setGurus] = useState(DATA_GURU_AWAL);
  const [ekskuls, setEkskuls] = useState(DATA_EKSKUL_AWAL);
  const [prestasis, setPrestasis] = useState(DATA_PRESTASI_AWAL);
  const [beritas, setBeritas] = useState(DATA_BERITA_AWAL);

  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [ingatSaya, setIngatSaya] = useState(true);
  const [loginError, setLoginError] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [editId, setEditId] = useState(null);

  // Form Fields
  const [formData, setFormData] = useState({});

  // Muat status login dan data tersimpan dari browser (LocalStorage)
  useEffect(() => {
    try {
      const isAuth = localStorage.getItem('smandam_admin_session') === 'true' || sessionStorage.getItem('smandam_admin_session') === 'true';
      if (isAuth) setIsLoggedIn(true);

      const g = localStorage.getItem('smandam_next_gurus');
      if (g) setGurus(JSON.parse(g));
      const e = localStorage.getItem('smandam_next_ekskuls');
      if (e) setEkskuls(JSON.parse(e));
      const p = localStorage.getItem('smandam_next_prestasis');
      if (p) setPrestasis(JSON.parse(p));
      const b = localStorage.getItem('smandam_next_beritas');
      if (b) setBeritas(JSON.parse(b));
    } catch (err) {
      console.log('LocalStorage load error', err);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setLoginError('');
      if (ingatSaya) {
        localStorage.setItem('smandam_admin_session', 'true');
      } else {
        sessionStorage.setItem('smandam_admin_session', 'true');
      }
    } else {
      setLoginError('Username atau kata sandi salah. Silakan coba: admin / admin123');
    }
  };

  const handleQuickLogin = () => {
    setUsername('admin');
    setPassword('admin123');
    setIsLoggedIn(true);
    setLoginError('');
    localStorage.setItem('smandam_admin_session', 'true');
  };

  const handleLogout = () => {
    if (confirm('Keluar dari sesi Dashboard Administrator?')) {
      localStorage.removeItem('smandam_admin_session');
      sessionStorage.removeItem('smandam_admin_session');
      setIsLoggedIn(false);
      setUsername('');
      setPassword('');
      setLoginError('');
    }
  };

  const tampilkanNotif = (teks) => {
    setPesan(teks);
    setTimeout(() => setPesan(''), 3000);
  };

  // Simpan ke LocalStorage dan kirim event sinkronisasi real-time
  const simpanGuru = (dataBaru) => {
    setGurus(dataBaru);
    localStorage.setItem('smandam_next_gurus', JSON.stringify(dataBaru));
    window.dispatchEvent(new Event('smandam_guru_updated'));
    window.dispatchEvent(new Event('school_data_updated'));
  };
  const simpanEkskul = (dataBaru) => {
    setEkskuls(dataBaru);
    localStorage.setItem('smandam_next_ekskuls', JSON.stringify(dataBaru));
    window.dispatchEvent(new Event('smandam_ekskul_updated'));
    window.dispatchEvent(new Event('school_data_updated'));
  };
  const simpanPrestasi = (dataBaru) => {
    setPrestasis(dataBaru);
    localStorage.setItem('smandam_next_prestasis', JSON.stringify(dataBaru));
    window.dispatchEvent(new Event('smandam_prestasi_updated'));
    window.dispatchEvent(new Event('school_data_updated'));
  };
  const simpanBerita = (dataBaru) => {
    setBeritas(dataBaru);
    localStorage.setItem('smandam_next_beritas', JSON.stringify(dataBaru));
    window.dispatchEvent(new Event('smandam_berita_updated'));
    window.dispatchEvent(new Event('school_data_updated'));
  };

  // Reset Data Default
  const handleReset = () => {
    if (confirm('Kembalikan semua data ke setelan default awal sekolah?')) {
      simpanGuru(DATA_GURU_AWAL);
      simpanEkskul(DATA_EKSKUL_AWAL);
      simpanPrestasi(DATA_PRESTASI_AWAL);
      simpanBerita(DATA_BERITA_AWAL);
      tampilkanNotif('Semua data berhasil di-reset ke setelan awal!');
    }
  };

  // Buka Modal Tambah
  const handleBukaTambah = () => {
    setModalMode('add');
    setEditId(null);
    if (activeTab === 'guru') {
      setFormData({ nama: '', jabatan: 'Guru Pengajar', mapel: '', nip: '' });
    } else if (activeTab === 'ekskul') {
      setFormData({ nama: '', kategori: 'Pilihan', jadwal: 'Jumat, 15.30 WIB', pembina: '', deskripsi: '' });
    } else if (activeTab === 'prestasi') {
      setFormData({ judul: '', tingkat: 'Tingkat Kabupaten', pemenang: '', tahun: '2026', kategori: 'Sains' });
    } else if (activeTab === 'berita') {
      setFormData({ judul: '', kategori: 'Pengumuman', tanggal: 'Oktober 2026', penulis: 'Humas SMANDAM', ringkasan: '' });
    }
    setIsModalOpen(true);
  };

  // Buka Modal Edit
  const handleBukaEdit = (item) => {
    setModalMode('edit');
    setEditId(item.id);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  // Hapus Data
  const handleHapus = (id) => {
    if (confirm('Yakin ingin menghapus item ini?')) {
      if (activeTab === 'guru') {
        simpanGuru(gurus.filter(item => item.id !== id));
        tampilkanNotif('Data Guru berhasil dihapus');
      } else if (activeTab === 'ekskul') {
        simpanEkskul(ekskuls.filter(item => item.id !== id));
        tampilkanNotif('Data Ekstrakurikuler berhasil dihapus');
      } else if (activeTab === 'prestasi') {
        simpanPrestasi(prestasis.filter(item => item.id !== id));
        tampilkanNotif('Data Prestasi berhasil dihapus');
      } else if (activeTab === 'berita') {
        simpanBerita(beritas.filter(item => item.id !== id));
        tampilkanNotif('Data Berita berhasil dihapus');
      }
    }
  };

  // Simpan Form (Tambah / Edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'guru') {
      if (modalMode === 'add') {
        simpanGuru([{ id: Date.now(), ...formData }, ...gurus]);
        tampilkanNotif('Guru baru berhasil ditambahkan!');
      } else {
        simpanGuru(gurus.map(g => g.id === editId ? { ...g, ...formData } : g));
        tampilkanNotif('Data Guru berhasil diperbarui!');
      }
    } else if (activeTab === 'ekskul') {
      if (modalMode === 'add') {
        simpanEkskul([{ id: Date.now(), ...formData }, ...ekskuls]);
        tampilkanNotif('Ekstrakurikuler berhasil ditambahkan!');
      } else {
        simpanEkskul(ekskuls.map(ek => ek.id === editId ? { ...ek, ...formData } : ek));
        tampilkanNotif('Data Ekstrakurikuler diperbarui!');
      }
    } else if (activeTab === 'prestasi') {
      if (modalMode === 'add') {
        simpanPrestasi([{ id: Date.now(), ...formData }, ...prestasis]);
        tampilkanNotif('Prestasi baru berhasil ditambahkan!');
      } else {
        simpanPrestasi(prestasis.map(p => p.id === editId ? { ...p, ...formData } : p));
        tampilkanNotif('Data Prestasi berhasil diperbarui!');
      }
    } else if (activeTab === 'berita') {
      if (modalMode === 'add') {
        simpanBerita([{ id: Date.now(), ...formData }, ...beritas]);
        tampilkanNotif('Berita baru berhasil diterbitkan!');
      } else {
        simpanBerita(beritas.map(b => b.id === editId ? { ...b, ...formData } : b));
        tampilkanNotif('Data Berita berhasil diperbarui!');
      }
    }
    setIsModalOpen(false);
  };

  // Tampilan Login Jika Belum Masuk
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="max-w-md w-full relative z-10">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8">
            {/* Header / Logo */}
            <div className="text-center space-y-3 mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-950 border border-blue-500/30 text-yellow-400 text-2xl font-black">
                🛡️
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-yellow-400 text-blue-950">
                  SMANDAM Portal
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white mt-1.5">
                  Login Administrator
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Masuk untuk mengelola data Guru, Ekskul, Prestasi, dan Berita SMA Negeri 2 Mranggen.
                </p>
              </div>
            </div>

            {/* Error Banner */}
            {loginError && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/70 border border-red-700 text-red-200 text-xs flex items-center gap-2">
                <span>⚠️ {loginError}</span>
              </div>
            )}

            {/* Form Login */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Username Administrator
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username (contoh: admin)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Kata Sandi
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi (contoh: admin123)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 pr-14 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs font-bold"
                  >
                    {showPassword ? 'Tutup' : 'Lihat'}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={ingatSaya}
                    onChange={(e) => setIngatSaya(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-950 text-blue-600"
                  />
                  <span>Ingat sesi masuk</span>
                </label>
                <span className="text-[11px] text-slate-500">Aman & Terenkripsi</span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-lg shadow-blue-600/30"
              >
                🔐 Masuk ke Dashboard
              </button>
            </form>

            {/* Kotak Akses Cepat */}
            <div className="mt-5 pt-4 border-t border-slate-800/80">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-300">🔑 Kredensial Bawaan:</span>
                  <span className="text-[10px] bg-blue-900/60 text-blue-300 px-1.5 py-0.5 rounded border border-blue-700/50">Admin Ready</span>
                </div>
                <div className="flex justify-between font-mono text-[11px] text-slate-300">
                  <span>Username: <strong className="text-yellow-400">admin</strong></span>
                  <span>Password: <strong className="text-yellow-400">admin123</strong></span>
                </div>
                <button
                  type="button"
                  onClick={handleQuickLogin}
                  className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-yellow-400 hover:text-yellow-300 font-bold text-[11px] transition border border-slate-700 mt-1"
                >
                  ⚡ Masuk Langsung (Akun Bawaan)
                </button>
              </div>
            </div>

            {/* Tautan Kembali ke Beranda */}
            <div className="mt-5 text-center">
              <Link
                href="/"
                className="text-xs font-semibold text-slate-400 hover:text-white transition inline-flex items-center gap-1.5"
              >
                &larr; Kembali ke Website Utama
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tampilan Dashboard Lengkap (Setelah Login)
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* 1. Header Bar Dashboard Admin */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs font-bold border border-slate-700"
              title="Kembali ke Beranda"
            >
              &larr; Web Utama
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-yellow-400 text-blue-950 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
                  Admin SMANDAM
                </span>
                <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
                  SMA Negeri 2 Mranggen
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-black text-white">
                Dashboard Manajemen Sekolah
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
              title="Kembalikan data default"
            >
              Reset Default
            </button>
            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow"
            >
              Lihat Website &rarr;
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-200 text-xs font-bold transition"
              title="Keluar dari sesi Admin"
            >
              Keluar
            </button>
          </div>
        </div>
      </header>

      {/* 2. Konten Utama Dashboard */}
      <main className="max-w-6xl mx-auto px-4 pt-8 space-y-6">
        {/* Notifikasi Toast */}
        {pesan && (
          <div className="p-3.5 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs sm:text-sm font-semibold shadow-lg">
            ✓ {pesan}
          </div>
        )}

        {/* 4 Kartu Statistik */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            onClick={() => setActiveTab('guru')}
            className={'p-4 rounded-xl border transition cursor-pointer ' + (activeTab === 'guru' ? 'bg-blue-950/70 border-blue-500 ring-2 ring-blue-500/30' : 'bg-slate-900 border-slate-800 hover:border-slate-700')}
          >
            <span className="text-[11px] text-slate-400 font-bold uppercase">Total Guru</span>
            <div className="text-2xl font-black text-white mt-1">{gurus.length}</div>
            <p className="text-[10px] text-blue-400 font-medium">Pendidik & Staf</p>
          </div>

          <div
            onClick={() => setActiveTab('ekskul')}
            className={'p-4 rounded-xl border transition cursor-pointer ' + (activeTab === 'ekskul' ? 'bg-amber-950/70 border-amber-500 ring-2 ring-amber-500/30' : 'bg-slate-900 border-slate-800 hover:border-slate-700')}
          >
            <span className="text-[11px] text-slate-400 font-bold uppercase">Ekstrakurikuler</span>
            <div className="text-2xl font-black text-white mt-1">{ekskuls.length}</div>
            <p className="text-[10px] text-amber-400 font-medium">Klub & Peminatan</p>
          </div>

          <div
            onClick={() => setActiveTab('prestasi')}
            className={'p-4 rounded-xl border transition cursor-pointer ' + (activeTab === 'prestasi' ? 'bg-yellow-950/70 border-yellow-500 ring-2 ring-yellow-500/30' : 'bg-slate-900 border-slate-800 hover:border-slate-700')}
          >
            <span className="text-[11px] text-slate-400 font-bold uppercase">Prestasi Siswa</span>
            <div className="text-2xl font-black text-white mt-1">{prestasis.length}</div>
            <p className="text-[10px] text-yellow-400 font-medium">Kejuaraan Tercatat</p>
          </div>

          <div
            onClick={() => setActiveTab('berita')}
            className={'p-4 rounded-xl border transition cursor-pointer ' + (activeTab === 'berita' ? 'bg-emerald-950/70 border-emerald-500 ring-2 ring-emerald-500/30' : 'bg-slate-900 border-slate-800 hover:border-slate-700')}
          >
            <span className="text-[11px] text-slate-400 font-bold uppercase">Berita & SPMB</span>
            <div className="text-2xl font-black text-white mt-1">{beritas.length}</div>
            <p className="text-[10px] text-emerald-400 font-medium">Artikel Terbit</p>
          </div>
        </div>

        {/* Tab Switcher & Toolbar */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-3 flex flex-wrap items-center justify-between gap-3">
          {/* Tab Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => { setActiveTab('guru'); setSearchQuery(''); }}
              className={'px-3.5 py-1.5 rounded-lg text-xs font-bold transition ' + (activeTab === 'guru' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-800')}
            >
              Guru ({gurus.length})
            </button>
            <button
              onClick={() => { setActiveTab('ekskul'); setSearchQuery(''); }}
              className={'px-3.5 py-1.5 rounded-lg text-xs font-bold transition ' + (activeTab === 'ekskul' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-800')}
            >
              Ekstrakurikuler ({ekskuls.length})
            </button>
            <button
              onClick={() => { setActiveTab('prestasi'); setSearchQuery(''); }}
              className={'px-3.5 py-1.5 rounded-lg text-xs font-bold transition ' + (activeTab === 'prestasi' ? 'bg-yellow-500 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white hover:bg-slate-800')}
            >
              Prestasi ({prestasis.length})
            </button>
            <button
              onClick={() => { setActiveTab('berita'); setSearchQuery(''); }}
              className={'px-3.5 py-1.5 rounded-lg text-xs font-bold transition ' + (activeTab === 'berita' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-800')}
            >
              Berita ({beritas.length})
            </button>
          </div>

          {/* Search & Tombol Tambah */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Cari data..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-48 bg-slate-950 border border-slate-800 text-white rounded-lg px-3 py-1.5 text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleBukaTambah}
              className="bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-extrabold text-xs px-3.5 py-1.5 rounded-lg transition shadow shrink-0"
            >
              + Tambah Data
            </button>
          </div>
        </div>

        {/* TABEL GURU */}
        {activeTab === 'guru' && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow">
            <div className="p-3.5 border-b border-slate-800 flex justify-between items-center text-xs">
              <span className="font-bold text-white">Daftar Dewan Guru & Pendidik</span>
              <span className="text-slate-400">Total {gurus.length} Orang</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Nama Lengkap & NIP</th>
                    <th className="py-2.5 px-3">Jabatan</th>
                    <th className="py-2.5 px-3">Mata Pelajaran</th>
                    <th className="py-2.5 px-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {gurus
                    .filter(g => g.nama.toLowerCase().includes(searchQuery.toLowerCase()) || (g.mapel && g.mapel.toLowerCase().includes(searchQuery.toLowerCase())))
                    .map((guru) => (
                      <tr key={guru.id} className="hover:bg-slate-800/60 transition">
                        <td className="py-3 px-3">
                          <div className="font-bold text-white">{guru.nama}</div>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5">{guru.nip || 'NIP: -'}</div>
                        </td>
                        <td className="py-3 px-3 text-slate-300">{guru.jabatan}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-semibold">
                            {guru.mapel || '-'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <div className="inline-flex gap-1.5">
                            <button
                              onClick={() => handleBukaEdit(guru)}
                              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-yellow-400 text-xs font-semibold"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleHapus(guru.id)}
                              className="px-2 py-1 rounded bg-slate-800 hover:bg-red-900/60 text-red-400 text-xs font-semibold"
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TABEL EKSTRAKURIKULER */}
        {activeTab === 'ekskul' && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow">
            <div className="p-3.5 border-b border-slate-800 flex justify-between items-center text-xs">
              <span className="font-bold text-white">Daftar Kegiatan Ekstrakurikuler</span>
              <span className="text-slate-400">Total {ekskuls.length} Unit</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Nama Ekskul & Kategori</th>
                    <th className="py-2.5 px-3">Jadwal Latihan</th>
                    <th className="py-2.5 px-3">Pembina</th>
                    <th className="py-2.5 px-3">Deskripsi</th>
                    <th className="py-2.5 px-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {ekskuls
                    .filter(e => e.nama.toLowerCase().includes(searchQuery.toLowerCase()) || e.kategori.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((ekskul) => (
                      <tr key={ekskul.id} className="hover:bg-slate-800/60 transition">
                        <td className="py-3 px-3">
                          <div className="font-bold text-white">{ekskul.nama}</div>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 mt-1 inline-block">
                            {ekskul.kategori}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">{ekskul.jadwal}</td>
                        <td className="py-3 px-3 text-slate-400">{ekskul.pembina}</td>
                        <td className="py-3 px-3 text-slate-400 max-w-xs truncate">{ekskul.deskripsi}</td>
                        <td className="py-3 px-3 text-center">
                          <div className="inline-flex gap-1.5">
                            <button
                              onClick={() => handleBukaEdit(ekskul)}
                              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-yellow-400 text-xs font-semibold"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleHapus(ekskul.id)}
                              className="px-2 py-1 rounded bg-slate-800 hover:bg-red-900/60 text-red-400 text-xs font-semibold"
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TABEL PRESTASI */}
        {activeTab === 'prestasi' && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow">
            <div className="p-3.5 border-b border-slate-800 flex justify-between items-center text-xs">
              <span className="font-bold text-white">Daftar Prestasi & Penghargaan Siswa</span>
              <span className="text-slate-400">Total {prestasis.length} Prestasi</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Nama Kejuaraan / Lomba</th>
                    <th className="py-2.5 px-3">Tingkat & Tahun</th>
                    <th className="py-2.5 px-3">Pemenang / Siswa</th>
                    <th className="py-2.5 px-3">Bidang</th>
                    <th className="py-2.5 px-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {prestasis
                    .filter(p => p.judul.toLowerCase().includes(searchQuery.toLowerCase()) || (p.pemenang && p.pemenang.toLowerCase().includes(searchQuery.toLowerCase())))
                    .map((prestasi) => (
                      <tr key={prestasi.id} className="hover:bg-slate-800/60 transition">
                        <td className="py-3 px-3 font-bold text-white max-w-sm">{prestasi.judul}</td>
                        <td className="py-3 px-3">
                          <span className="font-bold text-yellow-400 block">{prestasi.tingkat}</span>
                          <span className="text-[11px] text-slate-400">{prestasi.tahun}</span>
                        </td>
                        <td className="py-3 px-3 text-blue-300 font-semibold">{prestasi.pemenang || prestasi.peraih}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            {prestasi.kategori || 'Umum'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <div className="inline-flex gap-1.5">
                            <button
                              onClick={() => handleBukaEdit(prestasi)}
                              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-yellow-400 text-xs font-semibold"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleHapus(prestasi.id)}
                              className="px-2 py-1 rounded bg-slate-800 hover:bg-red-900/60 text-red-400 text-xs font-semibold"
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TABEL BERITA */}
        {activeTab === 'berita' && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow">
            <div className="p-3.5 border-b border-slate-800 flex justify-between items-center text-xs">
              <span className="font-bold text-white">Daftar Berita & Pengumuman Sekolah</span>
              <span className="text-slate-400">Total {beritas.length} Berita</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Judul Berita & Kategori</th>
                    <th className="py-2.5 px-3">Tanggal</th>
                    <th className="py-2.5 px-3">Penulis</th>
                    <th className="py-2.5 px-3">Ringkasan</th>
                    <th className="py-2.5 px-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {beritas
                    .filter(b => b.judul.toLowerCase().includes(searchQuery.toLowerCase()) || b.kategori.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((berita) => (
                      <tr key={berita.id} className="hover:bg-slate-800/60 transition">
                        <td className="py-3 px-3">
                          <div className="font-bold text-white max-w-sm truncate">{berita.judul}</div>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 mt-1 inline-block">
                            {berita.kategori}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-400">{berita.tanggal}</td>
                        <td className="py-3 px-3 text-slate-300 font-semibold">{berita.penulis}</td>
                        <td className="py-3 px-3 text-slate-400 max-w-xs truncate">{berita.ringkasan}</td>
                        <td className="py-3 px-3 text-center">
                          <div className="inline-flex gap-1.5">
                            <button
                              onClick={() => handleBukaEdit(berita)}
                              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-yellow-400 text-xs font-semibold"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleHapus(berita.id)}
                              className="px-2 py-1 rounded bg-slate-800 hover:bg-red-900/60 text-red-400 text-xs font-semibold"
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* MODAL FORM TAMBAH / EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">
                {modalMode === 'add' ? 'Tambah Data' : 'Edit Data'} — {activeTab.toUpperCase()}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              {/* Form Tab GURU */}
              {activeTab === 'guru' && (
                <>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Nama Lengkap & Gelar *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Drs. Sugiharto, M.Pd."
                      value={formData.nama || ''}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">NIP (Opsional)</label>
                    <input
                      type="text"
                      placeholder="Contoh: 19680512 199412 1 002"
                      value={formData.nip || ''}
                      onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Jabatan / Tugas</label>
                    <input
                      type="text"
                      placeholder="Kepala Sekolah / Guru Pengajar"
                      value={formData.jabatan || ''}
                      onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Mata Pelajaran Diampu</label>
                    <input
                      type="text"
                      placeholder="Contoh: Matematika / Kimia"
                      value={formData.mapel || ''}
                      onChange={(e) => setFormData({ ...formData, mapel: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                </>
              )}

              {/* Form Tab EKSKUL */}
              {activeTab === 'ekskul' && (
                <>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Nama Ekstrakurikuler *</label>
                    <input
                      type="text"
                      required
                      placeholder="PMR / Pramuka / Basket"
                      value={formData.nama || ''}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Kategori</label>
                      <select
                        value={formData.kategori || 'Pilihan'}
                        onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                      >
                        <option value="Wajib">Wajib</option>
                        <option value="Pilihan">Pilihan</option>
                        <option value="Olahraga">Olahraga</option>
                        <option value="Seni">Seni</option>
                        <option value="Keagamaan">Keagamaan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Jadwal Latihan</label>
                      <input
                        type="text"
                        placeholder="Jumat, 15.30 WIB"
                        value={formData.jadwal || ''}
                        onChange={(e) => setFormData({ ...formData, jadwal: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Guru / Pelatih Pembina</label>
                    <input
                      type="text"
                      placeholder="Nama pembina..."
                      value={formData.pembina || ''}
                      onChange={(e) => setFormData({ ...formData, pembina: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Deskripsi Kegiatan *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Deskripsi singkat ekskul..."
                      value={formData.deskripsi || ''}
                      onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                </>
              )}

              {/* Form Tab PRESTASI */}
              {activeTab === 'prestasi' && (
                <>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Nama Kejuaraan *</label>
                    <input
                      type="text"
                      required
                      placeholder="Juara 1 Lomba Cepat Tepat"
                      value={formData.judul || ''}
                      onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Tingkat</label>
                      <select
                        value={formData.tingkat || 'Tingkat Kabupaten'}
                        onChange={(e) => setFormData({ ...formData, tingkat: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                      >
                        <option value="Tingkat Kabupaten">Tingkat Kabupaten</option>
                        <option value="Karisidenan">Karisidenan</option>
                        <option value="Tingkat Provinsi">Tingkat Provinsi</option>
                        <option value="Tingkat Nasional">Tingkat Nasional</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Tahun</label>
                      <input
                        type="text"
                        placeholder="2026"
                        value={formData.tahun || '2026'}
                        onChange={(e) => setFormData({ ...formData, tahun: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Pemenang / Siswa *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama siswa atau tim..."
                      value={formData.pemenang || ''}
                      onChange={(e) => setFormData({ ...formData, pemenang: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Bidang / Kategori</label>
                    <input
                      type="text"
                      placeholder="Sains / Seni / Olahraga"
                      value={formData.kategori || ''}
                      onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                </>
              )}

              {/* Form Tab BERITA */}
              {activeTab === 'berita' && (
                <>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Judul Berita *</label>
                    <input
                      type="text"
                      required
                      placeholder="Judul artikel atau pengumuman..."
                      value={formData.judul || ''}
                      onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Kategori</label>
                      <select
                        value={formData.kategori || 'Pengumuman'}
                        onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                      >
                        <option value="Pengumuman">Pengumuman</option>
                        <option value="Prestasi">Prestasi</option>
                        <option value="Kegiatan">Kegiatan</option>
                        <option value="Akademik">Akademik</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Penulis</label>
                      <input
                        type="text"
                        placeholder="Humas SMANDAM"
                        value={formData.penulis || 'Humas SMANDAM'}
                        onChange={(e) => setFormData({ ...formData, penulis: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Ringkasan Berita *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Ringkasan isi berita..."
                      value={formData.ringkasan || ''}
                      onChange={(e) => setFormData({ ...formData, ringkasan: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                </>
              )}

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-bold shadow"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}