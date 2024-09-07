import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="p-4 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/">
              <h2 className="text-white font-bold text-xl">DiegoM</h2>
            </Link>
          </div>
          <div className="flex justify-between items-center">
            <Link href="/inicio">
              <h2 className="text-white mr-2">Inicio</h2>
            </Link>
            <Link href="/mi">
              <h2 className="text-white mr-2">Sobre Mi</h2>
            </Link>
            <Link href="/works">
              <h2 className="text-white mr-2">Trabajos</h2>
            </Link>
            <Link href="/contact">
              <h2 className="text-white mr-2">Contacto</h2>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
