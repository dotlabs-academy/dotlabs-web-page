import Layout from "@/components/Layout";
import { WorkshopsList } from "@/components/workshop/WorkshopsList";
import Link from "next/link";

function WorkshopsPage() {
  return (
    <Layout headTitle="">
      <WorkshopsList />
    </Layout>
  );
}

export default WorkshopsPage;
