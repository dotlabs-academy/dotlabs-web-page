import { ConnectKitButton } from "connectkit";

export const IsWalletDisconnected = () => {
  return (
    <>
      <p className="text-2xl font-bold text-zinc-400">
        Please connect your wallet to start
      </p>
      <ConnectKitButton theme="retro" />
    </>
  );
};
