import BeritaCard from '../../components/BeritaCard';
import { daftarBerita } from '../../data/berita';

export const metadata = {
  title: 'Berita & Pengumuman - SMA Negeri 2 Mranggen',
  description: 'Berita terkini, prestasi siswa, dan agenda resmi SMA Negeri 2 Mranggen Demak',
};

export default function BeritaPage() {
  return (
    <div className="py-12 px-4 max-w-6xl mx-auto space-y-8">
      {/* Header Halaman Berita */}
      <div className="text-center space-y-2 border-b border-slate-200 pb-6">
        <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
          Berita & Informasi
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white-900">
          Berita Sekolah Terkini
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto text-sm md:text-base">
          Kumpulan informasi seputar penerimaan siswa, prestasi, dan ragam kegiatan civitas akademika SMA Negeri 2 Mranggen.
        </p>
      </div>

      {/* Grid Berita Minimal 6 Berita sesuai Rubrik Penilaian UTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {daftarBerita.map((item) => (
          <BeritaCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}