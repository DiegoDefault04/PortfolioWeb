import { FaGithub, FaLinkedin, FaInstagram, FaTiktok } from "react-icons/fa";

export default function AboutMe() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cool-gray-900 text-white px-4 py-10">
      <h2 className="text-3xl font-bold mb-4">Sobre mí</h2>
      <p className="max-w-xl text-center mb-10">
        No hace falta seguirme por todos lados, aunque si te interesa ver
        algunos de mis trabajos, aqui encontrarás un poco de lo que me apasiona.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
        {/* Columna Izquierda: Texto e Iconos */}
        <div className="flex flex-col items-center justify-center gap-10">
          {/* Íconos Sociales */}
          <div className="flex gap-10 text-4xl relative">
            {/* GitHub con efecto Instagram */}
            <div className="relative group md:hover:translate-x-3 transition-transform">
              <a
                href="https://github.com/DiegoDefault04"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="hover:text-pink-400 cursor-pointer" />
              </a>
              <a
                href="https://www.instagram.com/go_diego_defalt?igsh=MXByN2E1YTVvYjFvdw== "
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram
                  className="absolute -left-10 top-1/2 transform -translate-y-1/2 
          opacity-100 md:opacity-0 md:group-hover:opacity-100 
          transition-opacity duration-300 text-pink-500"
                />
              </a>
            </div>

            {/* LinkedIn con efecto TikTok */}
            <div className="relative group md:hover:-translate-x-3 transition-transform">
              <a
                href="https://www.linkedin.com/in/diego-alberto-martinez-hernandez-10031a25b/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="hover:text-blue-400 cursor-pointer" />
              </a>
              <a
                href="https://www.tiktok.com/@diegodefalt?_t=ZM-8x6Ilo3F6rI&_r=1 "
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok
                  className="absolute -right-10 top-1/2 transform -translate-y-1/2 
          opacity-100 md:opacity-0 md:group-hover:opacity-100 
          transition-opacity duration-300 text-white"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Tecnologías */}
        <div className="relative w-full h-[400px] text-gray-400 uppercase font-oswald">
          {[
            {
              name: "Python",
              className:
                "font-bold scale-[3] sm:scale-[4.5] md:scale-[6] lg:scale-[7.5] translate-x-[4rem] sm:translate-x-[3.5rem] md:translate-x-[4.7rem] lg:translate-x-[4.7rem] translate-y-[9rem] sm:translate-y-[10.7rem] md:translate-y-[10.7rem] lg:translate-y-[10.7rem]",
            },
            {
              name: "NodeJS",
              className:
                "font-bold scale-[2.5] sm:scale-[3.5] md:scale-[4.5] lg:scale-[4.75] rotate-90 translate-x-[15rem] sm:translate-x-[14rem] md:translate-x-[22.3rem] translate-y-[3rem] sm:translate-y-[0rem] md:translate-y-[0rem] lg:translate-y-[0rem]",
            },
            {
              name: "NextJS",
              className:
                "font-normal scale-[1] sm:scale-[1.2] md:scale-[1.3] lg:scale-[1.4] rotate-90 translate-x-[3.8rem] sm:translate-x-[10rem] md:translate-x-[15.5rem] translate-y-[1.5rem] sm:translate-y-[1.5rem] md:translate-y-[1.5rem] lg:translate-y-[1.5rem]",
            },
            {
              name: "Flask",
              className:
                "font-bold scale-[2.5] sm:scale-[3.2] md:scale-[3.6] lg:scale-[3.8] translate-x-[10rem] sm:translate-x-[20rem] md:translate-x-[30rem] translate-y-[6.7rem] sm:translate-y-[6.7rem] md:translate-y-[6.7rem] lg:translate-y-[6.7rem]",
            },
            {
              name: "Express",
              className:
                "font-light scale-[2] sm:scale-[2.2] md:scale-[2.5] lg:scale-[2.75] translate-x-[9rem] sm:translate-x-[5.5rem] md:translate-x-[6.8rem] translate-y-[0rem] sm:translate-y-[3rem] md:translate-y-[3rem] lg:translate-y-[3rem]",
            },
            {
              name: "Postman",
              className:
                "font-light scale-[1.5] sm:scale-[1.7] md:scale-[1.8] lg:scale-[2] translate-x-[13rem] sm:translate-x-[30rem] md:translate-x-[51rem] translate-y-[8.6rem] sm:translate-y-[8.6rem] md:translate-y-[8.6rem] lg:translate-y-[8.6rem]",
            },
            {
              name: "Google Cloud",
              className:
                "font-light scale-[1] sm:scale-[1.2] md:scale-[1.3] lg:scale-[1.4] rotate-90 translate-x-[15rem] sm:translate-x-[11rem] md:translate-x-[16rem] translate-y-[1.8rem] sm:translate-y-[1.8rem] md:translate-y-[1.8rem] lg:translate-y-[1.8rem]",
            },
            {
              name: "ThreeJS",
              className:
                "font-normal scale-[2] sm:scale-[2.4] md:scale-[2.6] lg:scale-[3] translate-x-[14rem] sm:translate-x-[18rem] md:translate-x-[25.5rem] translate-y-[10.5rem] sm:translate-y-[10.5rem] md:translate-y-[10.5rem] lg:translate-y-[10.5rem]",
            },
            {
              name: "HTML5",
              className:
                "font-light scale-[2.5] sm:scale-[3] md:scale-[3.5] lg:scale-[4] translate-x-[9rem] sm:translate-x-[12rem] md:translate-x-[15rem] translate-y-[4.5rem] sm:translate-y-[6rem] md:translate-y-[6rem] lg:translate-y-[6rem]",
            },
            {
              name: "CSS",
              className:
                "font-light scale-[1.5] sm:scale-[1.7] md:scale-[1.8] lg:scale-[2] translate-x-[4.8rem] sm:translate-x-[7rem] md:translate-x-[8.5rem] translate-y-[5rem] sm:translate-y-[5rem] md:translate-y-[5rem] lg:translate-y-[5rem]",
            },
            {
              name: "Docker",
              className:
                "font-bold scale-[1.8] sm:scale-[2] md:scale-[2.2] lg:scale-[2.4] rotate-90 translate-x-[13rem] sm:translate-x-[18rem] md:translate-x-[27rem] translate-y-[2.2rem] sm:translate-y-[-5.8rem] md:translate-y-[-5.8rem] lg:translate-y-[-5.8rem]",
            },
            {
              name: "Linux",
              className:
                "font-bold scale-[1.4] sm:scale-[1.6] md:scale-[1.7] lg:scale-[1.85] translate-x-[4rem] sm:translate-x-[5rem] md:translate-x-[6.4rem] translate-y-[6.5rem] sm:translate-y-[6.5rem] md:translate-y-[6.5rem] lg:translate-y-[6.5rem]",
            },
            {
              name: "Bash",
              className:
                "font-bold scale-[1.5] sm:scale-[1.7] md:scale-[1.9] lg:scale-[2] translate-x-[3.7rem] sm:translate-x-[2.5rem] md:translate-x-[3.1rem] translate-y-[3.7rem] sm:translate-y-[4.8rem] md:translate-y-[4.8rem] lg:translate-y-[4.8rem]",
            },
            {
              name: "Nginx",
              className:
                "font-bold scale-[2.5] sm:scale-[3] md:scale-[3.2] lg:scale-[3.4] text-orange-500 translate-x-[8rem] sm:translate-x-[20rem] md:translate-x-[30rem] translate-y-[2.1rem] sm:translate-y-[2.1rem] md:translate-y-[2.1rem] lg:translate-y-[2.1rem]",
            },
            {
              name: "PM2",
              className:
                "font-bold scale-[1.2] sm:scale-[1.5] md:scale-[1.7] lg:scale-[1.8] text-orange-500 translate-x-[15rem] sm:translate-x-[25rem] md:translate-x-[33.8rem] translate-y-[12.5rem] sm:translate-y-[9.5rem] md:translate-y-[9.5rem] lg:translate-y-[9.5rem]",
            },
          ].map((tech, index) => (
            <p
              key={index}
              className={`absolute whitespace-nowrap tracking-tight ${tech.className}`}
            >
              {tech.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
