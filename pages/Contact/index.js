const Cube = dynamic(() => import('@/components/Cube'), { ssr: false });

export default function Home() {
  const rotationRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Define cómo el scroll afecta la rotación
      rotationRef.current.x = scrollY * 0.001; // Rota en el eje X
      rotationRef.current.y = scrollY * 0.001; // Rota en el eje Y
    };

  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-col text-white w-full">

        {/* Sección principal */}
        <div className="flex flex-row items-center justify-center min-h-screen">
          {/* Componente del cubo 3D */}
          <div className="flex flex-row items-center justify-center min-h-screen">
            <Cube rotation={rotationRef} />
          </div>
        </div>

      </main>

      <footer className="w-full h-12 flex justify-center items-center bg-gray-900">
        <p className="text-sm text-white">DiegoM</p>
      </footer>
    </div>
  );
}
