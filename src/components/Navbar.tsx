import { useEffect, useState } from "react"
import { Breadcrumb, Input, Tooltip } from "antd"
import { GoHeart, GoHeartFill } from "react-icons/go"
import { PiUser } from "react-icons/pi"
import { NavLink, useLocation } from "react-router-dom"
import CartIcon from "../components/CartIcon"
import Logo from "./Logo"
import useDebounce from "../hooks/useDebounce"
import { useAppDispatch } from "../state/store"
import { setSearchQuery } from "../state/slices/appSlice"
import SearchIcon from "../assets/icons/search.svg?react"
import BreadcrumbSeparator from "../assets/icons/breadcrumb-separator.svg?react"
import { breadCrumbItems } from "../static"

const Navbar = () => {
  const [search, setSearch] = useState("")
  const dispatch = useAppDispatch()
  const location = useLocation()
  const debouncedSearch = useDebounce(search.toLowerCase(), 500, true)
  const breadCrumbItemRender = (route: any) => {
    const isActive = route.path === location.pathname
    return isActive ? (
      <span className="!font-medium text-[#2DA5F3]">{route.title}</span>
    ) : (
      <NavLink className={"!text-[#5F6C72]"} to={`${route.path}`}>
        {route.title}
      </NavLink>
    )
  }

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch))
  }, [debouncedSearch])
  return (
    <>
      <div className="sticky top-0 z-50 bg-primary">
        <div className="container mx-auto flex h-[88px] items-center justify-between gap-x-5 px-5">
          <Logo />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="hidden h-12 max-w-[600px] sm:flex"
            classNames={{
              input: "placeholder:text-[#77878F]",
            }}
            placeholder="Search..."
            suffix={<SearchIcon />}
          />
          <div className="flex items-center gap-x-6 text-white">
            <CartIcon />
            <NavLink to={"/favorites"}>
              {({ isActive }) => (
                <Tooltip title="Favorites">
                  <div
                    className={`relative size-8 duration-100 ${isActive ? "rounded-full bg-white p-5" : "rounded-none"} `}
                  >
                    <GoHeartFill
                      size={28}
                      className={`absolute left-[6px] top-[7px] z-10 duration-500 ${isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"} text-[#e41b23] transition-all`}
                      cursor={"pointer"}
                    />
                    <GoHeart
                      className={`absolute left-0 top-0 z-10 h-full w-full text-white duration-500 ${isActive ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
                      cursor={"pointer"}
                      size={32}
                    />
                  </div>
                </Tooltip>
              )}
            </NavLink>
            <Tooltip title="Profile">
              <>
                <PiUser
                  size={32}
                  cursor={"pointer"}
                  className="transition-all hover:scale-90"
                />
              </>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex h-20 items-center justify-between bg-white px-5 sm:hidden">
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
      <div className="flex h-[72px] items-center bg-[#F2F4F5]">
        <Breadcrumb
          separator={<BreadcrumbSeparator />}
          itemRender={breadCrumbItemRender}
          items={breadCrumbItems}
          className="container mx-auto px-5"
        />
      </div>
    </>
  )
}

export default Navbar
