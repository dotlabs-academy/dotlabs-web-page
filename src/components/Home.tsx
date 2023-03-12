import { ParticlesBack } from "./Particles";

function Home() {
  return (
    <>
      <ParticlesBack />
      <div className="flex flex-col justify-center items-center h-80 relative z-1">
        <h1 className="font-bitter font-bold text-8xl text-main backdrop-blur-md py-10 px-20 border-2 border-main shadow-lg">
          DOTLABS ( )
        </h1>
        {/* <p>
            Entusiastas de la tecnología unidos para compartir conocimientos y
            experiencias
          </p>
          <p>
            Dotlabs() es una comunidad de desarrolladores. Somos un equipo que
            comparte conocimientos, experiencias y grandes momentos.
          </p> */}
      </div>
    </>
  );
}

export { Home };
