import Image from "next/image";

const DotlbasLogo = () => {
  return (
    <div
      id="dotlabsLogo"
      className="flex items-center gap-x-4 w-48 cursor-pointer"
    >
      <Image
        src="assets/icons/dotlabs-hand.svg"
        alt="Dotlabs"
        width={35}
        height={35}
      />
      <span className="font-bold text-main text-xl"></span>
    </div>
  );
};

export default DotlbasLogo;
