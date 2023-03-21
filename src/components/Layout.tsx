import { ComponentWithChildren } from "@/types";
import Header from "./Header";

interface LayoutProps extends ComponentWithChildren {
  headTitle: string;
  className?: string;
}

const Layout = ({ children, headTitle, className }: LayoutProps) => {
  return (
    <div className={className}>
      <Header />
      <main className="pt-16 flex flex-col justify-center h-full items-center">{children}</main>
    </div>
  );
};

export default Layout;
