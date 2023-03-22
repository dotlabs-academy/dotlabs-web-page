import DotlbasLogo from "./DotlbasLogo";
import Socials from "./Socials";
import { appConfig } from "@/constants";

export const Footer = (): JSX.Element => {
  return (
    <footer className={`h-fit ${appConfig.styles.mainGradient} text-white`}>
      <div className="max-w-[55rem] mx-auto flex flex-col gap-11 md:flex-row items-center md:gap-44 px-9 md:px-7 py-14 pb-16">
        <div className="flex flex-col gap-5">
          <div className="flex flex-row items-center gap-5">
            <DotlbasLogo white={true} />
            <p className="font-bold text-lg">{"Dotlabs ()"}</p>
          </div>
          <p className="w-full">
            {
              "Dotlabs() es una comunidad sin ánimo de lucro, donde se enseña Web3 a cualquier persona que esté interesada en escribir el futuro del internet"
            }
          </p>
          <Socials white={true} />
        </div>
      </div>
    </footer>
  );
};
