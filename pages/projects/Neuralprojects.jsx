'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

const projects = [
  {
    name: "IA Chatbot",
    x: 22, y: 28, color: "#7F77DD", pulseDelay: 0,
    github: "https://github.com/DiegoDefault04/Chatbot_Spacy_Laboratorio",
    url: "",
    desc: "Este es un chatbot basado en Python (Flask) y React, que aprende a responder de manera natural.",
  },
  {
    name: "BD Limpieza",
    x: 72, y: 18, color: "#1D9E75", pulseDelay: 1.2,
    github: "https://github.com/DiegoDefault04/limpiezabd",
    url: null,
    desc: "API para segmentar y limpiar una BD",
  },
  {
    name: "IA Linfocitos",
    x: 52, y: 58, color: "#D4537E", pulseDelay: 0.6,
    github: "https://github.com/DiegoDefault04/ProyectoIA_Linfocitos",
    url: "",
    desc: "Segmentación de imágenes con PyTorch",
  },
  {
    name: "Modelo y API de Análisis de Encuestas",
    x: 28, y: 76, color: "#378ADD", pulseDelay: 2.1,
    github: "https://github.com/DiegoDefault04/ThePulse",
    url: "https://thepul.se/",
    desc: "Esta API permite procesar respuestas de encuestas, generar gráficos, nubes de palabras, analizar emociones y generar reportes en PDF. Está desarrollada en Flask y utiliza diversas bibliotecas como NLTK, MySQL, OpenAI y Matplotlib.",
  },
  {
    name: "ASCO Paper",
    x: 80, y: 68, color: "#BA7517", pulseDelay: 0.9,
    github: null,
    url: "https://www.asco.org/abstracts-presentations/219427",
    desc: "An AI tool for chest X-ray interpretation and lung cancer pre-screening in developing countries.",
  },
];

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

