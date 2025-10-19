import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Your Luxury Brand',
    template: '%s | Your Luxury Brand',
  },
  description: 'A refined online boutique for timeless clothing.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0b0b0b] text-white`}>
        <div className="min-h-screen flex flex-col">
          <nav className="border-b border-white/10">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
              <Link href="/" className="text-lg tracking-wide font-medium">Your Luxury Brand</Link>
              <div className="text-sm text-white/70">Shop</div>
            </div>
          </nav>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-white/10">
            <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-white/60 flex items-center justify-between">
              <p>© {new Date().getFullYear()} Your Luxury Brand</p>
              <p className="text-[#c8a96a]">Elegance in every stitch</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
