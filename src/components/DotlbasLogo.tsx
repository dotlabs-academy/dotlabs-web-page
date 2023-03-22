import Image from "next/image";

interface IDotlabsLogoProps {
  white?: boolean;
  bigger?: boolean;
}

const DotlbasLogo = ({white} : IDotlabsLogoProps) => {
  return (
    <Image
      src={
        white
          ? "assets/icons/dotlabs-hand-white.svg"
          : "assets/icons/dotlabs-hand.svg"
      }
      alt="Dotlabs"
      width={35}
      height={35}
    />
  );
};
export default DotlbasLogo;
