import Link from 'next/link';

export const metadata = {
  title: 'Tentang Kami - SMA Negeri 2 Mranggen',
  description: 'Profil, Sejarah, Visi, Misi, dan Fasilitas SMA Negeri 2 Mranggen Demak',
};

export default function AboutPage() {
  return (
    <div className="py-12 px-4 max-w-5xl mx-auto space-y-12">
      {/* Header Halaman */}
      <div className="text-center space-y-2 border-b border-slate-200 pb-8">
        <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
          Profil Sekolah
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white-900">
          Tentang SMA Negeri 2 Mranggen
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
          Mengenal lebih dekat sejarah, visi misi, dan dedikasi SMANDAM dalam memajukan dunia pendidikan di Jawa Tengah.
        </p>
      </div>

      {/* Profil Singkat & Identitas */}
      <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <h2 className="text-xl font-bold text-blue-900 border-l-4 border-yellow-500 pl-3">
          Identitas Sekolah
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="text-xs text-slate-500 block">Nama Resmi</span>
            <span className="font-bold text-slate-800">SMA Negeri 2 Mranggen</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="text-xs text-slate-500 block">NPSN</span>
            <span className="font-bold text-slate-800">20319302</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="text-xs text-slate-500 block">Status Akreditasi</span>
            <span className="font-bold text-emerald-700">A (Amat Baik)</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="text-xs text-slate-500 block">Tahun Berdiri</span>
            <span className="font-bold text-slate-800">1992</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="text-xs text-slate-500 block">Kurikulum</span>
            <span className="font-bold text-slate-800">Kurikulum Merdeka</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <span className="text-xs text-slate-500 block">Kepala Sekolah</span>
            <span className="font-bold text-slate-800">Drs. Sugiharto, M.Pd.</span>
          </div>
        </div>
      </section>

      {/* Sejarah Singkat */}
      <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <h2 className="text-xl font-bold text-blue-900 border-l-4 border-yellow-500 pl-3">
          Sejarah Singkat
        </h2>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          SMA Negeri 2 Mranggen didirikan pada tahun 1992 sebagai jawaban atas tingginya aspirasi masyarakat di perbatasan Kabupaten Demak dan Kota Semarang yang membutuhkan akses pendidikan tingkat menengah atas negeri berkualitas.
        </p>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          Berawal dari sarana yang sederhana, SMANDAM terus berkembang pesat menjadi salah satu sekolah rujukan favorit. Kini sekolah memiliki puluhan rombongan belajar, fasilitas laboratorium mutakhir, lapangan olahraga representatif, serta ribuan alumni sukses di berbagai sektor pengabdian.
        </p>
      </section>

      {/* Visi dan Misi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-6 md:p-8 rounded-2xl shadow-md space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">Cita-Cita Luhur</span>
          <h2 className="text-2xl font-bold text-yellow-300">Visi Sekolah</h2>
          <p className="text-blue-100 text-sm md:text-base leading-relaxed italic">
            "Terwujudnya Peserta Didik yang Beriman dan Bertaqwa, Berkarakter Pancasila, Unggul dalam Prestasi, Mandiri, serta Berwawasan Lingkungan."
          </p>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Langkah Nyata</span>
          <h2 className="text-2xl font-bold text-slate-900">Misi Sekolah</h2>
          <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
            <li>Meningkatkan keimanan dan ketaqwaan kepada Tuhan YME melalui pembiasaan ibadah.</li>
            <li>Melaksanakan pembelajaran berdiferensiasi dan berbasis teknologi digital.</li>
            <li>Mengembangkan potensi minat bakat di bidang sains, olahraga, dan seni.</li>
            <li>Membentuk karakter disiplin, santun, dan peduli lingkungan berbudaya Adiwiyata.</li>
          </ul>
        </div>
      </div>

      {/* Alamat Sekolah */}
      <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <h2 className="text-xl font-bold text-blue-900 border-l-4 border-yellow-500 pl-3">
          Alamat & Lokasi Sekolah
        </h2>
        <div className="text-sm text-slate-700 space-y-2">
          <p className="font-semibold text-slate-900">
            📍 Kampus SMA Negeri 2 Mranggen:
          </p>
          <p className="text-slate-600">
            Jl. Pucang Anom Timur Raya No. 1, Desa Batursari, Kecamatan Mranggen, Kabupaten Demak, Jawa Tengah 59567
          </p>
          <p className="text-slate-600">
            ☎️ Telepon: (024) 76743810 | ✉️ Email: info@sman2mranggen.sch.id
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
          >
            Lihat Berita Kegiatan &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}