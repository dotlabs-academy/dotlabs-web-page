import Image from "next/image";
import { backgroundGradientColor } from "utils/constants";
import Countdown from "./Countdown";
import DotlbasLogo from "./DotlbasLogo";
import Socials from "./Socials";

const Header = () => {
    return (
        <header className="h-16 sticky top-0 backdrop-blur-[2px] z-50">
            <div
                className={`flex justify-between items-center py-3 px-12  text-main`}
            >
                <DotlbasLogo />
                <nav className="hidden lg:flex gap-x-4 justify-self-center">
                    <a className="hover:font-semibold cursor-pointer">Home</a>
                    <a className="hover:font-semibold cursor-pointer">Date</a>
                    <a className="hover:font-semibold cursor-pointer">Team</a>
                    <a className="hover:font-semibold cursor-pointer">Prizes</a>
                    <a className="hover:font-semibold cursor-pointer">Ticket</a>
                    <a className="hover:font-semibold cursor-pointer">FAQ</a>
                    <a className="hover:font-semibold cursor-pointer">Map</a>
                </nav>
                <Socials />
            </div>
            <Countdown/>
        </header>
    )
}

export default Header;