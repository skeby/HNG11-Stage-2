import { Image as AntdImage, ImageProps } from "antd";
import fallbackImage from "../static/imageFallback.json";

interface Props extends ImageProps {}

const Image = (props: Props) => {
  const { fallback, preview, className, placeholder, ...rest } = props;
  // TODO: Include image tint
  // TODO: Find a way to make sure fallback image is of the same size as image
  return (
    <AntdImage
      {...rest}
      fallback={fallback ?? fallbackImage}
      placeholder={
        placeholder ?? <img src={fallbackImage} className={className} />
      }
      preview={preview ?? false}
    />
  );
};

export default Image;
