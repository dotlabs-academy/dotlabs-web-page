import { Logo } from "./Logo";
import Socials from "./Socials";

export const Footer = () => {
  return (
    <footer className="h-fit bg-gradient-to-tr from-main via-main to-orange-dimmed text-white">
      <div className="max-w-[55rem] mx-auto flex flex-col gap-11 md:flex-row items-center md:gap-44 px-9 md:px-7 py-14 pb-16">
        <div className="flex flex-col gap-5">
          <Logo />
          <p className="w-full">
            dotlabs() es una comunidad sin ánimo de lucro, donde se enseña Web3
            a cualquier persona que esté interesada en escribir el futuro del
            internet
          </p>
          <Socials white={true} />
        </div>
      </div>
    </footer>
  );
};
