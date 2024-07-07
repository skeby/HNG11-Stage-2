import { Button, ConfigProvider, Table, TableProps, Tooltip } from "antd";
import { Product } from "../types";
import { useAppDispatch, useAppSelector } from "../state/store";
import { GoArrowLeft, GoArrowRight, GoXCircle } from "react-icons/go";
import { Link } from "react-router-dom";
import { setCart } from "../state/slices/appSlice";
import { FiMinus, FiPlus } from "react-icons/fi";

const Cart = () => {
  const { cart } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const subTotal = cart.reduce(
    (acc, item) => acc + item.price * (item?.quantity ?? 1),
    0
  );
  const shippingFee = subTotal * 0.18;
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
  ];
  const grandTotal = cardTotals.reduce((acc, item) => acc + item.value, 0);
  const tableColumns: TableProps<Product>["columns"] = [
    {
      title: "PRODUCTS",
      width: 25,
      render: (_value, record) => (
        <div className="flex items-center gap-x-3">
          <GoXCircle
            onClick={() =>
              dispatch(setCart(cart.filter((i) => i.id !== record.id)))
            }
            size={24}
            cursor={"pointer"}
            className="flex-shrink-0 text-[#EE5858]"
          />
          <img
            width={72}
            height={72}
            src={record.imageSrc}
            className="!size-[72px] !rounded-sm object-cover"
          />
          <Tooltip title={record.title}>
            <span className="text-sm">{record.title.slice(0, 15)}...</span>
          </Tooltip>
        </div>
      ),
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      width: 20,
      render: (value) => (
        <span className="text-sm">₦{value.toLocaleString()}</span>
      ),
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
      width: 20,
      render: (value, record) => (
        <div className="w-[148px] h-12 py-3 px-5 rounded-[3px] border border-[#E4E7E9] flex items-center justify-between">
          <div
            className={`p-1 ${value > 1 ? "hover:bg-[#E4E7E9] cursor-pointer" : ""} transition-all duration-300 rounded-sm`}
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
                );
              }
            }}
          >
            <FiMinus
              size={16}
              className={`flex-shrink-0 ${value > 1 ? "text-[#191C1F]" : "text-[#929FA5]"}`}
            />
          </div>
          <p className="text-base txt-[#475156]">{value}</p>
          <div
            className="p-1 hover:bg-[#E4E7E9] transition-all duration-300 rounded-sm cursor-pointer"
            onClick={() => {
              dispatch(
                setCart(
                  cart.map((i) =>
                    i.id === record.id ? { ...i, quantity: i.quantity + 1 } : i
                  )
                )
              );
            }}
          >
            <FiPlus size={16} className={`flex-shrink-0 text-[#191C1F]`} />
          </div>
        </div>
      ),
    },
    {
      title: "SUB-TOTAL",
      dataIndex: "price",
      key: "price",
      width: 10,
      render: (value) => (
        <span className="font-medium text-sm">₦{value.toLocaleString()}</span>
      ),
    },
  ];
  return (
    <div className="flex lg:flex-row flex-col gap-6">
      <div className="lg:w-[60%] rounded-[4px] border-[#E4E7E9] border overflow-hidden">
        <div className="px-6 py-5 text-[#191C1F] font-medium text-lg">
          Shopping Cart
        </div>
        <ConfigProvider
          empty={{}}
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
              Empty: {},
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
        <div className="p-6 border-[#E4E7E9] border-t">
          <Link to={"/"}>
            <Button
              icon={<GoArrowLeft size={20} />}
              className="rounded-sm border-[#2DA5F3] !text-[#2DA5F3] font-bold text-sm h-12 w-[200px]"
            >
              RETURN TO SHOP
            </Button>
          </Link>
        </div>
      </div>
      <div className="lg:w-[40%] rounded-[4px] h-fit border-[#E4E7E9] border overflow-hidden">
        <div className="p-6 text-lg font-medium">Cart Totals</div>
        <div className="px-6 flex flex-col gap-y-3">
          {cardTotals.map((total, i) => (
            <div key={i} className="flex items-center justify-between">
              <p className="text-[#5F6C72] text-sm">{total.title}</p>
              <p className="text-[#191C1F] font-medium">
                ₦{total.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <div className="border-b border-[#E4E7E9] my-4 mx-6"></div>
        <div className="flex items-center justify-between mx-6 mb-6">
          <p>Total</p>
          <p className="font-semibold">₦{grandTotal.toLocaleString()} NGN</p>
        </div>
        {subTotal > 0 && (
          <div className="px-6 pb-6">
            <Link to={"/checkout"}>
              <Button
                iconPosition="end"
                icon={<GoArrowRight size={20} />}
                className="w-full h-14 uppercase font-bold text-white hover:!border-[#FF7F50] hover:!text-[#FF7F50] bg-[#FF7F50]"
              >
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
