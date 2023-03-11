import { ExternalLink } from "../common/ExternalLink";

export const IsPaused = () => {
  return (
    <div className="text-zinc-400">
      <p className="text-2xl font-extrabold  my-auto text-center">
        Our contract is currently paused <span>⛔</span>
      </p>
      <p>
        Keep your eyes on our social media to know when we will open the
        registration again.
      </p>
      <p>
        You can also go for tokens in a{" "}
        <ExternalLink href="https://goerlifaucet.com/">Faucet</ExternalLink>
      </p>
    </div>
  );
};
