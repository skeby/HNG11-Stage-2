import { Image as AntdImage, ImageProps } from "antd"
import fallbackImage from "../static/imageFallback.json"

interface Props extends ImageProps {}

const Image = (props: Props) => {
  const { fallback, preview, className, ...rest } = props
  return (
    <AntdImage
      {...rest}
      fallback={fallback ?? fallbackImage}
      preview={preview ?? false}
    />
  )
}

export default Image
