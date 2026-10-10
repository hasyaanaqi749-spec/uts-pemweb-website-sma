'use client';
import { useState } from 'react';
import Link from 'next/link';
import { profilSekolah } from '@/data/beritaData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-18">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold text-xs">
              S2M
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-base leading-tight block">
                {profilSekolah.nama}
              </span>
              <span className="text-xs text-cyan-700 font-semibold">
                {profilSekolah.singkatan} • Demak
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-semibold text-slate-700 hover:text-cyan-700 transition">Home</Link>
            <Link href="/about" className="text-sm font-semibold text-slate-700 hover:text-cyan-700 transition">About</Link>
            <Link href="/berita" className="text-sm font-semibold text-slate-700 hover:text-cyan-700 transition">Berita</Link>
            <Link href="/about" className="px-4 py-2 text-xs font-bold uppercase bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg">
              SPMB 2026/2027
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}