export default function NeuralProjects() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const activeNodeRef = useRef(null);
  const signalsRef = useRef([]);
  const animRef = useRef(null);
  const timeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(null);

  const spawnSignal = useCallback((fromIdx, toIdx) => {
    signalsRef.current.push({
      from: fromIdx,
      to: toIdx,
      t: 0,
      speed: 0.004 + Math.random() * 0.003,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * devicePixelRatio;
      canvas.height = H * devicePixelRatio;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const getPos = (p) => ({ x: (p.x * W) / 100, y: (p.y * H) / 100 });
    const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      timeRef.current += 0.012;
      const t = timeRef.current;
      const positions = projects.map(getPos);
      const active = activeNodeRef.current;

      // Draw connections
      for (let i = 0; i < projects.length; i++) {
        for (let j = i + 1; j < projects.length; j++) {
          const a = positions[i];
          const b = positions[j];
          const d = dist(a, b);
          const maxDist = Math.max(W, H) * 0.75;
          if (d > maxDist) continue;

          const baseAlpha = 1 - d / maxDist;
          const isActive = active === i || active === j;
          const pulse = Math.sin(t * 1.4 + i * 0.7 + j * 0.5) * 0.5 + 0.5;
          const alpha = isActive
            ? 0.35 + pulse * 0.3
            : baseAlpha * (0.06 + pulse * 0.06);

          const cx = (a.x + b.x) / 2;
          const cy = (a.y + b.y) / 2;
          const offset = Math.sin(t * 0.5 + i * 1.3) * 18;
          const nx = -(b.y - a.y) / d;
          const ny = (b.x - a.x) / d;

          const ca = hexToRgb(projects[i].color);
          const cb = hexToRgb(projects[j].color);
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);

          if (isActive) {
            grad.addColorStop(0,   `rgba(${ca.r},${ca.g},${ca.b},${alpha})`);
            grad.addColorStop(0.5, `rgba(255,255,255,${alpha * 0.5})`);
            grad.addColorStop(1,   `rgba(${cb.r},${cb.g},${cb.b},${alpha})`);
          } else {
            grad.addColorStop(0, `rgba(${ca.r},${ca.g},${ca.b},${alpha * 0.8})`);
            grad.addColorStop(1, `rgba(${cb.r},${cb.g},${cb.b},${alpha * 0.5})`);
          }

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.quadraticCurveTo(cx + nx * offset, cy + ny * offset, b.x, b.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = isActive ? 1.2 : 0.6;
          ctx.stroke();
        }
      }

      // Draw signal particles
      signalsRef.current.forEach((s) => {
        s.t += s.speed;
        const a = positions[s.from];
        const b = positions[s.to];
        const d = dist(a, b);
        const i = s.from;
        const cx = (a.x + b.x) / 2;
        const cy = (a.y + b.y) / 2;
        const offset = Math.sin(t * 0.5 + i * 1.3) * 18;
        const nx = -(b.y - a.y) / d;
        const ny = (b.x - a.x) / d;
        const st = s.t;
        const px = (1-st)*(1-st)*a.x + 2*(1-st)*st*(cx+nx*offset) + st*st*b.x;
        const py = (1-st)*(1-st)*a.y + 2*(1-st)*st*(cy+ny*offset) + st*st*b.y;

        const c = hexToRgb(projects[s.from].color);
        const gr = ctx.createRadialGradient(px, py, 0, px, py, 7);
        gr.addColorStop(0, `rgba(${c.r},${c.g},${c.b},0.9)`);
        gr.addColorStop(0.5, `rgba(${c.r},${c.g},${c.b},0.4)`);
        gr.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`);
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fillStyle = gr;
        ctx.fill();
      });

      signalsRef.current = signalsRef.current.filter((s) => s.t < 1);
      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    animRef.current = requestAnimationFrame(draw);

    // Auto-spawn random signals
    let signalTimeout;
    const autoSpawn = () => {
      const i = Math.floor(Math.random() * projects.length);
      let j = Math.floor(Math.random() * (projects.length - 1));
      if (j >= i) j++;
      spawnSignal(i, j);
      signalTimeout = setTimeout(autoSpawn, 900 + Math.random() * 1400);
    };
    autoSpawn();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      clearTimeout(signalTimeout);
    };
  }, [spawnSignal]);

  const handleEnter = (i) => {
    activeNodeRef.current = i;
    setActiveIndex(i);
    projects.forEach((_, j) => {
      if (j !== i) spawnSignal(i, j);
    });
  };

  const handleLeave = () => {
    activeNodeRef.current = null;
    setActiveIndex(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-visible"
      style={{ height: 520 }}
    >
      {/* Canvas for connections + particles */}
      <canvas ref={canvasRef} className="absolute inset-0" style={{ zIndex: 1 }} />

      {/* Nodes */}
      {projects.map((p, i) => {
        const isActive = activeIndex === i;
        return (
          <div
            key={i}
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={handleLeave}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: `translate(-50%, -50%) scale(${isActive ? 1.45 : 1})`,
              width: 68,
              height: 68,
              zIndex: isActive ? 50 : 10,
              transition: 'transform 0.4s cubic-bezier(.34,1.56,.64,1)',
              cursor: 'pointer',
            }}
          >
            {/* Glow blob */}
            <div
              style={{
                position: 'absolute',
                width: 68 * 2.2,
                height: 68 * 2.2,
                borderRadius: '50%',
                background: p.color,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                filter: 'blur(18px)',
                opacity: isActive ? 0.45 : 0.28,
                transition: 'opacity 0.3s',
                zIndex: -1,
              }}
            />

            {/* Pulse ring */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: `1.5px solid ${p.color}88`,
                animation: `pulseOut 2.8s ease-out ${p.pulseDelay}s infinite`,
              }}
            />

            {/* Glass cell */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: isActive
                  ? 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.32), rgba(255,255,255,0.10))'
                  : 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.18), rgba(255,255,255,0.04))',
                border: `1px solid ${isActive ? 'rgba(255,255,255,0.40)' : 'rgba(255,255,255,0.18)'}`,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                transition: 'background 0.3s, border-color 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 500, textAlign: 'center', lineHeight: 1.2, padding: 4, color: 'rgba(255,255,255,0.9)' }}>
                {p.name}
              </span>
            </div>

            {/* Popup card con links */}
            {isActive && (
              <div style={{
                position: 'absolute',
                bottom: 'calc(100% + 10px)',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(15,15,20,0.92)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 10,
                padding: '10px 14px',
                minWidth: 170,
                zIndex: 200,
                pointerEvents: 'auto',
                boxShadow: `0 8px 32px ${p.color}44`,
              }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#fff', margin: 0, whiteSpace: 'nowrap' }}>{p.name}</p>
                {p.desc && (
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', margin: '2px 0 8px', lineHeight: 1.3 }}>{p.desc}</p>
                )}
                <div style={{ display: 'flex', gap: 6 }}>
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.85)', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 6, padding: '4px 9px', textDecoration: 'none' }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 500, color: '#fff', background: p.color + 'cc', border: `1px solid ${p.color}`, borderRadius: 6, padding: '4px 9px', textDecoration: 'none' }}
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      Demo
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      <style>{`
        @keyframes pulseOut {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
}