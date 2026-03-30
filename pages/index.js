import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "tailwindcss/tailwind.css";
import Navbar from "@/components/Navbar";
import LiquidBackground from "@/components/LiquidBackground";

const AboutMe = dynamic(() => import("./AboutMe"), { ssr: false });
const Works = dynamic(() => import("./Works"), { ssr: false });
const NeuralProjects = dynamic(() => import("./projects/Neuralprojects"), { ssr: false });

export default function Home() {
  const rotationRef = useRef({ x: 0, y: 0 });
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentSection, setCurrentSection] = useState("home"); // Nueva gestión de sección
  const [visible, setVisible] = useState(true);

  const phrases = [
    "IA Developer",
    "Fotógrafo 📸",
    "Data Developer 🖥️",
    "Amante de los tacos 🌮",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false); // fade out

      setTimeout(() => {
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        setVisible(true); // fade in
      }, 300); // duración del fade
    }, 1500);

    return () => clearInterval(interval);
  }, []);


const sections = ["home", "about", "projects", "work"];

useEffect(() => {
  let isThrottled = false;

  const handleWheel = (e) => {
    if (isThrottled) return;

    const currentIndex = sections.indexOf(currentSection);

    if (e.deltaY > 0 && currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1]);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1]);
    }

    isThrottled = true;
    setTimeout(() => {
      isThrottled = false;
    }, 1000);
  };

  window.addEventListener("wheel", handleWheel, { passive: true });

  return () => {
    window.removeEventListener("wheel", handleWheel);
  };
}, [currentSection]);


  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar setCurrentSection={setCurrentSection} />
      <main className="relative flex-1 text-white w-full">
          <LiquidBackground />

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
              <div style={{ position: "relative", textAlign: "center" }}>
                {/* glow detrás del nombre */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(ellipse at center, #7F77DD22 0%, transparent 70%)",
                  filter: "blur(24px)",
                  transform: "scaleX(1.4) scaleY(2)",
                  pointerEvents: "none",
                }} />
                <h1
                  className="text-5xl md:text-5xl font-bold tracking-tight relative"
                  style={{
                    background: "linear-gradient(135deg, #fff 40%, rgba(127,119,221,0.7) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    paddingBottom: "0.15em", // ← esto rescata los descendentes (g, y, p)
                  }}
                >
                  Diego Alberto Martinez
                </h1>
              </div>
              <p className="mt-3 text-lg">
              </p>
              <div className="h-10 mt-4 flex items-center justify-center overflow-hidden">
                <span
                  className={`text-xl font-medium transition-all duration-500 ease-in-out
                  ${
                    visible
                      ? "opacity-100 translate-y-0 scale-100 blur-0"
                      : "opacity-0 translate-y-6 scale-75 blur-sm"
                  }`}
                >
                  {phrases[currentPhraseIndex]}
                </span>
              </div>
                            <div className="bg-cyan-700 h-1 w-full my-4"></div>
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

        {/* Sección PROYECTOS */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-in-out
          ${
            currentSection === "projects"
              ? "opacity-100 translate-y-0 z-20"
              : "opacity-0 translate-y-10 z-10 pointer-events-none"
          }`}
        >
          <div className="w-full h-full flex flex-col items-center justify-center gap-10">
            

            <NeuralProjects />

          </div>
        </div>


        <div
          className={`absolute inset-0 transition-all duration-700 ease-in-out
    ${
      currentSection === "work"
        ? "opacity-100 translate-y-0 z-20"
        : "opacity-0 translate-y-10 z-10 pointer-events-none"
    }`}
        >
          <Works />
        </div>
      </main>

      <footer className="w-full h-12 flex justify-center items-center">
        <p className="text-sm text-white">DiegoM</p>
      </footer>
    </div>
  );
}
