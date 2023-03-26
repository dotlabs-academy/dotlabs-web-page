import { ExternalLink } from "../common/ExternalLink";
export const IsRegistered = () => {
  return (
    <div className="text-zinc-400">
      <p className="text-2xl font-extrabold  my-auto">Ya estas registrado ✅</p>
      <p>
        Nos vemos en el evento, si tienes alguna duda, puedes contactarnos via
        <ExternalLink href="https://discord.gg/CuNzCS6A">Discord</ExternalLink>.
      </p>
    </div>
  );
};
