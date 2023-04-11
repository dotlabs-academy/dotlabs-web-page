import Image from "next/image";
import dotlabsLogo from "../../public/assets/icons/dotlabs_noBG_white.png";

const DotlbasLogo = () => {
  return <Image src={dotlabsLogo} alt="dotlabs()" width={60} height={60} style={{marginLeft: "-9.5px"}}/>;
};

export default DotlbasLogo;
