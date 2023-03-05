import Head from "next/head";

import { ComponentWithChildren } from "@/types";
import { backgroundGradientColor } from "utils/constants";
import Header from "./Header";


interface LayoutProps extends ComponentWithChildren {
    headTitle: string;
}

const Layout = ({ children, headTitle }: LayoutProps) => {
    return (
        <div>
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
            </Head>
            <body className={`w-full mx-auto ${backgroundGradientColor}`}>
                <Header/>
                <main className="mx-auto">
                    {children}
                </main>
            </body>
        </div>
    )
}

export default Layout;