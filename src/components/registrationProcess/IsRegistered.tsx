import { ExternalLink } from "../common/ExternalLink";
export const IsRegistered = () => {
  return (
    <div className="text-zinc-400">
      <p className="text-2xl font-extrabold  my-auto">Ya estás registrado ✅</p>
      <p>
        Nos vemos en el evento, si tienes alguna duda, puedes contactarnos en
        <ExternalLink href="https://discord.gg/CuNzCS6A">Discord</ExternalLink>.
      </p>
    </div>
  );
};
