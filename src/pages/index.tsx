import Layout from "@/components/Layout";
import Link from "next/link";

function HomePage() {
  return (
    <Layout headTitle="dotlabs(Medellin)" className="background">
      <div className="homepage homepage__container">
        <h1 className="homepage__title">Bienvenido a Dotlabs()</h1>
        <p className="homepage__subtitle">
          Comunidad. Desarrolladores. Blockchain.
        </p>
        <p className="homepage__copy">
          Somos el lugar perfecto para aprender Blockchain de una forma fácil y
          guiada. Aprende, profundiza, conecta y enseña.
        </p>

        <div className="homepage__btn--container">
          <Link href="/" className="homepage__btn homepage__btn--blue">
            Talleres
          </Link>
          <Link href="/" className="homepage__btn homepage__btn--white">
            Regístrate
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
