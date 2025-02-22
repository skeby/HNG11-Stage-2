import {
  Button,
  ConfigProvider,
  message,
  Table,
  TableProps,
  Tooltip,
} from "antd"
import { Product } from "../types"
import { useAppDispatch, useAppSelector } from "../state/store"
import { GoArrowLeft, GoArrowRight, GoXCircle } from "react-icons/go"
import { Link } from "react-router-dom"
import { setCart } from "../state/slices/appSlice"
import { FiMinus, FiPlus } from "react-icons/fi"
import { API_BASE_URL } from "../services/axiosClient"

const Cart = () => {
  const { cart } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()
  const subTotal = cart.reduce(
    (acc, item) =>
      acc + item.current_price?.[0]?.["NGN"]?.[0] * (item?.quantity ?? 1),
    0
  )
  const shippingFee = subTotal * 0.18
  const cardTotals = [
    {
      title: "Sub-total",
      value: subTotal,
    },
    {
      title: "Shipping",
      value: shippingFee,
    },
    {
      title: "Discount",
      value: 0,
    },
    {
      title: "Tax",
      value: 0,
    },
  ]
  const grandTotal = cardTotals.reduce((acc, item) => acc + item.value, 0)
  const tableColumns: TableProps<Product>["columns"] = [
    {
      title: "PRODUCTS",
      width: 25,
      render: (_value, record) => (
        <div className="flex items-center gap-x-3">
          <Tooltip title="Remove product from cart">
            <>
              <GoXCircle
                onClick={() =>
                  dispatch(setCart(cart.filter((i) => i.id !== record.id)))
                }
                size={24}
                cursor={"pointer"}
                className="flex-shrink-0 rounded-full text-[#EE5858] duration-300 hover:bg-[#EE5858] hover:text-white"
              />
            </>
          </Tooltip>
          <img
            width={72}
            height={72}
            src={`${API_BASE_URL}/images/${record.photos?.[0]?.url}`}
            className="!size-[72px] !rounded-sm object-cover"
          />
          <Tooltip title={record.name}>
            <span className="text-sm">{record.name.slice(0, 15)}...</span>
          </Tooltip>
        </div>
      ),
    },
    {
      title: "PRICE",
      dataIndex: "current_price",
      key: "current_price",
      width: 20,
      render: (value) => (
        <span className="text-sm">
          ₦{value[0]?.["NGN"]?.[0].toLocaleString()}
        </span>
      ),
    },
    {
      title: "QUANTITY LEFT IN STOCK",
      dataIndex: "available_quantity",
      key: "available_quantity",
      width: 20,
      render(value, record) {
        const availableQuantity = value - record.quantity
        return <span className="text-sm">{availableQuantity}</span>
      },
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
      width: 20,
      render: (value, record) => (
        <div className="flex h-12 w-[148px] items-center justify-between rounded-[3px] border border-[#E4E7E9] px-5 py-3">
          <div
            className={`p-1 ${value > 1 ? "cursor-pointer hover:bg-[#E4E7E9]" : ""} rounded-sm transition-all duration-300`}
            onClick={() => {
              if (value > 1) {
                dispatch(
                  setCart(
                    cart.map((i) =>
                      i.id === record.id
                        ? { ...i, quantity: i.quantity - 1 }
                        : i
                    )
                  )
                )
              }
            }}
          >
            <FiMinus
              size={16}
              className={`flex-shrink-0 ${value > 1 ? "text-[#191C1F]" : "text-[#929FA5]"}`}
            />
          </div>
          <p className="text-base text-[#475156]">{value}</p>
          <div
            className="cursor-pointer rounded-sm p-1 transition-all duration-300 hover:bg-[#E4E7E9]"
            onClick={() => {
              if (record.available_quantity > record.quantity) {
                dispatch(
                  setCart(
                    cart.map((i) =>
                      i.id === record.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                    )
                  )
                )
              } else {
                message.error("You can't add more than the available quantity")
              }
            }}
          >
            <FiPlus size={16} className={`flex-shrink-0 text-[#191C1F]`} />
          </div>
        </div>
      ),
    },
    {
      title: "SUB-TOTAL",
      dataIndex: "current_price",
      key: "current_price",
      width: 10,
      render: (value, record) => (
        <span className="text-sm font-medium">
          ₦{(value[0]?.["NGN"]?.[0] * record.quantity).toLocaleString()}
        </span>
      ),
    },
  ]
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="overflow-hidden rounded-[4px] border border-[#E4E7E9] lg:w-[60%]">
        <div className="px-6 py-5 text-lg font-medium text-[#191C1F]">
          Shopping Cart
        </div>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "Public sans, sans-serif",
            },
            components: {
              Table: {
                headerBg: "#F2F4F5",
                headerBorderRadius: 0,
                headerColor: "#475156",
                fontSize: 12,
                borderColor: "transparent",
              },
            },
          }}
        >
          <Table
            columns={tableColumns}
            rowKey={"id"}
            dataSource={cart}
            pagination={false}
            virtual
            scroll={{ x: 1500, y: 500 }}
            className="overflow-auto"
          />
        </ConfigProvider>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#E4E7E9] p-6 sm:flex-row">
          <Link to={"/"} className="w-full sm:w-[200px]">
            <Button
              icon={<GoArrowLeft size={20} />}
              className="h-12 w-full rounded-sm border-[#2DA5F3] text-sm font-bold !text-[#2DA5F3] hover:!border-none hover:!bg-[#2DA5F3] hover:!text-white sm:w-[200px]"
            >
              RETURN TO SHOP
            </Button>
          </Link>
          {cart.length > 0 && (
            <Button
              onClick={() => dispatch(setCart([]))}
              icon={
                <GoXCircle
                  size={24}
                  cursor={"pointer"}
                  className="flex-shrink-0"
                />
              }
              className="h-12 w-full rounded-sm border-[#EE5858] text-sm font-bold !text-[#EE5858] hover:!bg-[#EE5858] hover:!text-white sm:w-[200px]"
            >
              CLEAR CART
            </Button>
          )}
        </div>
      </div>
      <div className="h-fit overflow-hidden rounded-[4px] border border-[#E4E7E9] lg:w-[40%]">
        <div className="p-6 text-lg font-medium">Cart Totals</div>
        <div className="flex flex-col gap-y-3 px-6">
          {cardTotals.map((total, i) => (
            <div key={i} className="flex items-center justify-between">
              <p className="text-sm text-[#5F6C72]">{total.title}</p>
              <p className="font-medium text-[#191C1F]">
                ₦{total.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <div className="mx-6 my-4 border-b border-[#E4E7E9]"></div>
        <div className="mx-6 mb-6 flex items-center justify-between">
          <p>Total</p>
          <p className="font-semibold">₦{grandTotal.toLocaleString()} NGN</p>
        </div>
        {subTotal > 0 && (
          <div className="px-6 pb-6">
            <Link to={"/checkout"}>
              <Button
                iconPosition="end"
                icon={<GoArrowRight size={20} />}
                className="h-14 w-full bg-[#FF7F50] font-bold uppercase text-white hover:!border-[#FF7F50] hover:!text-[#FF7F50]"
              >
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
