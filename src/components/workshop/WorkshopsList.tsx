import WorkshopsData from "@/data/workshops.json";
import Link from "next/link";
import { WorkshopCard } from "./WorkshopCard";

const { workshops } = WorkshopsData;

export const WorkshopsList = () => {
  return (
    <div className="flex flex-col my-auto gap-5 mt-10 mb-32 px-5">
      <Link href="/" passHref>
        <p className="text-zinc-600 md:text-xl hover:text-blue-600 tansition-all">
          Volver al inicio
        </p>
      </Link>

      {workshops.map((w, i) => {
        return (
          <WorkshopCard
            title={w.title}
            date={w.date}
            tags={w.tags}
            speakers={w.speakers}
            description={w.descripcion}
            key={`${i}_${w.title}`}
          />
        );
      })}
    </div>
  );
};
