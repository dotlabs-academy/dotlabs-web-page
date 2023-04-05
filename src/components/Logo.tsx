import Image from "next/image";
import LogoImg from "../../public/assets/icons/dotlabs_noBG_white.png";

export const Logo = () => {
  return (
    <>
      <Image width={70} height={70} src={LogoImg} alt="Twitter Icon" />
    </>
  );
};
