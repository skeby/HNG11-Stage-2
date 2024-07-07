import { Tooltip } from "antd"
import { Link } from "react-router-dom"
import { useAppSelector } from "../state/store"
import Cart from "../assets/icons/cart.svg?react"

const CartIcon = () => {
  const { cart } = useAppSelector((state) => state.app)
  return (
    <Link
      to={"/cart"}
      className="relative size-8 transition-all hover:scale-90"
    >
      <Tooltip title="Cart">
        <Cart className="size-8 text-white" />
        <div className="absolute -right-1 -top-1 size-[20px] rounded-full border-[1.5px] border-[#1B6392] bg-white text-center text-xs font-semibold leading-normal text-[#1B6392]">
          {cart.length}
        </div>
      </Tooltip>
    </Link>
  )
}

export default CartIcon
