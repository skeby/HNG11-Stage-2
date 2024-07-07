import { Select as AntdSelect, SelectProps } from "antd";

interface Props extends SelectProps {}
const Select = (props: Props) => {
  const { className, ...rest } = props;
  return (
    <AntdSelect
      {...rest}
      className={
        className
          ? className
          : "placeholder:text-[#77878F] w-full h-11 rounded-sm border-[#E4E7E9]"
      }
    />
  );
};

export default Select;
