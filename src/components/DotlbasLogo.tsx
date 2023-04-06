import Image from "next/image";
import dotlabsLogo from "../../public/assets/icons/dotlabs_noBG_white.png";

const DotlbasLogo = () => {
  return <Image src={dotlabsLogo} alt="dotlabs()" width={50} height={50} />;
};

export default DotlbasLogo;
