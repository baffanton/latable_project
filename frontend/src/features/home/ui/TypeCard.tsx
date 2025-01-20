import { FC, useState } from "react";
import cn from "classnames";
import s from "./TypeCard.module.scss";
import { TypeCardModel, TypeCardTypes } from "@pages/HomePage/model/types";
import { getCardInfoByCardId } from "../lib/getCardInfoByCardId";
import { Image } from "@shared/ui/Image";
import { Title } from "@shared/ui/Title";

interface TypeCardProps {
  cardId: TypeCardTypes;
  onCardClick: (cardId: TypeCardTypes) => void;
}

const TypeCard: FC<TypeCardProps> = ({ cardId, onCardClick }) => {
  const [cardInfo, setCardInfo] = useState<TypeCardModel>(getCardInfoByCardId(cardId));
  const [isActive, setIsActive] = useState<boolean>(false);

  const onFocusHandler = () => {
    setIsActive(true);
    setCardInfo({
      ...cardInfo,
      style: { ...cardInfo.style, zIndex: 99 },
    });
  };

  const onBlurHandler = () => {
    setIsActive(false);
    setCardInfo(getCardInfoByCardId(cardId));
  };

  return (
    <div
      className={cn(s["type-card"], isActive && s["type-card_isActive"])}
      style={cardInfo.style}
      onMouseOver={onFocusHandler}
      onMouseOut={onBlurHandler}
      onClick={() => onCardClick(cardId)}
    >
      <Title size="lg" font="julius-sans-one" className={s["type-card__title"]}>
        {cardInfo.title}
      </Title>
      <Image className={s["type-card__image"]} src={cardInfo.image} alt={cardInfo.title} />
    </div>
  );
};

export default TypeCard;
