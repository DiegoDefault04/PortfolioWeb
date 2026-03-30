'use client';
import { useEffect, useRef } from "react";

const COLORS = ["#7F77DD", "#1D9E75", "#D4537E", "#378ADD", "#BA7517"];

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

export default function LiquidBackground() {
  const canvasRef = useRef(null);
  const blob1     = useRef(null);
  const blob2     = useRef(null);
  const blob3     = useRef(null);
  const mouseRef  = useRef({ x: 0.5, y: 0.5 });
  const blobsRef  = useRef([]);
  const rafRef    = useRef(null);

  // ── canvas de partículas neurales ────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let W = 0, H = 0;
    let t = 0;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      initParticles();
    };

    let particles = [];
    const initParticles = () => {
      particles = Array.from({ length: 55 }, (_, i) => ({
        x:     Math.random() * W,
        y:     Math.random() * H,
        vx:    (Math.random() - 0.5) * 0.22,
        vy:    (Math.random() - 0.5) * 0.22,
        r:     1 + Math.random() * 2,
        color: COLORS[i % COLORS.length],
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.007;

      // influencia del mouse sobre partículas cercanas
      const mx = mouseRef.current.x * W;
      const my = mouseRef.current.y * H;

      for (const p of particles) {
        const dx = mx - p.x, dy = my - p.y;
        const md = Math.sqrt(dx * dx + dy * dy);
        if (md < 180) {
          p.x += (dx / md) * 0.18;
          p.y += (dy / md) * 0.18;
        }
        p.x += p.vx + Math.sin(t + p.phase) * 0.1;
        p.y += p.vy + Math.cos(t * 0.8 + p.phase) * 0.1;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      }

      // conexiones
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          const maxD = Math.min(W, H) * 0.22;
          if (d > maxD) continue;

          const alpha = (1 - d / maxD) * 0.12;
          const ca = hexToRgb(a.color), cb = hexToRgb(b.color);
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, `rgba(${ca.r},${ca.g},${ca.b},${alpha})`);
          grad.addColorStop(1, `rgba(${cb.r},${cb.g},${cb.b},${alpha})`);

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth   = 0.7;
          ctx.stroke();
        }
      }

      // partículas con glow suave
      for (const p of particles) {
        const pulse = Math.sin(t * 1.5 + p.phase) * 0.5 + 0.5;
        const alpha = 0.08 + pulse * 0.14;
        const c     = hexToRgb(p.color);
        const gr    = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        gr.addColorStop(0, `rgba(${c.r},${c.g},${c.b},${alpha})`);
        gr.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = gr;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ── blobs flotantes autónomos ────────────────────────────────────────────
  useEffect(() => {
    // estado interno de cada blob: posición, velocidad, fase
    blobsRef.current = [
      { x: 0.25, y: 0.15, vx: 0.00018, vy: 0.00012, ref: blob1 },
      { x: 0.75, y: 0.80, vx:-0.00014, vy:-0.00016, ref: blob2 },
      { x: 0.50, y: 0.50, vx: 0.00010, vy: 0.00020, ref: blob3 },
    ];

    let lt = 0;
    const animate = (ts) => {
      const dt = ts - lt; lt = ts;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const b of blobsRef.current) {
        // atracción suave hacia el cursor
        b.vx += (mx - b.x) * 0.000008;
        b.vy += (my - b.y) * 0.000008;

        // amortiguación para que no se disparen
        b.vx *= 0.995;
        b.vy *= 0.995;

        b.x += b.vx * dt;
        b.y += b.vy * dt;

        // rebote en bordes
        if (b.x < 0.05 || b.x > 0.95) b.vx *= -1;
        if (b.y < 0.05 || b.y > 0.95) b.vy *= -1;
        b.x = Math.max(0.05, Math.min(0.95, b.x));
        b.y = Math.max(0.05, Math.min(0.95, b.y));

        if (b.ref.current) {
          b.ref.current.style.left = `${b.x * 100}%`;
          b.ref.current.style.top  = `${b.y * 100}%`;
        }
      }
      rafRef._blob = requestAnimationFrame(animate);
    };
    rafRef._blob = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef._blob);
  }, []);

  // ── seguimiento del mouse ─────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#070710]">
      {/* canvas neural */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.9 }}
      />

      {/* blob 1 — púrpura */}
      <div
        ref={blob1}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 640, height: 640,
          background: "radial-gradient(circle, #7F77DD 0%, transparent 70%)",
          opacity: 0.22,
          filter: "blur(80px)",
          transition: "left 0.08s linear, top 0.08s linear",
        }}
      />

      {/* blob 2 — teal */}
      <div
        ref={blob2}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 520, height: 520,
          background: "radial-gradient(circle, #1D9E75 0%, transparent 70%)",
          opacity: 0.18,
          filter: "blur(80px)",
          transition: "left 0.08s linear, top 0.08s linear",
        }}
      />

      {/* blob 3 — pink */}
      <div
        ref={blob3}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 420, height: 420,
          background: "radial-gradient(circle, #D4537E 0%, transparent 70%)",
          opacity: 0.15,
          filter: "blur(80px)",
          transition: "left 0.08s linear, top 0.08s linear",
        }}
      />
    </div>
  );
}