import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t-4 border-yellow-400">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800">
        {/* Kolom 1: Nama & Profil Singkat */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white p-1">
              <img src="/images/logo sma n 2 mranggen.jpeg" alt="Logo SMANDAM" className="w-full h-full object-contain" />
            </div>
            <h3 className="font-bold text-white text-base">
              SMA NEGERI 2 MRANGGEN
            </h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Mewujudkan insan beriman, berkarakter Pancasila, unggul dalam prestasi akademik dan non-akademik, serta peduli pelestarian lingkungan.
          </p>
        </div>

        {/* Kolom 2: Alamat Sekolah */}
        <div className="space-y-2 text-xs">
          <h4 className="font-bold text-white text-sm">Alamat Sekolah</h4>
          <p className="text-slate-400">
            Jl. Pucang Anom Timur Raya No. 1, Batursari, Kec. Mranggen, Kabupaten Demak, Jawa Tengah 59567
          </p>
          <p className="text-slate-400">Telp: (024) 76743810</p>
          <p className="text-slate-400">Email: info@sman2mranggen.sch.id</p>
        </div>

        {/* Kolom 3: Tautan Cepat */}
        <div className="space-y-2 text-xs">
          <h4 className="font-bold text-white text-sm">Navigasi Halaman</h4>
          <ul className="space-y-1.5">
            <li><Link href="/" className="hover:text-yellow-400 transition">&rarr; Beranda (Home)</Link></li>
            <li><Link href="/about" className="hover:text-yellow-400 transition">&rarr; Profil & Visi Misi</Link></li>
            <li><Link href="/berita" className="hover:text-yellow-400 transition">&rarr; Berita Terkini</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright sesuai ketentuan */}
      <div className="max-w-6xl mx-auto px-4 pt-6 text-center text-xs text-slate-500">
        <p>&copy; 2026 SMA Negeri 2 Mranggen Demak. Hak Cipta Dilindungi.</p>
        <p className="mt-1 text-[11px] text-slate-600">Dibuat untuk Tugas UTS Pemrograman Web - UNNES</p>
      </div>
    </footer>
  );
}