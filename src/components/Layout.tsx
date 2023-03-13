import Head from "next/head";

import { ComponentWithChildren } from "@/types";
import { backgroundGradientColor } from "utils/constants";
import Header from "./Header";

interface LayoutProps extends ComponentWithChildren {
  headTitle: string;
}

const Layout = ({ children, headTitle }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta
          name="description"
          content="Ven y unete a la Hackathon de Web3 mas grande de LATAM."
        />
        <meta property="og:image" content="/dotlabs.jpg" />
        <meta property="og:image:secure_url" content="/dotlabs.jpg" />
        <meta property="image" content="/dotlabs.jpg" />
        <link href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      </Head>
      <body className={`w-full mx-auto h-screen bg-purple-dotlabs ${backgroundGradientColor}`}>
        <Header />
        <main className="mx-auto h-full md:h-3/4 lg:h-3/4">{children}</main>
      </body>
    </>
  );
};

export default Layout;
