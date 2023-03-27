import Image from "next/image";
import LogoImg from "../../public/assets/icons/dotlabs-hand-white.svg";

export const Logo = () => {
  return (
    <>
      <Image width={40} height={40} src={LogoImg} alt="Twitter Icon" />
    </>
  );
};
