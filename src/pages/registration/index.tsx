import { NextPage } from "next";

import { RegistrationProcess } from "@/components/registrationProcess/Process";
import Layout from "@/components/Layout";

const Registration: NextPage = () => {
  const InformativeMessage = () => {
    return (
      <div className="flex flex-col justify-center border-b-2 pb-10 gap-2">
        <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-300 font-mono">
          HI!
        </h1>
        <h3 className="text-xl md:text-2xl font-bold text-zinc-300 font-mono mx-auto">
          We are testing a new registration system and we love your{" "}
          <a className="text-blue-400">feedback</a> about it.
        </h3>
      </div>
    );
  };

  return (
    <Layout headTitle="dotlabs(Medellin) - Registration">
      <div className="flex flex-col w-full items-center justify-center py-10 md:py-16 px-5 max-w-2xl mx-auto">
        {InformativeMessage()}
        <RegistrationProcess />
      </div>
    </Layout>
  );
};

export default Registration;
