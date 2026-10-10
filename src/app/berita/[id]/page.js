import Link from 'next/link';
import { daftarBerita } from '@/data/beritaData';

export default async function DetailBeritaPage({ params }) {
  const { id } = await params;
  const berita = daftarBerita.find((item) => String(item.id) === String(id));

  if (!berita) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Berita Tidak Ditemukan</h1>
        <Link href="/berita" className="px-4 py-2 bg-cyan-700 text-white rounded-lg text-sm">
          &larr; Kembali ke Daftar Berita
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center gap-3 mb-3">
        <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-xs font-semibold rounded-full">
          {berita.kategori}
        </span>
        <span className="text-sm text-slate-500">{berita.tanggal}</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
        {berita.judul}
      </h1>

      <div className="rounded-2xl overflow-hidden mb-8 border border-slate-200">
        <img src={berita.gambar} alt={berita.judul} className="w-full h-auto max-h-[460px] object-cover" />
      </div>

      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 mb-10">
        {berita.isiLengkap.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>

      <div className="pt-6 border-t border-slate-200">
        <Link
          href="/berita"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg text-sm transition"
        >
          &larr; Kembali ke Berita
        </Link>
      </div>
    </article>
  );
}