import Link from 'next/link';
import Hero from '../components/Hero';
import BeritaCard from '../components/BeritaCard';
import { daftarBerita } from '@/data/berita';

export default function HomePage() {
  // Ambil minimal 3 berita terbaru untuk beranda sesuai petunjuk tugas
  const beritaTerbaru = daftarBerita.slice(0, 3);

  return (
    <div>
      {/* 1. Hero / Banner Sekolah */}
      <Hero />

      {/* 2. Slogan & Highlight Keunggulan */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 text-white py-10 px-4 shadow-inner">
        <div className="max-w-6xl mx-auto text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest bg-yellow-500 text-blue-950 px-3 py-1 rounded-full">
            Motto Pendidikan SMANDAM
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-yellow-300">
            "Cerdas, Berkarakter, Berakhlak Mulia, dan Berprestasi"
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto text-sm md:text-base">
            Membentuk generasi pembelajar sepanjang hayat yang unggul dalam ilmu pengetahuan dan berakar kuat pada nilai-nilai Pancasila.
          </p>
        </div>
      </section>

      {/* 3. Sambutan Singkat Kepala Sekolah & Tentang Sekolah */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          {/* Foto Kepala Sekolah */}
          <div className="md:col-span-5 text-center">
            <div className="relative inline-block">
              <div className="w-56 h-72 md:w-64 md:h-80 mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-400 bg-slate-200">
                <img
                  src="/images/Pak-Prayit-3x4-1.jpg"
                  alt="Kepala Sekolah SMA Negeri 2 Mranggen"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 bg-white p-3 rounded-xl shadow-md border border-slate-200">
                <h4 className="font-bold text-slate-900 text-base">Prayitno, S.Pd, M.Pd.</h4>
                <p className="text-xs text-blue-800 font-semibold">Kepala SMA Negeri 2 Mranggen</p>
              </div>
            </div>
          </div>

          {/* Sambutan & Tentang Singkat */}
          <div className="md:col-span-7 space-y-5">
            <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-md">
              Sambutan Kepala Sekolah
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white-900 leading-tight">
              Selamat Datang di Portal Resmi SMA Negeri 2 Mranggen
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              Puji syukur kehadirat Allah SWT, berkat karunia-Nya website SMA Negeri 2 Mranggen hadir sebagai jendela informasi dan transparansi akademik. Kami berkomitmen mewujudkan iklim belajar yang inovatif, ramah anak, dan mendorong setiap siswa meraih potensi tertingginya.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              Berdiri sejak tahun 1992 di Kabupaten Demak, SMANDAM telah terakreditasi "A" dan terus bertransformasi mencetak lulusan berprestasi di tingkat perguruan tinggi negeri maupun dunia profesional.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow transition"
              >
                Baca Profil Lengkap &rarr;
              </Link>
              <Link
                href="/berita"
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm px-5 py-2.5 rounded-lg border border-slate-300 transition"
              >
                Kabar Sekolah
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Berita Terbaru (Minimal 3 Berita di Home sesuai Rubrik UTS) */}
      <section className="bg-slate-100 py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Update Terkini</span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                Berita Terbaru SMANDAM
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Informasi penting seputar kegiatan, akademik, dan prestasi siswa
              </p>
            </div>
            <Link
              href="/berita"
              className="inline-flex items-center text-sm font-bold text-blue-700 hover:text-blue-900 hover:underline"
            >
              Lihat Semua Berita &rarr;
            </Link>
          </div>

          {/* Grid 3 Berita Menggunakan Reusable Component BeritaCard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {beritaTerbaru.map((item) => (
              <BeritaCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
