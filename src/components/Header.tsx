import DotlbasLogo from "./DotlbasLogo";
import Socials from "./Socials";

const Header = () => {
  return (
    <header className="h-16 sticky top-0 bg-white/50 backdrop-blur-sm z-50 border-b-2 border-main shadow-md">
      <div
        className={`flex justify-between items-center py-3 px-6 md:px-12  text-main`}
      >
        <DotlbasLogo />

        <Socials />
      </div>
    </header>
  );
};

export default Header;
