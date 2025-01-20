import fastfoodImage from "../assets/Fastfood.png";
import cafeImage from "../assets/Cafe.png";
import barImage from "../assets/Bar.png";
import restaurantImage from "../assets/Restaurant.png";
import grillImage from "../assets/Grill.png";
import { TypeCardInfoHeight, TypeCardInfoWidth, TypeCardModel, TypeCardTypes } from "@pages/HomePage/model/types";

const getCardInfoByCardId = (cardId: TypeCardTypes): TypeCardModel => {
  switch (cardId) {
    case TypeCardTypes.fastfood:
      return {
        title: "Fastfood",
        image: fastfoodImage,
        style: { width: TypeCardInfoWidth.low, height: TypeCardInfoHeight.low, zIndex: 1 },
      };
    case TypeCardTypes.bar:
      return {
        title: "Bar",
        image: barImage,
        style: { width: TypeCardInfoWidth.medium, height: TypeCardInfoHeight.medium, zIndex: 2 },
      };
    case TypeCardTypes.restaurant:
      return {
        title: "Restaurant",
        image: restaurantImage,
        style: { width: TypeCardInfoWidth.large, height: TypeCardInfoHeight.large, zIndex: 3 },
      };
    case TypeCardTypes.grill:
      return {
        title: "Grill",
        image: grillImage,
        style: { width: TypeCardInfoWidth.medium, height: TypeCardInfoHeight.medium, zIndex: 2 },
      };
    case TypeCardTypes.cafe:
      return {
        title: "Cafe",
        image: cafeImage,
        style: { width: TypeCardInfoWidth.low, height: TypeCardInfoHeight.low, zIndex: 1 },
      };
  }
};

export { getCardInfoByCardId };
