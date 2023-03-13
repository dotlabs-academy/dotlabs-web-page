import { Title } from "./HomePage/Title";
import { ParticlesBack } from "./Particles";

function Home() {
  return (
    <>
      <ParticlesBack />
      <div className="flex flex-col justify-center items-center h-full ">
        <Title />
 
      </div>
    </>
  );
}

export { Home };
