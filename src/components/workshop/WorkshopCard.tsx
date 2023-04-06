import { IoLocationSharp } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";
import { RxDividerHorizontal } from "react-icons/rx";

import styles from "@/styles/components/workshops/workshopCard.module.scss";

type WordShopCardTheme = "colorful" | "dark";
export interface IWorkshopCard {
  title: string;
  date: string;
  speakers: string[];
  tags: string[];
  description: string;
  calendarEventUrl: string;
  theme?: WordShopCardTheme;
}

export const WorkshopCard = ({
  title,
  date,
  speakers,
  tags,
  description,
  calendarEventUrl,
  theme = "colorful",
}: IWorkshopCard) => {
  const Speakers = () => (
    <p>
      <span className="font-bold">Presentado por:</span> {speakers.join(", ")}
    </p>
  );

  const DateEl = () => {
    if (date === "") return null;

    return (
      <p>
        {new Intl.DateTimeFormat("es", { dateStyle: "long" }).format(
          new Date(date)
        )}
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

  const themeToClassNameMap = {
    cardMetadata: {
      colorful: styles.card__colorful,
      dark: styles.card__dark,
    },
    cardLocationMetadata: {
      colorful: styles.card__locationMetadata__colorful,
      dark: styles.card__locationMetadata__dark,
    },
  };
  return (
    <div
      className={`${styles.card} ${themeToClassNameMap["cardMetadata"][theme]}`}
    >
      <div className={`${styles.card__metadata}`}>
        <div className={`${styles.card__metadata__title}`}>
          <h1>{title}</h1>
          <p> -&gt; {speakers.join(" & ")}</p>
        </div>
        <div className={`${styles.card__metadata__description} `}>
          <p>{description}</p>
          <p>{tags.join(", ")}</p>
        </div>
      </div>
      <div className={`${themeToClassNameMap["cardLocationMetadata"][theme]}`}>
        <DateEl />
        <RxDividerHorizontal />
        <p>Lugar por definir...</p>
      </div>
    </div>
  );
};
