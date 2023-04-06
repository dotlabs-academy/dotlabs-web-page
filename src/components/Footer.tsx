import { Logo } from "./Logo";
import Socials from "./Socials";

export const Footer = () => {
  return (
    <footer className="h-fit bg-[#101010] text-white border-t-2 border-zinc-700">
      <div className="max-w-[55rem] mx-auto flex flex-col gap-11 md:gap-44 md:flex-row items-center px-4 py-14 pb-16">
        <div className="flex flex-col gap-5">
          <Logo />
          <p className="w-full">
            dotlabs() es una comunidad donde se enseña Web3 a cualquier persona
            que esté interesada en escribir el futuro del internet
          </p>
          <Socials white={true} />
        </div>
      </div>
    </footer>
  );
};
