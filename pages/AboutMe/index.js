'use client';
import { useRef } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaTiktok } from "react-icons/fa";

const socials = [
  {
    primary:   { href: "https://github.com/DiegoDefault04", Icon: FaGithub, label: "GitHub" },
    secondary: { href: "https://www.instagram.com/go_diego_defalt?igsh=MXByN2E1YTVvYjFvdw==", Icon: FaInstagram, label: "Instagram", color: "#D4537E" },
    color: "#7F77DD",
    side: "left",
  },
  {
    primary:   { href: "https://www.linkedin.com/in/diego-alberto-martinez-hernandez-10031a25b/", Icon: FaLinkedin, label: "LinkedIn" },
    secondary: { href: "https://www.tiktok.com/@diegodefalt?_t=ZM-8x6Ilo3F6rI&_r=1", Icon: FaTiktok, label: "TikTok", color: "#1D9E75" },
    color: "#378ADD",
    side: "right",
  },
];

const techs = [
  { name: "Python", size: 7.5, x: 4, y: 9, rotate: 0, weight: "bold" },
  { name: "NodeJS", size: 3.5, x: 4, y: 9, rotate: 90, weight: "bold" },
  { name: "NextJS", size: 2.5, x: 14, y: 10, rotate: 90, weight: "normal" },
  { name: "Flask", size: 5.5, x: 4, y: 15, rotate: 0, weight: "bold" },
  { name: "Express", size: 2.5, x: 18, y: 3, rotate: 0, weight: "light" },
  { name: "Google Cloud", size: 1.3, x: 44, y: 1.8, rotate: 90, weight: "light" },
  { name: "Pytorch", size: 4.5, x: 18, y: 8, rotate: 0, weight: "normal" , color: "#BA7517"},
  { name: "Power BI", size: 3.5, x: 15, y: 4, rotate: 0, weight: "light" },
  { name: "Docker", size: 3.5, x: 22, y: 16, rotate: 90, weight: "bold" },
  { name: "Linux", size: 1.7, x: 12, y: 6.5, rotate: 0, weight: "bold" },
  { name: "Bash", size: 1.9, x: 8, y: 4.8, rotate: 0, weight: "bold" },
  { name: "Pandas", size: 3.5, x: 14, y: 15, rotate: 0, weight: "bold", color: "#BA7517" },
  { name: "Scikit", size: 2.5, x: 16, y: 20, weight: "bold", color: "#BA7517" },
];

export default function AboutMe() {
  const techRefs = useRef([]);

  const handleTechEnter = (i) => {
    const el = techRefs.current[i];
    if (!el) return;
    const color = techs[i].color || "#7F77DD";
    el.style.color = color;
    el.style.filter = `drop-shadow(0 0 8px ${color}99)`;
    el.style.opacity = "1";
  };

  const handleTechLeave = (i) => {
    const el = techRefs.current[i];
    if (!el) return;
    el.style.color = techs[i].color || "rgba(255,255,255,0.18)";
    el.style.filter = "none";
    el.style.opacity = "";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-4 py-10">

      {/* título */}
      <div className="flex items-center gap-4 mb-4">
        <div style={{ width: 40, height: 1, background: "linear-gradient(to right, transparent, #7F77DD)" }} />
        <h2 className="text-3xl font-bold tracking-tight">Sobre mí</h2>
        <div style={{ width: 40, height: 1, background: "linear-gradient(to left, transparent, #1D9E75)" }} />
      </div>

      <p className="max-w-xl text-center mb-12 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
        No hace falta seguirme por todos lados, aunque si te interesa ver
        algunos de mis trabajos, aquí encontrarás un poco de lo que me apasiona.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">

        {/* izquierda */}
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex gap-10">
            {socials.map(({ primary: PrimaryLink, secondary: SecondaryLink, color, side }, i) => (
              <div key={i} className="relative group" style={{ width: 68, height: 68 }}>

                {/* glow */}
                <div
                  className="group-hover:opacity-40"
                  style={{
                    position: "absolute",
                    width: 68 * 2.2,
                    height: 68 * 2.2,
                    borderRadius: "50%",
                    background: color,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    filter: "blur(18px)",
                    opacity: 0,
                    transition: "opacity 0.3s",
                    zIndex: -1,
                  }}
                />

                {/* pulso */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: `1.5px solid ${color}66`,
                  animation: `pulseOut 2.8s ease-out ${i * 1.2}s infinite`,
                }} />

                {/* PRIMARY */}
                <a
                  href={PrimaryLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={PrimaryLink.label}
                  className="group-hover:border-white/40"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.15), rgba(255,255,255,0.04))",
                    border: "1px solid rgba(255,255,255,0.18)",
                    backdropFilter: "blur(12px)",
                    color: "rgba(255,255,255,0.85)",
                    fontSize: 26,
                    zIndex: 2,
                    textDecoration: "none",
                  }}
                >
                  <PrimaryLink.Icon />
                </a>

                {/* SECONDARY */}
                <a
                  href={SecondaryLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={SecondaryLink.label}
                  className="group-hover:opacity-100"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: side === "left" ? -52 : "auto",
                    right: side === "right" ? -52 : "auto",
                    transform: "translateY(-50%)",
                    opacity: 0,
                    transition: "opacity 0.3s",
                    color: SecondaryLink.color,
                    fontSize: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: `${SecondaryLink.color}22`,
                    border: `1px solid ${SecondaryLink.color}55`,
                    backdropFilter: "blur(8px)",
                    zIndex: 5,
                    textDecoration: "none",
                  }}
                >
                  <SecondaryLink.Icon />
                </a>

              </div>
            ))}
          </div>

          {/* badge */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            fontSize: 12,
            color: "rgba(255,255,255,0.55)",
          }}>
            <span style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#1D9E75",
              boxShadow: "0 0 6px #1D9E75",
              animation: "blink 2s ease-in-out infinite",
            }} />
            Disponible para proyectos
          </div>
        </div>

        {/* derecha */}
        <div className="relative w-full h-[400px] font-mono uppercase tracking-tight select-none overflow-hidden">
          {techs.map((tech, i) => (
            <p
              key={i}
              ref={(el) => (techRefs.current[i] = el)}
              onMouseEnter={() => handleTechEnter(i)}
              onMouseLeave={() => handleTechLeave(i)}
              className="absolute whitespace-nowrap"
              style={{
                fontSize: `${tech.size * 0.9}rem`,
                fontWeight: tech.weight === "bold" ? 700 : tech.weight === "light" ? 300 : 400,
                transform: `translateX(${tech.x}rem) translateY(${tech.y}rem)${tech.rotate ? ` rotate(${tech.rotate}deg)` : ""}`,
                color: tech.color || "rgba(255,255,255,0.18)",
              }}
            >
              {tech.name}
            </p>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes pulseOut {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes blink {
          0%,100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
