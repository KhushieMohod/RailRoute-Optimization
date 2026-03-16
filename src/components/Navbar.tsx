import { Train } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-navy/80 border-b border-slate">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Train className="w-8 h-8 text-cyan group-hover:text-alabaster transition-colors" />
          <span className="text-xl font-bold text-alabaster tracking-wider">RailRoute</span>
        </Link>
        <div className="hidden md:flex space-x-6 text-sm font-medium text-cyan/80">
          <Link href="#problem" className="hover:text-cyan transition-colors">Analysis</Link>
          <Link href="#objectives" className="hover:text-cyan transition-colors">Objectives</Link>
          <Link href="#constraints" className="hover:text-cyan transition-colors">Constraints</Link>
        </div>
      </div>
    </nav>
  );
}
