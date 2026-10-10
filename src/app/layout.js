import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'SMA Negeri 2 Mranggen | SMANDAM Berintegritas',
  description: 'Website Profil Resmi SMA Negeri 2 Mranggen, Demak, Jawa Tengah',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
