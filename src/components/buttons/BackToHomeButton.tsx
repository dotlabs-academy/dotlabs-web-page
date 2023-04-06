import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

export const BackToHomeButton = () => {
  return (
    <Link
      href="/"
      className="
      flex items-center max-w-max gap-3 text-base md:text-xl border-2 border-zinc-700 shadow-md px-3 py-1 transition-all 
       hover:bg-white hover:text-black hover:border-white"
    >
      <BsArrowLeft />
      Volver al inicio
    </Link>
  );
};
