import Link from 'next/link';

export default function Navbar({ setCurrentSection }) {
  return (
    <nav className="p-4 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <button onClick={() => setCurrentSection('home')}>
              <h2 className="text-white font-bold text-xl">DiegoM</h2>
            </button>
          </div>
          <div className="flex justify-between items-center space-x-4">
            <button onClick={() => setCurrentSection('home')} className="text-white">
              Inicio
            </button>
            <button onClick={() => setCurrentSection('about')} className="text-white hover:text-cyan-400 transition">
              Sobre mí
            </button>
            {/* Si tienes más secciones, puedes agregar más botones aquí */}
          </div>
        </div>
      </div>
    </nav>
  );
}
