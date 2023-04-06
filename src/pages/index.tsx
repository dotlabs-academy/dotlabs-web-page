import Link from "next/link";

import Layout from "../components/Layout";
import styles from "../styles/components/homepage.module.scss";
import Socials from "../components/Socials";

function HomePage() {
  return (
    <Layout headTitle="dotlabs(Medellin)">
      <div className={`${styles.container_column} ${styles.main__container} `}>
        <div className={`${styles.container_column} ${styles.container_gap}`}>
          <h1 className={`${styles.title}`}>Bienvenido a dotlabs()</h1>
          <p className={styles.text}>
            Somos el lugar perfecto para aprender Blockchain de una forma fácil,
            divertida y profesional. Aprende, profundiza, conecta y enseña.
          </p>
        </div>

        <div className={`${styles.btn_container} `}>
          <Link
            href="/talleres"
            className={`${styles.commonButton} ${styles.btn} ${styles.btn_primary} `}
          >
            Talleres
          </Link>
          {/* <Link
            href="/registro"
            className={`${styles.commonButton} ${styles.btn} ${styles.btn_bordered} `}
          >
            Regístrate
          </Link> */}
        </div>
        <Socials white={true} />
      </div>
    </Layout>
  );
}

export default HomePage;
