import { Logo } from "./Logo";
import Socials from "./Socials";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <Logo />
          <p className="footer__text">
            dotlabs() es una comunidad donde se enseña Web3 a cualquier persona
            que esté interesada en escribir el futuro del internet
          </p>
          <Socials white={true} />
        </div>
      </div>
    </footer>
  );
};
