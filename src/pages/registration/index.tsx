import { Suspense } from "react";
import { NextPage } from "next";

import Layout from "@/components/Layout";
import { RegistrationManagerContractContext } from "../../hooks/RegistrationManagerContractContext";
import { RegistrationProcess } from "../../components/registrationProcess/Process";
import { ProcessLoading } from "../../components/registrationProcess/ProcessLoading";
import { InformativeMessage } from "../../components/registrationProcess/InformativeMessage";

const Registration: NextPage = () => {
  return (
    <Layout headTitle="dotlabs(Medellin) - Registration">
      <div
        className={`
        flex flex-col w-full items-center justify-center mb-24 
        max-w-2xl mx-auto px-5 py-5
        md:py-10 md:px-16 
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
