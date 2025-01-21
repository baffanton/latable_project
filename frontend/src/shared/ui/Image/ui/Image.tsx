import { FC } from "react";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const Image: FC<ImageProps> = (props) => {
  return <img {...props} />;
};

export { Image };
