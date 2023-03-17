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
      <Header />
      <main className="mt-16">{children}</main>
    </>
  );
};

export default Layout;
