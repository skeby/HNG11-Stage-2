import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to={"/"}
      className="text-[32px] font-bold tracking-tight text-white underline hover:text-black transition-all duration-200"
    >
      MERAKI
    </Link>
  );
};

export default Logo;
