import Layout from "@/components/Layout";
import Link from "next/link";
import styles from "@/styles/components/homepage.module.scss"

function HomePage() {
  return (
    <Layout headTitle="dotlabs(Medellin)" className={styles.background}>
      <div
        className={`${styles.container_column} ${styles.main__container} `}
      >
        <div className={`${styles.container_column} ${styles.container_gap}`}>
          <h1 className={`${styles.title}  `}>
            Bienvenido a Dotlabs()
          </h1>
          <p className={`${styles.subtitle} `}>
            Comunidad. Desarrolladores. Blockchain.
          </p>
          <p className={styles.text}>

            Somos el lugar perfecto para aprender Blockchain de una forma fácil
            y guiada. Aprende, profundiza, conecta y enseña.
          </p>
        </div>

        <div className={`${styles.btn_container} `}>
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
