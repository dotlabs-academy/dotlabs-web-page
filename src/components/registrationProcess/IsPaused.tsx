import { ExternalLink } from "../common/ExternalLink";

export const IsPaused = () => {
  return (
    <div className="text-zinc-400">
      <p className="text-2xl font-extrabold  my-auto text-center">
        Nuestro contrato esta pausado actualmente <span>⛔</span>
      </p>
      <p>
        Mantente atento a nuestras redes sociales para saber cuando abriremos
        nuevamente el registro.
      </p>
      <p>
        Puedes ir a reclamar tus tokens en un{" "}
        <ExternalLink href="https://mumbaifaucet.com/">Faucet</ExternalLink>
      </p>
    </div>
  );
};
