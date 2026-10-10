import { profilSekolah } from '@/data/beritaData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-sm py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-white text-base mb-2">{profilSekolah.nama}</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">"{profilSekolah.slogan}"</p>
            <span className="px-2.5 py-1 bg-slate-800 text-cyan-400 text-xs font-semibold rounded">
              {profilSekolah.akreditasi}
            </span>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Alamat Sekolah</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{profilSekolah.alamat}</p>
            <p className="text-xs text-slate-400 mt-2">Telp: {profilSekolah.telepon}</p>
            <p className="text-xs text-slate-400">Email: {profilSekolah.email}</p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Media Sosial</h4>
            <p className="text-xs text-slate-400">Instagram: {profilSekolah.instagram}</p>
            <p className="text-xs text-slate-400">YouTube: {profilSekolah.youtube}</p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          © {currentYear} {profilSekolah.nama} Demak. All rights reserved.
        </div>
      </div>
    </footer>
  );
}