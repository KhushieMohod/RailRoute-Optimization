import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'RailRoute | Transit Optimization Topology',
  description: 'Algorithmic efficiency in railway mapping and optimization.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col relative text-alabaster">
        <div className="bg-grid-overlay"></div>
        <Navbar />
        <main className="flex-1 relative z-10 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
