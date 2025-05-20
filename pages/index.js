import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "tailwindcss/tailwind.css";
import Navbar from "@/components/Navbar";
import TypingSlider from "@/components/TypingSlider";

const Cube = dynamic(() => import("@/components/Cube"), { ssr: false });
const AboutMe = dynamic(() => import("./AboutMe"), { ssr: false });

export default function Home() {
  const rotationRef = useRef({ x: 0, y: 0 });
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentSection, setCurrentSection] = useState("home"); // Nueva gestión de sección

  const phrases = [
    "Full Stack Developer 👨‍💻",
    "Fotógrafo Novato 📸",
    "Backend Developer 🖥️",
    "Amante de los tacos 🌮",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let isThrottled = false;

    const handleWheel = (e) => {
      if (isThrottled) return;

      if (e.deltaY > 0 && currentSection === "home") {
        setCurrentSection("about");
      } else if (e.deltaY < 0 && currentSection === "about") {
        setCurrentSection("home");
      }

      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, 1000); // evita cambiar de sección demasiado rápido
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentSection]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-cool-gray-900">
      <Navbar setCurrentSection={setCurrentSection} />

      <main className="relative flex-1 text-white w-full">
        {/* Cubo siempre visible, animado */}
        <div
          className={`fixed top-1/2 right-10 transform -translate-y-1/2 transition-transform duration-700 ease-in-out z-30
    ${currentSection === "about" ? "-translate-x-[800px]" : "translate-x-0"}`}
        >
          <Cube rotation={rotationRef} />
        </div>

        {/* Sección INICIO */}
        <div
          className={`absolute inset-0 flex transition-all duration-700 ease-in-out
    ${
      currentSection === "home"
        ? "opacity-100 translate-y-0 z-20"
        : "opacity-0 -translate-y-10 z-10 pointer-events-none"
    }`}
        >
          <div className="flex flex-row items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center w-1/2">
              <h1 className="text-4xl font-bold">Hola!</h1>
              <p className="mt-3 text-lg">
                Mi nombre es Diego Alberto Martinez Hernandez
              </p>
              <div className="bg-cyan-700 h-1 w-full my-4"></div>
              <TypingSlider />
            </div>
          </div>
        </div>

        {/* Sección SOBRE MÍ */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-in-out
    ${
      currentSection === "about"
        ? "opacity-100 translate-y-0 z-20"
        : "opacity-0 translate-y-10 z-10 pointer-events-none"
    }`}
        >
          <AboutMe />
        </div>
      </main>

      <footer className="w-full h-12 flex justify-center items-center bg-gray-900">
        <p className="text-sm text-white">DiegoM</p>
      </footer>
    </div>
  );
}
