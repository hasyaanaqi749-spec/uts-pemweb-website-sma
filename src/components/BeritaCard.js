import Link from 'next/link';

export default function BeritaCard({ item }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 border border-slate-200 flex flex-col">
      {/* Gambar Berita */}
      <div className="h-48 overflow-hidden bg-slate-100 relative">
        <img
          src={item.gambar}
          alt={item.judul}
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />
        <span className="absolute top-3 left-3 bg-blue-900/90 text-yellow-300 text-[11px] font-bold px-2.5 py-1 rounded">
          {item.kategori}
        </span>
      </div>

      {/* Konten Kartu */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          {/* Tanggal Rilis */}
          <span className="text-xs text-slate-500 block">
            📅 {item.tanggal}
          </span>

          {/* Judul Berita */}
          <h4 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 hover:text-blue-700">
            <Link href={`/berita/${item.id}`}>
              {item.judul}
            </Link>
          </h4>

          {/* Ringkasan Berita */}
          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
            {item.ringkasan}
          </p>
        </div>

        {/* Tombol Baca Selengkapnya sesuai Petunjuk Tugas */}
        <div className="pt-2 border-t border-slate-100">
          <Link
            href={`/berita/${item.id}`}
            className="inline-flex items-center text-xs font-bold text-blue-700 hover:text-blue-900 gap-1 group"
          >
            Baca Selengkapnya
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}