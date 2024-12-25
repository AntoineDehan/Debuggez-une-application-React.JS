import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort(
    (evtA, evtB) => (new Date(evtA.date) < new Date(evtB.date) ? -1 : 1) // J'ai changé la direction du "<" en ">"
  );
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0), // J'ai mis "-1" a byDateDesc.length pour reset le slider quand il arrive à la fin
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => {
        console.log("Event object:", event);
        console.log("Event TITLE", event?.title);
        console.log("Event DATE:", event?.date);
        return (
          <>
            <div
              key={event.title}
              className={`SlideCard SlideCard--${
                index === idx ? "display" : "hide"
              }`}
            >
              <img src={event.cover} alt="forum" />
              <div className="SlideCard__descriptionContainer">
                <div className="SlideCard__description">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div>{getMonth(new Date(event.date))}</div>
                </div>
              </div>
            </div>
            <div className="SlideCard__paginationContainer">
              <div className="SlideCard__pagination">
                {byDateDesc.map((_, radioIdx) => (
                  <input
                    key={`${event.date}+${event.title}`}
                    type="radio"
                    name="radio-button"
                    checked={idx === radioIdx}
                  />
                ))}
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Slider;
