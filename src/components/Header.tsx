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
        theme="rounded"
        customTheme={{
          "--ck-connectbutton-box-shadow":
            "box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;",
          "--ck-connectbutton-hover-color": "#483690",
        }}
      />
    </header>
  );
};

export default Header;
