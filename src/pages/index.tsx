import Layout from "@/components/Layout";
import Socials from "@/components/Socials";
import Link from "next/link";

function HomePage() {
  return (
    <Layout headTitle="dotlabs(Medellin)">
      <svg
        className="background__shade"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "80%",
          height: "100%",
        }}
      >
        <defs>
          <linearGradient
            id="paint0_linear_837_2898"
            x1="18.4472"
            y1="331.25"
            x2="376"
            y2="35.9329"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0%"
              style={{ stopColor: "#101C7A", stopOpacity: 1 }}
            />
            <stop offset="100%" style={{ stopColor: "#000", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path
          d="M306.731 0L136.578 22.5808C122.11 38.6164 91.9117 72.8083 86.8531 81.2908C80.5298 91.894 21.7041 111.101 75.4515 142.714C129.199 174.327 121.056 166.259 86.8531 210.439C52.6499 254.619 79.3806 188.108 18.4472 245.443C-42.4863 302.779 62.7101 283.34 114.446 303.564C166.182 323.789 153.248 290.212 212.457 331.25C271.666 372.289 232.002 256.243 299.258 245.443C366.515 234.644 286.324 186.733 299.258 110.351C309.606 49.2458 354.731 35.2784 376 35.9329L306.731 0Z"
          fill="url(#paint0_linear_837_2898)"
        />
      </svg>
      <svg
        className="background__shade"
        viewBox="0 0 1100 900"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "90%",
          height: "90%",
          zIndex: 0,
        }}
      >
        <defs>
          <linearGradient
            id="paint1_linear_837_2898"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              style={{ stopColor: "#01754B", stopOpacity: 1 }}
            />
            <stop offset="100%" style={{ stopColor: "#000", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path
          d="M484.333 630.421L704.919 377.788C677.311 384.461 600.369 393.804 513.467 377.788C404.839 357.767 569.654 258.145 484.333 123.248C399.013 -11.6485 547.179 72.7212 786.493 6.94126C977.945 -45.6827 1059.94 213.814 1077 350.141L845.594 824.9C867.375 648.216 875.06 377.025 731.555 705.734C588.05 1034.44 598.788 818.227 622.095 669.031L533.861 746.727L484.333 630.421Z"
          fill="url(#paint1_linear_837_2898)"
          fill-opacity="1"
        />
      </svg>
      <div className="homepage homepage__container">
        <h1 className="homepage__title">
          <span>{"{"}</span>
          {"knowledge"}
          <span>{"}"}</span>&nbsp;= dotlabs()
        </h1>
        <p className="homepage__copy">
          Impulsamos el desarrollo y la adopción de blockchain a través de la
          enseñanza, la investigación y la creación de proyectos.{" "}
          <br/>
          <span>
            Queremos que la tecnología blockchain sea accesible para todos.
          </span>
        </p>

        <div className="homepage__btn--container">
          <Link href="/talleres" className="homepage__btn homepage__btn--white">
            Talleres
          </Link>
          <a
            href="https://discord.gg/5a6V3tnXpW"
            target="_blank"
            rel="noreferrer"
            className="homepage__btn homepage__btn--bordered"
          >
            ¡Únete a la comunidad!
          </a>
        </div>
        <Socials white={true} />
      </div>
    </Layout>
  );
}

export default HomePage;
