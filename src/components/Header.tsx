import DotlbasLogo from "./DotlbasLogo";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";

const Header = () => {
  return (
    <header >
      <Link href="/" passHref>
        <DotlbasLogo />
      </Link>
      <ConnectKitButton theme="retro" />
    </header>
  );
};

export default Header;
