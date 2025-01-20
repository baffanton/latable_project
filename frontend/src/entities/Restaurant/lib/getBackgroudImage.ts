import firstBackgroundImage from "../assets/bannerImageFirst.jpg";
import secondBackgroundImage from "../assets/bannerImageSecond.jpg";
import thirdBackgroundImage from "../assets/bannerImageThird.jpg";
import fourthBackgroundImage from "../assets/bannerImageFourth.jpg";
import fifthBackgroundImage from "../assets/bannerImageFifth.jpg";

export const getBackgroudImage = (index: number) => {
  switch (index) {
    case 0:
      return firstBackgroundImage;
    case 1:
      return secondBackgroundImage;
    case 2:
      return thirdBackgroundImage;
    case 3:
      return fourthBackgroundImage;
    case 4:
      return fifthBackgroundImage;
    default:
      return firstBackgroundImage;
  }
};
