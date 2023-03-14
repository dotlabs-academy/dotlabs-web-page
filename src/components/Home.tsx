import styles from "@/styles/Home.module.css"
import { ParticlesBack } from "./Particles";


function Home(){
    return (
      <>
        <ParticlesBack />
        <div className="flex flex-col justify-center items-center h-80 relative z-1">
          <h1 className={`font-bitter font-bold text-5xl ${styles.title}`}>
            DOTLABS ( )
          </h1>
          <p className="text-center font-bold">
            Entusiastas de la tecnología unidos para compartir conocimientos y
            experiencias
          </p>
          <p className="text-center">
            Dotlabs() es una comunidad de desarrolladores. Somos un equipo que
            comparte conocimientos, experiencias y grandes momentos.
          </p>
        </div>
      </>
    );
}

export {Home}