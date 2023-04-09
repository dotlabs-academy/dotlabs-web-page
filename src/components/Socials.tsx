import { BsDiscord, BsInstagram, BsGithub, BsTwitter } from "react-icons/bs";

export interface SocialsProps {
  white?: boolean;
  customStyles?: string;
}

const Socials = ({ white, customStyles }: SocialsProps) => {
  return (
    <div className={`flex gap-x-5 justify-self-end ${customStyles ?? ""}`}>
      <a
        className="flex justify-center"
        href="https://twitter.com/dotlabs__"
        target="_blank"
        rel="noreferrer"
      >
        <BsTwitter className="text-2xl" />
      </a>
      <a
        className="flex justify-center"
        href="https://github.com/dotlabs-academy"
        target="_blank"
        rel="noreferrer"
      >
        <BsGithub className="text-2xl" />
      </a>
      <a
        className="flex justify-center"
        href="https://www.instagram.com/dotlabs__/"
        target="_blank"
        rel="noreferrer"
      >
        <BsInstagram className="text-2xl" />
      </a>

      {/* <a
        className="flex justify-center"
        href="https://discord.gg/5a6V3tnXpW"
        target="_blank"
        rel="noreferrer"
      >
        <BsDiscord className="text-2xl" />
      </a> */}
    </div>
  );
};

export default Socials;
