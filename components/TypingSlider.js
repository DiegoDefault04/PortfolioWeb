import { useEffect, useState } from 'react';

export default function TypingSlider() {
  const phrases = [
    "Full Stack Developer 👨‍💻",
    "Filmógrafo Novato 📸",
    "Backend Developer 🖥️",
    "Amante de los tacos 🌮",
    "Piloto de Drones 🛸🎮"
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // Controla si el cursor está sobre el texto
  const [garbledText, setGarbledText] = useState(""); // Texto "basura"

  // Generar texto "basura"
  const generateGarbledText = (length) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  useEffect(() => {
    // Actualiza el texto "basura" al cambiar la frase
    if (!isHovered) {
      const interval = setInterval(() => {
        setGarbledText(generateGarbledText(phrases[currentPhraseIndex].length));
      }, 100); // Cambia los caracteres basura cada 100 ms
      return () => clearInterval(interval);
    }
  }, [currentPhraseIndex, isHovered]);

  useEffect(() => {
    // Cambia la frase actual cada cierto tiempo
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 2300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono font-bold text-center">
      <p
        className="relative inline-block text-3xl uppercase tracking-wide animate-slide cursor-pointer"
        onMouseEnter={() => setIsHovered(true)} // Mostrar texto real al pasar el cursor
        onMouseLeave={() => setIsHovered(false)} // Volver a texto "basura" al salir el cursor
      >
        {isHovered ? phrases[currentPhraseIndex] : garbledText}
        <span className="absolute top-0 right-0 bottom-0 border-l-2 border-white animate-typing"></span>
      </p>
    </div>
  );
}
