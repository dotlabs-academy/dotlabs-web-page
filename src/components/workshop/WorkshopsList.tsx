import WorkshopsData from "@/data/workshops.json";
import { BackToHomeButton } from "../buttons/BackToHomeButton";
import { WorkshopCard } from "./WorkshopCard";

const { workshops } = WorkshopsData;

export const WorkshopsList = () => {
  return (
    <div className="flex flex-col my-auto gap-5 mt-10 mb-32 ">
      <div className="px-5 md:px-0">
        <BackToHomeButton />
      </div>

      {workshops.map((w, i) => {
        return (
          <WorkshopCard
            title={w.title}
            date={w.date}
            tags={w.tags}
            speakers={w.speakers}
            description={w.descripcion}
            calendarEventUrl={w.calendarEventUrl}
            key={`${i}_${w.title}`}
          />
        );
      })}
    </div>
  );
};
