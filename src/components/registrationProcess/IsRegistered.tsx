import { ExternalLink } from "../common/ExternalLink";
export const IsRegistered = () => {
  return (
    <div className="text-zinc-400">
      <p className="text-2xl font-extrabold  my-auto">
        You are already registered ✅
      </p>
      <p>
        See you at the event! If you have any questions, please contact us via
        our{" "}
        <ExternalLink href="https://discord.gg/CuNzCS6A">Discord</ExternalLink>.
      </p>
    </div>
  );
};
