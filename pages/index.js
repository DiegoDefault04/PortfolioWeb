import { useRef, useEffect , useState} from 'react';
import dynamic from 'next/dynamic';
import 'tailwindcss/tailwind.css';
import Navbar from '@/components/Navbar';
import TypingSlider from '@/components/TypingSlider';

const Cube = dynamic(() => import('@/components/Cube'), { ssr: false });

export default function Home() {
  const rotationRef = useRef({ x: 0, y: 0 });
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const phrases = [
    "Full Stack Developer",
    "Fotografo Novato",
    "Backend Developer",
    "Amante de los tacos"
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Define cómo el scroll afecta la rotación
      // Puedes ajustar los factores de multiplicación para obtener el efecto deseado
      rotationRef.current.x = scrollY * 0.001;  // Rota en el eje X
      rotationRef.current.y = scrollY * 0.001;  // Rota en el eje Y
    };
    window.addEventListener('scroll', handleScroll);

    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 3000); // Cambia cada 3000 milisegundos (3 segundos)

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
   
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-cool-gray-900">
        <Navbar />
        <main className="flex flex-row items-center justify-center flex-1 text-white">
          <div className="flex flex-col items-ends">
              <h1 className="text-4xl font-bold">
                Hola!
              </h1>
              <div></div>
              <p className="mt-3 text-lg">
                Mi nombre es Diego Alberto Martinez Hernandez
              </p>
              <div className='bg-cyan-700 h-1 w-160'></div>
                <p className="mt-3 text-lg">
                </p>
                  <div>
                    <TypingSlider />
                  </div>
              </div>
          {/* Componente del cubo 3D giratorio */}
          <div className="flex">
            <Cube rotation={rotationRef} />
          </div>

          {/* Contenido adicional para permitir el scroll */}
        <div className="h-1200"></div> {/* Ajusta la altura según tus necesidades */}
      </main>
  
        <footer className="w-full h-12 flex justify-center items-center border-t">
          <p className="text-sm">
            &copy; 2024 Mi Página Next.js con Tailwind CSS
          </p>
        </footer>
      </div>
    );
  }
  