import styles from "@/styles/Home.module.css"
import { Title } from "./HomePage/Title";
import { ParticlesBack } from "./Particles";


function Home(){
    return (
      <>
        <ParticlesBack />
        <section className="h-full w-screen grid place-items-center">
          <Title/>
        </section>

      </>
    );
}

export {Home}