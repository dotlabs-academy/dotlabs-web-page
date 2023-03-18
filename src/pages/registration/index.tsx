import { Suspense } from "react";
import { NextPage } from "next";
import { BsArrowLeft } from "react-icons/bs";

import Layout from "@/components/Layout";
import { RegistrationManagerContractContext } from "../../hooks/RegistrationManagerContractContext";
import { RegistrationProcess } from "../../components/registrationProcess/Process";
import { ProcessLoading } from "../../components/registrationProcess/ProcessLoading";
import { InformativeMessage } from "../../components/registrationProcess/InformativeMessage";
import Link from "next/link";

const Registration: NextPage = () => {
	return (
		<Layout headTitle="dotlabs(Medellin) - Registration">
			<div
				className={`
        flex flex-col w-full font-mono text-zinc-500
		mb-24 max-w-2xl mx-auto
        md:py-10 md:px-16 
        `}
			>
				<div>
					<Link href="/">
						<div className="flex gap-2 items-center text-zinc-400 hover:text-blue-500 mb-5">
							<BsArrowLeft />
							<p className="text-xl md:text-2xl font-bold">
								Back to home
							</p>
						</div>
					</Link>
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
		</Layout >
	);
};

export default Registration;

