import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative bg-slate-900 text-white min-h-[460px] flex items-center justify-center overflow-hidden">
      {/* Background Image Gedung SMA Negeri 2 Mranggen */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/smandam.jpg"
          alt="Gedung SMA Negeri 2 Mranggen"
          className="w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-blue-950/70 to-slate-900/60" />
      </div>

      {/* Konten Hero */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 text-center space-y-5">
        <div className="inline-flex items-center gap-2 bg-yellow-400 text-blue-950 text-xs font-extrabold px-3.5 py-1 rounded-full shadow">
          <span>★</span> AKREDITASI A • SEKOLAH PENGGERAK
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          SMA NEGERI 2 MRANGGEN
        </h1>
        <p className="text-yellow-300 font-semibold text-base md:text-lg">
          KABUPATEN DEMAK — JAWA TENGAH
        </p>
        <p className="text-slate-200 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Menciptakan ekosistem pendidikan unggul, berakhlak mulia, dan berkarakter Profil Pelajar Pancasila yang siap bersaing di kancah nasional dan global.
        </p>
      </div>
    </div>
  );
}