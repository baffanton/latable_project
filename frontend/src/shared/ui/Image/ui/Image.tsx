import { FC } from "react";
import { Skeleton } from "../../Skeleton";

interface ImageProps {
  isLoading?: boolean;
  src: string;
  alt: string;
  className?: string;
}

const Image: FC<ImageProps> = ({ isLoading, ...props }) => {
  if (isLoading) {
    return <Skeleton type="image" />;
  }

  return <img {...props} />;
};

export { Image };
