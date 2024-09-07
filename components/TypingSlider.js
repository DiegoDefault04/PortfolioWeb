// components/TypingSlider.js
import { useEffect, useState } from 'react';

export default function TypingSlider() {
  const phrases = ["Full Stack Developer", "Fotógrafo Novato", "Backend Developer"];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 5000); // Cambia la frase cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono font-bold text-center">
      <p className="relative inline-block text-3xl uppercase tracking-wide animate-slide">
        {phrases[currentPhraseIndex]}
        <span className="absolute top-0 right-0 bottom-0 border-l-2 border-white animate-typing"></span>
      </p>
    </div>
  );
}
