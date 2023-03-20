import { ComponentWithChildren } from "@/types";
import Header from "./Header";

interface LayoutProps extends ComponentWithChildren {
  headTitle: string;
}

const Layout = ({ children, headTitle }: LayoutProps) => {
  return (
    <div className="">
      <Header />
      <main className="pt-16 flex flex-col items-center">{children}</main>
    </div>
  );
};

export default Layout;
