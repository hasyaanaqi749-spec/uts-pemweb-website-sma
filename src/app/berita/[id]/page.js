/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { daftarBerita } from '../../../data/berita';

// Wajib untuk build Vercel agar halaman [id] bisa di-render
export function generateStaticParams() {
  return daftarBerita.map((item) => ({
    id: String(item.id),
  }));
}

export default async function DetailBeritaPage({ params }) {
  // Ambil parameter id dari dynamic route secara aman untuk Vercel
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams?.id;

  // Cari berita yang cocok berdasarkan id
  const berita = daftarBerita.find((item) => String(item.id) === String(id));

  // Jika id tidak ditemukan di data berita
  if (!berita) {
    return (
      <div className="py-20 text-center max-w-lg mx-auto px-4 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Berita Tidak Ditemukan</h2>
        <p className="text-slate-600 text-sm">
          Maaf, artikel yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <Link
          href="/berita"
          className="inline-block bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-blue-800"
        >
          &larr; Kembali ke Daftar Berita
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 max-w-4xl mx-auto space-y-8">
      {/* Breadcrumb navigasi */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-blue-700">Home</Link>
        <span>/</span>
        <Link href="/berita" className="hover:text-blue-700">Berita</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium truncate max-w-xs">{berita.judul}</span>
      </nav>

      {/* Header Berita */}
      <header className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
            {berita.kategori}
          </span>
          <span className="text-xs text-slate-500">
            📅 {berita.tanggal}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
          {berita.judul}
        </h1>
        <p className="text-xs text-slate-500">
          Ditulis oleh: <span className="font-semibold text-slate-700">{berita.penulis}</span>
        </p>
      </header>

      {/* Gambar Utama Berita */}
      <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100 max-h-[480px]">
        <img
          src={berita.gambar}
          alt={berita.judul}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Paragraf Isi Berita Lengkap */}
      <article className="prose max-w-none text-slate-700 leading-relaxed space-y-4 text-base">
        {berita.konten.map((paragraf, index) => (
          <p key={index}>{paragraf}</p>
        ))}
      </article>

      {/* Tombol Wajib Sesuai Rubrik UTS: [Kembali ke Berita] menggunakan next/link */}
      <div className="pt-8 border-t border-slate-200">
        <Link
          href="/berita"
          className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm px-5 py-2.5 rounded-lg border border-slate-300 transition"
        >
          &larr; [Kembali ke Berita]
        </Link>
      </div>
    </div>
  );
}