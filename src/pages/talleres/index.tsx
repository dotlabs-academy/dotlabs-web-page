import Layout from "@/components/Layout";
import { WorkshopsList } from "@/components/workshop/WorkshopsList";

function WorkshopsPage() {
  return (
    <Layout headTitle="Talleres">
      <WorkshopsList />
    </Layout>
  );
}

export default WorkshopsPage;
