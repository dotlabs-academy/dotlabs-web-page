import { NextPage } from "next";

import Layout from "../../components/Layout";
import styles from "../../styles/components/registration/index.module.scss";
import Socials from "../../components/Socials";
import { BackToHomeButton } from "../../components/buttons/BackToHomeButton";

const Registration: NextPage = () => {
  return (
    <Layout headTitle="dotlabs(registration)">
      <div className={`${styles.registration__container}`}>
        <BackToHomeButton />
        <h1 className={`${styles.registration__title}`}>
          Estamos haciendo cambios en nuestro sistema para que sea más fácil
          para ti 👷‍♂️👷‍♀️
        </h1>
        <p className={`${styles.registration__helpMessage}`}>
          Siguenos en nuestras redes sociales para enterarte de las ultimas
          novedades.
        </p>
        <Socials white={true} />
      </div>
    </Layout>
  );
};

export default Registration;
