import { FC } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import s from "./HomePage.module.scss";
import TypeCard from "@features/home/ui/TypeCard";
import { establishmentTypeIds, typeCards } from "./model/HomePage.const";
import { TypeCardTypes } from "./model/HomePage.types";

const HomePage: FC = () => {
  const navigate = useNavigate();

  const onCardClickHandler = (cardId: TypeCardTypes) => {
    const searchParams = createSearchParams({
      establishmentType: establishmentTypeIds[cardId],
    }).toString();

    navigate({
      pathname: "/restaurant-list",
      search: searchParams,
    });
  };

  return (
    <div className={s["home-page"]}>
      <div className={s["home-page__container"]}>
        {typeCards.map((cardId) => (
          <TypeCard key={cardId} cardId={cardId} onCardClick={onCardClickHandler} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
