import { Input as AntdInput, InputProps } from "antd";

interface Props extends InputProps {}
const Input = (props: Props) => {
  const { classNames, ...rest } = props;
  return (
    <AntdInput
      {...rest}
      classNames={
        classNames ?? {
          input:
            "placeholder:text-[#77878F] !w-full h-11 rounded-sm border-[#E4E7E9]",
        }
      }
    />
  );
};

export default Input;
