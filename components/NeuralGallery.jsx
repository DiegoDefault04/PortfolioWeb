import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

// ─── Vista previa (foto completa + partículas neurales de fondo) ────────────
function NeuralPreview({ image, onClose }) {
  const canvasRef    = useRef(null);
  const containerRef = useRef(null);
  const signalsRef   = useRef([]);
  const animRef      = useRef(null);
  const timeRef      = useRef(0);

  const spawnSignal = useCallback(() => {
    // partícula viajando desde un borde aleatorio hacia el centro de la imagen
    const edge = Math.floor(Math.random() * 4); // 0 top, 1 right, 2 bottom, 3 left
    let fromX, fromY;
    if (edge === 0) { fromX = Math.random() * 100; fromY = 0; }
    if (edge === 1) { fromX = 100; fromY = Math.random() * 100; }
    if (edge === 2) { fromX = Math.random() * 100; fromY = 100; }
    if (edge === 3) { fromX = 0; fromY = Math.random() * 100; }

    signalsRef.current.push({
      fromX, fromY,
      t: 0,
      speed: 0.004 + Math.random() * 0.003,
    });
  }, []);

  // Cerrar con Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Canvas de partículas neurales
  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width  = W * devicePixelRatio;
      canvas.height = H * devicePixelRatio;
      canvas.style.width  = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const c = hexToRgb(image.color);
    const cx = W / 2, cy = H / 2;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      timeRef.current += 0.012;
      const t = timeRef.current;

      // anillos de pulso suaves de fondo
      for (let r = 0; r < 3; r++) {
        const phase = (t * 0.3 + r * 0.6) % 2;
        const radius = phase * Math.max(W, H) * 0.5;
        const alpha = Math.max(0, 0.12 - phase * 0.06);
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // partículas viajando hacia el centro
      signalsRef.current.forEach((s) => {
        s.t += s.speed;
        const px = (s.fromX / 100) * W + (W / 2 - (s.fromX / 100) * W) * s.t;
        const py = (s.fromY / 100) * H + (H / 2 - (s.fromY / 100) * H) * s.t;
        const fade = Math.sin(s.t * Math.PI);

        const gr = ctx.createRadialGradient(px, py, 0, px, py, 5);
        gr.addColorStop(0,   `rgba(${c.r},${c.g},${c.b},${0.8 * fade})`);
        gr.addColorStop(0.5, `rgba(${c.r},${c.g},${c.b},${0.3 * fade})`);
        gr.addColorStop(1,   `rgba(${c.r},${c.g},${c.b},0)`);
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fillStyle = gr;
        ctx.fill();
      });

      signalsRef.current = signalsRef.current.filter((s) => s.t < 1);
      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    animRef.current = requestAnimationFrame(draw);

    let signalTimeout;
    const autoSpawn = () => {
      spawnSignal();
      signalTimeout = setTimeout(autoSpawn, 500 + Math.random() * 700);
    };
    autoSpawn();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      clearTimeout(signalTimeout);
    };
  }, [spawnSignal, image]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 20px',
      }}
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '90vw',
          maxHeight: '85vh',
          display: 'flex',
        }}
      >
        {/* Canvas neural de fondo, detrás de la foto */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: -60,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Glow blob detrás de la imagen */}
        <div style={{
          position: 'absolute',
          inset: -30,
          borderRadius: 24,
          background: image.color,
          filter: 'blur(40px)',
          opacity: 0.25,
          zIndex: 0,
        }} />

        {/* Anillo de pulso alrededor del marco */}
        <div style={{
          position: 'absolute',
          inset: -6,
          borderRadius: 20,
          border: `1.5px solid ${image.color}88`,
          animation: 'pulseOut 2.8s ease-out infinite',
          zIndex: 1,
        }} />

        {/* Marco con la foto, sin recortar */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.25)',
          background: 'rgba(12,12,18,0.55)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          lineHeight: 0,
        }}>
          <Image
            src={image.src}
            alt="foto ampliada"
            width={image.width || 1200}
            height={image.height || 1200}
            style={{
              maxWidth: '90vw',
              maxHeight: '85vh',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>

        {/* Botón cerrar */}
        <button onClick={onClose} style={{
          position: 'absolute', top: -16, right: -16, zIndex: 10,
          width: 36, height: 36, borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.25)',
          background: 'rgba(10,10,16,0.85)',
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          color: 'rgba(255,255,255,0.9)', cursor: 'pointer', fontSize: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>✕</button>
      </div>

      <style>{`
        @keyframes pulseOut {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.08); opacity: 0;   }
        }
      `}</style>
    </div>
  );
}

// ─── Galería principal ────────────────────────────────────────────────────────
export default function NeuralGallery() {
  const [images,         setImages]         = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [previewImage,   setPreviewImage]   = useState(null);

  // Carga fotos desde Cloudinary vía /api/photos
  useEffect(() => {
    fetch('/api/photos')
      .then((r) => r.json())
      .then((data) => { setImages(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const openPreview  = useCallback((img) => setPreviewImage(img), []);
  const closePreview = useCallback(() => setPreviewImage(null), []);

  // Skeleton mientras carga
  if (loading) {
    return (
      <div className="gallery">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="gallery__item" style={{
            background: 'rgba(255,255,255,0.04)',
            animation: `skelPulse 1.6s ease-in-out ${i * 0.15}s infinite alternate`,
          }} />
        ))}
        <style>{`
          @keyframes skelPulse {
            from { opacity: 0.3; }
            to   { opacity: 0.7; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <div className="gallery">
        {images.map((img, i) => (
          <div
            key={img.src}
            className="gallery__item"
            onClick={() => openPreview(img)}
            style={{ cursor: 'zoom-in' }}
            onTouchStart={(e) => e.currentTarget.classList.add('touch-zoom')}
            onTouchEnd={(e) => {
              setTimeout(() => e.currentTarget.classList.remove('touch-zoom'), 400);
            }}
          >
            <Image
              src={img.src}
              alt={`foto ${i + 1}`}
              fill
              className="gallery__img"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

      {previewImage && (
        <NeuralPreview
          image={previewImage}
          onClose={closePreview}
        />
      )}
    </>
  );
}