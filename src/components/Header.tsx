import DotlbasLogo from "./DotlbasLogo";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <Link href="/" passHref>
        <DotlbasLogo />
      </Link>
      <ConnectKitButton 
      // customTheme={
      //   {
      //     "--ck-overlay-background": "rgba(255, 0, 0, 0)",
      //   }
      // } 
      />
    </header>
  );
};

export default Header;
