import DotlbasLogo from "./DotlbasLogo";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-5 h-16 fixed w-full z-50 bg-[#101010] border-b-2 border-zinc-700">
      <Link href="/" passHref>
        <DotlbasLogo />
      </Link>
      <ConnectKitButton theme="minimal" />
    </header>
  );
};

export default Header;
