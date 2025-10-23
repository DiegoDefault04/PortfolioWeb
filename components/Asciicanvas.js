import { useEffect, useRef } from "react";

export default function ASCIIcanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Fondo negro
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Animación de caracteres aleatorios
    const chars = ["@", "#", "*", "+", ".", "o"];
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // efecto de desvanecimiento
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ffcc";
      ctx.font = "16px monospace";

      for (let i = 0; i < 150; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.fillText(char, x, y);
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
}
