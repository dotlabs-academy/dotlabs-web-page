import { IoLocationSharp, IoCalendarOutline } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";

type WordShopCardTheme = "colorful" | "dark";

type Location = { text: string; url: string };
type Date = { text: string; url: string };

export interface IWorkshopCard {
  title: string;
  date: Date;
  speakers: string[];
  tags: string[];
  description: string;
  calendarEventUrl: string;
  location: Location;
  theme?: WordShopCardTheme;
}

export const WorkshopCard = ({
  title,
  date,
  speakers,
  tags,
  description,
  calendarEventUrl,
  location,

  theme = "colorful",
}: IWorkshopCard) => {
  const DateEl = () => {
    if (date.text === "") return null;
    return (
      <a href={date.url} className="card__metadata__location__link">
        <IoCalendarOutline />
        <p>
          {new Intl.DateTimeFormat("es", { dateStyle: "long" }).format(
            new Date(date.text)
          )}
        </p>
      </a>
    );
  };

  const Location = () => {
    return (
      <a
        href={location.url}
        className="card__metadata__location__link"
        rel="noreferrer"
        target="_blank"
      >
        <IoLocationSharp />
        {location.text === "" ? "Lugar por definir..." : location.text}
      </a>
    );
  };

  const AddToCalendar = () => {
    return (
      <a href={calendarEventUrl} rel="noreferrer" target="_blank">
        <FiExternalLink />
        <p>Agendar</p>
      </a>
    );
  };

  const themeToClassNameMap = {
    cardMetadata: {
      colorful: "card--colorful",
      dark: "card--dark",
    },
    cardLocationMetadata: {
      colorful: "card__metadata__location--colorful",
      dark: "card__metadata__location--dark",
    },
  };
  return (
    <div className={`card ${themeToClassNameMap["cardMetadata"][theme]}`}>
      <div className="card__metadata">
        <div className="card__metadata__title">
          <h1>{title}</h1>
          <p> -&gt; {speakers.join(" & ")}</p>
        </div>
        <div>
          <div
            className={`card__metadata__location ${themeToClassNameMap["cardLocationMetadata"][theme]}`}
          >
            <DateEl />
            <Location />
          </div>
        </div>
        <div className="card__metadata__description">
          <p>{description}</p>
          <p>{tags.join(", ")}</p>
        </div>
      </div>
    </div>
  );
};
