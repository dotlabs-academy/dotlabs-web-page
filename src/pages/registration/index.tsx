import { NextPage } from "next";

import styles from "@/styles/Registration.module.css";
import { RegistrationProcess } from "@/components/registrationProcess/Process";
import Layout from "@/components/Layout";
import { RegistrationManagerContractContext } from "../../hooks/RegistrationManagerContractContext";

const Registration: NextPage = () => {
  const InformativeMessage = () => {
    return (
      <div className="flex flex-col justify-center border-b-2 pb-10 gap-2">
        <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-400">
          HI<span className="text-yellow-200">!</span>
        </h1>
        <h3 className="text-xl md:text-2xl font-bold text-zinc-400 mx-auto">
          We are testing a new registration system and we love your{" "}
          <a className="text-blue-400">feedback</a> about it.
        </h3>
      </div>
    );
  };

  return (
    <Layout headTitle="dotlabs(Medellin) - Registration">
      <div
        className={`
        ${styles.containerBlackBorder}
        flex flex-col w-full items-center justify-center mb-24
        max-w-2xl mx-auto mt-20 px-5
        md:py-16 md:px-16 
        font-mono
        `}
      >
        {InformativeMessage()}
        <RegistrationManagerContractContext>
          <RegistrationProcess />
        </RegistrationManagerContractContext>
      </div>
    </Layout>
  );
};

export default Registration;
