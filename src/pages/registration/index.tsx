import { Suspense } from "react";
import { NextPage } from "next";

import Layout from "@/components/Layout";
import { RegistrationManagerContractContext } from "../../hooks/RegistrationManagerContractContext";
import { RegistrationProcess } from "../../components/registrationProcess/Process";
import { ProcessLoading } from "../../components/registrationProcess/ProcessLoading";

const Registration: NextPage = () => {
  const InformativeMessage = () => {
    return (
      <div className="flex flex-col justify-center border-b-2 pb-10 gap-2">
        <h1 className="text-5xl md:text-7xl font-extrabold ">
          HI<span className="text-yellow-200">!</span>
        </h1>
        <h3 className="text-xl md:text-2xl font-bold mx-auto">
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
        flex flex-col w-full items-center justify-center mb-24
        max-w-2xl mx-auto px-5
        md:py-16 md:px-16 
        font-mono text-zinc-500
        `}
      >
        <InformativeMessage />
        <RegistrationManagerContractContext>
          <Suspense fallback={<ProcessLoading />}>
            <div className="flex flex-col items-center mt-5 gap-5">
              <RegistrationProcess />
            </div>
          </Suspense>
        </RegistrationManagerContractContext>
      </div>
    </Layout>
  );
};

export default Registration;
