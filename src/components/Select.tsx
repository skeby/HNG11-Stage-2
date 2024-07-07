import { Select as AntdSelect, SelectProps } from "antd"

interface Props extends SelectProps {}
const Select = (props: Props) => {
  const { className, ...rest } = props
  return (
    <AntdSelect
      {...rest}
      className={
        className
          ? className
          : "h-11 w-full rounded-sm border-[#E4E7E9] placeholder:text-[#77878F]"
      }
    />
  )
}

export default Select
