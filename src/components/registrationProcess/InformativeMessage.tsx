import styles from "@/styles/components/registration/InformativeMessage.module.scss";
import Link from "next/link";
import { appConfig } from "../../constants";
import { BackToHomeButton } from "../buttons/BackToHomeButton";

const { branding } = appConfig;

export const InformativeMessage = () => {
  return (
    <div className="flex flex-col justify-center border-b-2 pt-10 pb-10 gap-2">
      <BackToHomeButton />
      <h1 className={`${styles.title} text-5xl md:text-7xl font-extrabold `}>
        Hola<span className={`${styles.title__span}`}>!</span>
      </h1>
      <h3 className="text-xl md:text-2xl font-bold mx-auto">
        Estamos probando un nuevo sistema de registro y{" "}
        <a
          href={branding.feedbackForm}
          target="_blank"
          rel="noreferrer"
          className="text-blue-400"
        >
          nos gustaría conocer tu opinion{" "}
        </a>{" "}
      </h3>
    </div>
  );
};
