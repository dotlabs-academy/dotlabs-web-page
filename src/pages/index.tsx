import Layout from "@/components/Layout";
import Link from "next/link";
import styles from "@/styles/components/homepage.module.scss"

const stdButtonClass =
  "";

function HomePage() {
  return (
    <Layout headTitle="dotlabs(Medellin)">
      <div
        className={`${styles.container_column} ${styles.main__container} lg:py-14`}
      >
        <div className={`${styles.container_column} ${styles.container_gap}`}>
          <h1 className={`${styles.title}  md:text-6xl`}>
            Bienvenido a Dotlabs()
          </h1>
          <p className={`${styles.subtitle} md:text-2xl`}>
            Comunidad. Desarrolladores. Blockchain.
          </p>
          <p>
            Somos el lugar perfecto para aprender Blockchain de una forma fácil
            y guiada. Aprende, profundiza, conecta y enseña.
          </p>
        </div>

        <div className={`${styles.btn_container} "md:flex-row"`}>
          <a
            href="https://dotlabs-workshops-calendar.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className={`${styles.commonButton} ${styles.btn} ${styles.btn_blue} `}
          >
            Workshops
          </a>
          <Link
            href="/registration"
            className={`${styles.commonButton} ${styles.btn} ${styles.btn_white} `}
          >
            Regístrate
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
