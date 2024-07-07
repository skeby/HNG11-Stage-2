import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <Link
      to={"/"}
      className="text-[32px] font-bold tracking-tight text-white underline transition-all duration-200 hover:text-black"
    >
      MERAKI
    </Link>
  )
}

export default Logo
