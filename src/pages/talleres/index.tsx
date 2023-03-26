import Layout from "@/components/Layout";
import { WorkshopsList } from "@/components/workshops/WorkshopsList";
import Link from "next/link";

function WorkshopsPage() {
	return (
		<Layout headTitle="">
			<div>
				<WorkshopsList />
			</div>
		</Layout>
	);
}

export default WorkshopsPage;
