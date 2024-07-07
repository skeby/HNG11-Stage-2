import Logo from "./Logo";
import { Breadcrumb, Input, Tooltip } from "antd";
import CartIcon from "../components/CartIcon";
import { GoHeart } from "react-icons/go";
import { PiUser } from "react-icons/pi";
import SearchIcon from "../assets/icons/search.svg?react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../state/store";
import { setDisplayedProducts } from "../state/slices/appSlice";
import BreadcrumbSeparator from "../assets/icons/breadcrumb-separator.svg?react";
import { breadCrumbItems } from "../static";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const location = useLocation();
  const debouncedSearch = useDebounce(search.toLowerCase(), 500, true);
  const { products, favorites } = useAppSelector((state) => state.app);
  const breadCrumbItemRender = (route: any) => {
    const isActive = route.path === location.pathname;
    return isActive ? (
      <span className="text-[#2DA5F3] !font-medium">{route.title}</span>
    ) : (
      <NavLink className={"!text-[#5F6C72]"} to={`${route.path}`}>
        {route.title}
      </NavLink>
    );
  };

  useEffect(() => {
    const pathname = location.pathname;
    const page = pathname.split("/")[pathname.split("/").length - 1];
    const currentProducts = page === "favorites" ? favorites : products;
    const filteredData = currentProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(debouncedSearch) ||
        p.tags?.some((t) => t.title.toLowerCase().includes(debouncedSearch))
    );
    dispatch(
      setDisplayedProducts(
        debouncedSearch !== "" ? filteredData : currentProducts
      )
    );
  }, [debouncedSearch, location.pathname, favorites]);
  return (
    <>
      <div className="bg-primary sticky top-0 z-50">
        <div className="container mx-auto px-5 h-[88px] justify-between flex gap-x-5 items-center ">
          <Logo />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 max-w-[600px] hidden sm:flex"
            classNames={{
              input: "placeholder:text-[#77878F]",
            }}
            placeholder="Search..."
            suffix={<SearchIcon />}
          />
          <div className="flex items-center gap-x-6 text-white">
            <CartIcon />
            <Link to={"/favorites"}>
              <Tooltip title="Favorites">
                <>
                  <GoHeart
                    size={32}
                    cursor={"pointer"}
                    className="hover:scale-90 transition-all"
                  />
                </>
              </Tooltip>
            </Link>
            <Tooltip title="Profile">
              <>
                <PiUser
                  size={32}
                  cursor={"pointer"}
                  className="hover:scale-90 transition-all"
                />
              </>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="bg-white flex sm:hidden h-20 container mx-auto px-5 items-center justify-between">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-12 max-w-[600px]"
          classNames={{
            input: "placeholder:text-[#77878F]",
          }}
          placeholder="Search..."
          suffix={<SearchIcon />}
        />
      </div>
      <div className="bg-[#F2F4F5] h-[72px] flex items-center">
        <Breadcrumb
          separator={<BreadcrumbSeparator />}
          itemRender={breadCrumbItemRender}
          items={breadCrumbItems}
          className="container px-5 mx-auto"
        />
      </div>
    </>
  );
};

export default Navbar;
