import { ComponentWithChildren } from "@/types";
import { Footer } from "./Footer";
import Header from "./Header";
import Head from "next/head";

interface LayoutProps extends ComponentWithChildren {
  headTitle: string;
  className?: string;
}

const Layout = ({ children, headTitle, className }: LayoutProps) => {
  return (
    <div className={className}>
      <Head>
        <title>{headTitle}</title>
        <meta property="og:title" content={headTitle} key="title" />
        <meta
          name="description"
          content="dotlabs() es una comunidad donde se enseña Web3 a cualquier persona que esté interesada en escribir el futuro del internet."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <main className="background ">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
