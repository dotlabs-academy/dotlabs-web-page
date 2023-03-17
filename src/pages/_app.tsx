import type { AppProps } from "next/app";
import { ConnectKitProvider } from "connectkit";
import { WagmiConfig } from "wagmi";

import "@/styles/globals.css";
import { client } from "../../lib/WalletProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <Component {...pageProps} />
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
