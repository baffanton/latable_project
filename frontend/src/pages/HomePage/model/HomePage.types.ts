import { CSSProperties } from "react";

interface TypeCardModel {
  title: string;
  image: string;
  style: CSSProperties;
}

enum TypeCardTypes {
  fastfood = "fastfood",
  cafe = "cafe",
  bar = "bar",
  grill = "grill",
  restaurant = "restaurant",
}

enum TypeCardInfoWidth {
  low = "17vw",
  medium = "19vw",
  large = "21vw",
}

enum TypeCardInfoHeight {
  low = "37vh",
  medium = "40vh",
  large = "44vh",
}

export type { TypeCardModel };
export { TypeCardTypes, TypeCardInfoWidth, TypeCardInfoHeight };
