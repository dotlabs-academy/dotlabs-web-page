import Layout from "@/components/Layout";
import Link from "next/link";
import styles from "@/styles/components/homepage.module.scss"

const stdButtonClass =
  "rounded-md text-center flex-1 text-lg font-bold border-2 border-main w-full py-2 shadow-md";

function HomePage() {
  return (
    <Layout headTitle="dotlabs(Medellin)">
      <div className={`${styles.container_column} ${styles.main__container}lg:py-14`}>
        <div className="flex flex-col gap-5 items-center">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-main to-orange-dimmed">
            Bienvenido a Dotlabs()
          </h1>
          <p className="text-xl md:text-2xl">Comunidad. Desarrolladores. Blockchain.</p>
          <p>
            Somos el lugar perfecto para aprender Blockchain de una forma fácil
            y guiada. Aprende, profundiza, conecta y enseña.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-2 w-full">
          <a
            href="https://dotlabs-workshops-calendar.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className={`${stdButtonClass} bg-main  text-white`}
          >
            Workshops
          </a>
          <Link
            href="/registration"
            className={`${stdButtonClass}  bg-transparent  text-main`}
          >
            Regístrate
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
