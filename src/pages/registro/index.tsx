import { Suspense } from "react";
import { NextPage } from "next";

import Layout from "@/components/Layout";
import { RegistrationManagerContractContext } from "../../hooks/RegistrationManagerContractContext";
import { RegistrationProcess } from "../../components/registrationProcess/Process";
import { ProcessLoading } from "../../components/registrationProcess/ProcessLoading";
import { InformativeMessage } from "../../components/registrationProcess/InformativeMessage";

const Registration: NextPage = () => {
	return (
		<Layout headTitle="dotlabs(registration)">
			<div
				className={`
        flex flex-col px-5
		    mb-24 max-w-2xl mx-auto
        md:py-10 md:px-16 
        `}
			>
				<div>
					<InformativeMessage />
				</div>
				<div className="flex flex-col items-center mt-5 gap-5">
					<Suspense fallback={<ProcessLoading />}>
						<RegistrationManagerContractContext>
							<RegistrationProcess />
						</RegistrationManagerContractContext>
					</Suspense>
				</div>
			</div>
		</Layout>
	);
};

export default Registration;
