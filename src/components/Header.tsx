import DotlbasLogo from "./DotlbasLogo";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-5 h-16 fixed w-full bg-white/50 backdrop-blur-sm z-50 border-b-2 border-main shadow-md">
      <Link href="/" passHref>
        <DotlbasLogo white={false}/>
      </Link>
      <ConnectKitButton theme="retro" />
    </header>
  );
};

export default Header;
