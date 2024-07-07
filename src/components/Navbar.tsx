import Logo from "./Logo";
import { Breadcrumb, Input } from "antd";
import CartIcon from "../components/CartIcon";
import { GoHeart } from "react-icons/go";
import { PiUser } from "react-icons/pi";
import SearchIcon from "../assets/icons/search.svg?react";
import { Link } from "react-router-dom";
import { breadCrumbItems } from "../static";

const Navbar = () => {
  const breadCrumbItemRender = (
    currentRoute: any,
    _params: any,
    items: any,
    paths: any
  ) => {
    const isLast = currentRoute?.path === items[items.length - 1]?.path;

    return isLast ? (
      <span>{currentRoute.title}</span>
    ) : (
      <Link to={`/${paths.join("/")}`}>{currentRoute.title}</Link>
    );
  };
  return (
    <>
      <div className="bg-primary">
        <div className="container mx-auto px-5 h-[88px] justify-between flex gap-x-2 items-center ">
          <Logo />
          <Input
            className="h-12 max-w-[600px]"
            classNames={{
              input: "placeholder:text-[#77878F]",
            }}
            placeholder="Search..."
            suffix={<SearchIcon />}
          />
          <div className="flex items-center gap-x-6 text-white">
            <CartIcon />
            <GoHeart size={32} cursor={"pointer"} />
            <PiUser size={32} cursor={"pointer"} />
          </div>
        </div>
      </div>
      <div className="bg-white h-20 container mx-auto px-5 flex items-center justify-between">
        asdfg
      </div>
      <div className="bg-[#F2F4F5] h-[72px] flex items-center">
        <Breadcrumb
          itemRender={breadCrumbItemRender}
          items={breadCrumbItems}
          className="container px-5 mx-auto"
        />
      </div>
    </>
  );
};

export default Navbar;
