'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

const images = [
  { src: "/1.jpg",                  color: "#7F77DD", pulseDelay: 0 },
  { src: "/4.jpg",                  color: "#1D9E75", pulseDelay: 1.2 },
  { src: "/23.webp",                color: "#D4537E", pulseDelay: 0.6 },
  { src: "/3.jpg",                  color: "#378ADD", pulseDelay: 2.1 },
  { src: "/5.jpg",                  color: "#BA7517", pulseDelay: 0.9 },
  { src: "/20240612_192624.jpg",    color: "#7F77DD", pulseDelay: 1.6 },
];

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

export default function NeuralCarousel() {
  const canvasRef     = useRef(null);
  const containerRef  = useRef(null);
  const activeIdxRef  = useRef(null);
  const signalsRef    = useRef([]);
  const animRef       = useRef(null);
  const timeRef       = useRef(0);

  const [current,     setCurrent]     = useState(0);
  const [activeCard,  setActiveCard]  = useState(null);

  // ── partículas flotantes (igual que NeuralProjects) ──────────────────────
  const spawnSignal = useCallback((fromIdx, toIdx) => {
    signalsRef.current.push({
      from: fromIdx,
      to:   toIdx,
      t:    0,
      speed: 0.004 + Math.random() * 0.003,
    });
  }, []);

  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    const ctx       = canvas.getContext('2d');
    let W = 0, H = 0;

    // posiciones fijas de "nodos" para el canvas (mismo estilo que NeuralProjects)
    const nodePos = [
      { x: 10, y: 20 }, { x: 30, y: 75 }, { x: 55, y: 15 },
      { x: 70, y: 60 }, { x: 88, y: 25 }, { x: 80, y: 85 },
    ];

    const resize = () => {
      const rect = container.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width  = W * devicePixelRatio;
      canvas.height = H * devicePixelRatio;
      canvas.style.width  = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const getPos  = (p) => ({ x: (p.x * W) / 100, y: (p.y * H) / 100 });
    const dist    = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      timeRef.current += 0.012;
      const t         = timeRef.current;
      const positions = nodePos.map(getPos);
      const active    = activeIdxRef.current;

      // conexiones entre nodos
      for (let i = 0; i < images.length; i++) {
        for (let j = i + 1; j < images.length; j++) {
          const a = positions[i];
          const b = positions[j];
          const d = dist(a, b);
          const maxDist = Math.max(W, H) * 0.75;
          if (d > maxDist) continue;

          const baseAlpha = 1 - d / maxDist;
          const isActive  = active === i || active === j;
          const pulse     = Math.sin(t * 1.4 + i * 0.7 + j * 0.5) * 0.5 + 0.5;
          const alpha     = isActive
            ? 0.35 + pulse * 0.3
            : baseAlpha * (0.06 + pulse * 0.06);

          const cx     = (a.x + b.x) / 2;
          const cy     = (a.y + b.y) / 2;
          const offset = Math.sin(t * 0.5 + i * 1.3) * 18;
          const nx     = -(b.y - a.y) / d;
          const ny     =  (b.x - a.x) / d;

          const ca = hexToRgb(images[i].color);
          const cb = hexToRgb(images[j].color);
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
          ctx.lineWidth   = isActive ? 1.2 : 0.6;
          ctx.stroke();
        }
      }

      // señales viajando entre nodos
      signalsRef.current.forEach((s) => {
        s.t += s.speed;
        const a  = positions[s.from];
        const b  = positions[s.to];
        const d  = dist(a, b);
        const cx = (a.x + b.x) / 2;
        const cy = (a.y + b.y) / 2;
        const offset = Math.sin(t * 0.5 + s.from * 1.3) * 18;
        const nx = -(b.y - a.y) / d;
        const ny =  (b.x - a.x) / d;
        const st = s.t;
        const px = (1-st)*(1-st)*a.x + 2*(1-st)*st*(cx+nx*offset) + st*st*b.x;
        const py = (1-st)*(1-st)*a.y + 2*(1-st)*st*(cy+ny*offset) + st*st*b.y;

        const c  = hexToRgb(images[s.from].color);
        const gr = ctx.createRadialGradient(px, py, 0, px, py, 7);
        gr.addColorStop(0,   `rgba(${c.r},${c.g},${c.b},0.9)`);
        gr.addColorStop(0.5, `rgba(${c.r},${c.g},${c.b},0.4)`);
        gr.addColorStop(1,   `rgba(${c.r},${c.g},${c.b},0)`);
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fillStyle = gr;
        ctx.fill();
      });

      signalsRef.current = signalsRef.current.filter((s) => s.t < 1);
      animRef.current    = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    animRef.current = requestAnimationFrame(draw);

    // señales automáticas
    let signalTimeout;
    const autoSpawn = () => {
      const i = Math.floor(Math.random() * images.length);
      let   j = Math.floor(Math.random() * (images.length - 1));
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

  // ── navegación ────────────────────────────────────────────────────────────
  const goTo = (idx) => {
    setCurrent(Math.max(0, Math.min(idx, images.length - 1)));
  };

  const handleCardEnter = (i) => {
    activeIdxRef.current = i;
    setActiveCard(i);
    images.forEach((_, j) => { if (j !== i) spawnSignal(i, j); });
  };

  const handleCardLeave = () => {
    activeIdxRef.current = null;
    setActiveCard(null);
  };

  const CARD_W = 220;
  const GAP    = 28;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: 480 }}
    >
      {/* ── canvas neural de fondo ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ zIndex: 1 }}
      />

      {/* ── track de cards ── */}
      <div
        className="absolute inset-0 flex items-center overflow-hidden"
        style={{ zIndex: 2 }}
      >
        <div
          className="flex"
          style={{
            gap: GAP,
            paddingLeft: 80,
            paddingRight: 80,
            transform: `translateX(${-(current * (CARD_W + GAP))}px)`,
            transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {images.map((img, i) => {
            const isActive = activeCard === i;
            return (
              <div
                key={i}
                onMouseEnter={() => handleCardEnter(i)}
                onMouseLeave={handleCardLeave}
                style={{
                  flexShrink: 0,
                  width:  CARD_W,
                  height: 300,
                  position: 'relative',
                  cursor: 'pointer',
                  transform: isActive
                    ? 'scale(1.1) translateY(-12px)'
                    : 'scale(1) translateY(0)',
                  transition: 'transform 0.5s cubic-bezier(.34,1.56,.64,1)',
                  zIndex: isActive ? 20 : 10,
                }}
              >
                {/* glow blob (idéntico al de NeuralProjects) */}
                <div style={{
                  position:     'absolute',
                  width:        CARD_W * 1.3,
                  height:       340,
                  borderRadius: '50%',
                  background:   img.color,
                  top:  '50%',
                  left: '50%',
                  transform:    'translate(-50%,-50%)',
                  filter:       'blur(28px)',
                  opacity:      isActive ? 0.4 : 0.18,
                  transition:   'opacity 0.3s',
                  zIndex:       -1,
                }} />

                {/* anillo de pulso */}
                <div style={{
                  position:     'absolute',
                  inset:        -4,
                  borderRadius: 24,
                  border:       `1.5px solid ${img.color}88`,
                  animation:    `pulseOut 2.8s ease-out ${img.pulseDelay}s infinite`,
                  zIndex:       0,
                }} />

                {/* glass frame con la imagen */}
                <div style={{
                  position:          'absolute',
                  inset:             0,
                  borderRadius:      20,
                  overflow:          'hidden',
                  border:            `1px solid ${isActive ? 'rgba(255,255,255,0.38)' : 'rgba(255,255,255,0.18)'}`,
                  background:        'rgba(12,12,18,0.55)',
                  backdropFilter:    'blur(2px)',
                  WebkitBackdropFilter: 'blur(2px)',
                  transition:        'border-color 0.3s',
                  zIndex:            1,
                }}>
                  <Image
                    src={img.src}
                    alt={`foto ${i + 1}`}
                    fill
                    className="object-cover pointer-events-none"
                    style={{
                      transform:  isActive ? 'scale(1.06)' : 'scale(1)',
                      filter:     isActive
                        ? 'saturate(1.3) brightness(0.95)'
                        : 'saturate(1.1) brightness(0.88)',
                      transition: 'transform 0.6s ease, filter 0.4s ease',
                    }}
                  />

                  {/* highlight glass */}
                  <div style={{
                    position:   'absolute',
                    inset:      0,
                    background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.12), rgba(255,255,255,0.02) 70%)',
                    pointerEvents: 'none',
                  }} />
                </div>

                {/* color leak abajo */}
                <div style={{
                  position:     'absolute',
                  bottom:       -10,
                  left:         '50%',
                  transform:    'translateX(-50%)',
                  width:        '70%',
                  height:       50,
                  borderRadius: '50%',
                  background:   img.color,
                  filter:       'blur(18px)',
                  opacity:      isActive ? 0.4 : 0,
                  transition:   'opacity 0.4s',
                  zIndex:       0,
                }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── botón izquierda ── */}
      <button
        onClick={() => goTo(current - 1)}
        className="absolute top-1/2 -translate-y-1/2 left-3 z-10 flex items-center justify-center"
        style={{
          width:             44,
          height:            44,
          borderRadius:      '50%',
          border:            '1px solid rgba(255,255,255,0.18)',
          background:        'rgba(10,10,16,0.65)',
          backdropFilter:    'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          color:             'rgba(255,255,255,0.85)',
          cursor:            'pointer',
          fontSize:          16,
        }}
      >
        ←
      </button>

      {/* ── botón derecha ── */}
      <button
        onClick={() => goTo(current + 1)}
        className="absolute top-1/2 -translate-y-1/2 right-3 z-10 flex items-center justify-center"
        style={{
          width:             44,
          height:            44,
          borderRadius:      '50%',
          border:            '1px solid rgba(255,255,255,0.18)',
          background:        'rgba(10,10,16,0.65)',
          backdropFilter:    'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          color:             'rgba(255,255,255,0.85)',
          cursor:            'pointer',
          fontSize:          16,
        }}
      >
        →
      </button>

      {/* ── dots ── */}
      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2"
        style={{ zIndex: 10 }}
      >
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width:        i === current ? 18 : 6,
              height:       6,
              borderRadius: 3,
              background:   i === current
                ? 'rgba(255,255,255,0.85)'
                : 'rgba(255,255,255,0.25)',
              border:       'none',
              cursor:       'pointer',
              padding:      0,
              transition:   'width 0.3s ease, background 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* keyframe de pulso — mismo que NeuralProjects */}
      <style>{`
        @keyframes pulseOut {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0;   }
        }
      `}</style>
    </div>
  );
}