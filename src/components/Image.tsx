import { Image as AntdImage, ImageProps } from "antd";
import fallbackImage from "../static/imageFallback.json";

interface Props extends ImageProps {}

const Image = (props: Props) => {
  const { fallback, preview, className, placeholder, ...rest } = props;
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
