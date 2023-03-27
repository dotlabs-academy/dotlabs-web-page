import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

export const BackToHomeButton = () => {
  return (
    <Link
      href="/"
      className="
      flex items-center max-w-max gap-3 md:text-xl border-2 border-main shadow-md px-3 py-1 transition-all 
       hover:bg-main hover:text-white"
    >
      <BsArrowLeft />
      Volver al inicio
    </Link>
  );
};
