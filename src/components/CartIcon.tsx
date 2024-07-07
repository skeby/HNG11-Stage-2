import { FiShoppingCart } from "react-icons/fi";
import { useAppSelector } from "../state/store";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";

const CartIcon = () => {
  const { cart } = useAppSelector((state) => state.app);
  return (
    <Link
      to={"/cart"}
      className="relative size-8 hover:scale-90 transition-all"
    >
      <Tooltip title="Cart">
        <FiShoppingCart size={32} className="text-white" />
        <div className="absolute -right-2 -top-[5px] size-[20px] rounded-full border-[1.5px] border-[#1B6392] bg-white text-center text-[#1B6392] text-xs font-semibold leading-normal">
          {cart.length}
        </div>
      </Tooltip>
    </Link>
  );
};

export default CartIcon;
