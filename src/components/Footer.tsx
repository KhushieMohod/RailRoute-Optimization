export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-slate bg-navy/90 backdrop-blur-sm py-8 mt-20">
      <div className="container mx-auto px-4 text-center text-sm text-cyan/60">
        <p>&copy; {new Date().getFullYear()} RailRoute. All rights reserved.</p>
        <p className="mt-2">Optimizing computational and structural complexities in transit topology.</p>
      </div>
    </footer>
  );
}
