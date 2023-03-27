import { IoLocationSharp } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";

export interface IWorkshopCard {
  title: string;
  date: string;
  speakers: string[];
  tags: string[];
  description: string;
  calendarEventUrl: string;
}

export const WorkshopCard = ({
  title,
  date,
  speakers,
  tags,
  description,
  calendarEventUrl,
}: IWorkshopCard) => {
  const Speakers = () => (
    <p>
      <span className="font-bold">Presentado por:</span> {speakers.join(", ")}
    </p>
  );

  const Description = () => {
    if (description === "") return null;
    return <p>{description}</p>;
  };

  const DateEl = () => {
    let elClassName = "w-full py-1 px-3 rounded-2xl";

    const checkDayAndSetClassName = () =>
      new Date(date).toDateString() === new Date().toDateString()
        ? "bg-green-300"
        : "bg-gray-200";

    if (date === "") return null;

    return (
      <p className={`${elClassName} ${checkDayAndSetClassName()}`}>
        {new Intl.DateTimeFormat("es").format(new Date(date))}
      </p>
    );
  };

  const Location = () => {
    return (
      <a
        href="https://goo.gl/maps/jni89bkMGe9MtFb1A"
        rel="noreferrer"
        target="_blank"
        className="flex items-center gap-2"
      >
        <IoLocationSharp />
        <p>Globant, One Plaza</p>
      </a>
    );
  };

  const AddToCalendar = () => {
    return (
      <a
        href={calendarEventUrl}
        rel="noreferrer"
        target="_blank"
        className="flex items-center gap-2"
      >
        <FiExternalLink />
        <p>Agendar</p>
      </a>
    );
  };

  return (
    <div className="flex flex-col border-2 border-main rounded-md z-30 p-5 h-min mx-auto w-full gap-2 backdrop-blur-sm shadow-lg max-w-2xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-4xl font-extrabold flex items-start  text-transparent  bg-clip-text bg-gradient-to-r from-blue-800 via-blue-600 to-pink-500">
          {title}
        </h1>
        <div className="flex text-sm md:text-base gap-2 md:gap-5">
          <Location />
          <span>|</span>
          <AddToCalendar />
        </div>
        <Description />
      </div>
      <DateEl />
      <Speakers />
      <div className="flex flex-wrap gap-2 mt-3">
        {tags.map((t, i) => {
          return (
            <span
              key={`${t}_${i}`}
              className="bg-[#e4eaf4] py-1 px-3 rounded-xl"
            >
              {t}
            </span>
          );
        })}
      </div>
    </div>
  );
};
