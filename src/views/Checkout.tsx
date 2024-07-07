import { Button, Checkbox, Form, Radio } from "antd"
import { useAppDispatch, useAppSelector } from "../state/store"
import { GoArrowRight } from "react-icons/go"
import { Link } from "react-router-dom"
import Input from "../components/Input"
import Select from "../components/Select"
import TextArea from "antd/es/input/TextArea"
import { setCart } from "../state/slices/appSlice"
import { paymentOptions } from "../static"
import { useState } from "react"
import { Product } from "../types"
import CheckCircleIcon from "../assets/icons/check-circle.svg?react"

const Checkout = () => {
  const { cart } = useAppSelector((state) => state.app)
  const [showOrder, setShowOrder] = useState(false)
  const [placedOrder, setPlacedOrder] = useState<Product[]>([])
  const dispatch = useAppDispatch()
  const subTotal = (
    cart.length === 0 && placedOrder.length !== 0 ? placedOrder : cart
  ).reduce((acc, item) => acc + item.price * (item?.quantity ?? 1), 0)
  const shippingFee = subTotal * 0.18
  const cartTotals = [
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
  const grandTotal = cartTotals.reduce((acc, item) => acc + item.value, 0)

  const OrderSummary = ({ orders }: { orders: Product[] }) => (
    <>
      <div className="p-6 text-lg font-medium">Order Summary</div>
      <div className="mb-6 flex flex-col gap-y-4 px-6">
        {orders.map((item) => (
          <div key={item.id} className="flex h-16 items-center gap-x-4">
            <img
              src={item.imageSrc}
              className="size-16 rounded-sm object-cover"
            />
            <div>
              <p className="mb-[6px] text-sm text-[#191C1F]">
                {item.title.slice(0, 30)}...
              </p>
              <p className="text-sm">
                <span className="text-[#5F6C72]">{item.quantity} x </span>
                <span className="text-[#2DA5F3]">
                  ₦{item.price.toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-y-3 px-6">
        {cartTotals.map((total, i) => (
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
    </>
  )

  const OrderPreviewSection = (
    <div className="flex flex-col gap-6 lg:flex-row">
      <Form className="lg:w-[60%]" layout="vertical" id="checkout-form">
        <p className="mb-6 text-lg font-medium">Billing Information</p>
        <div className="flex flex-col gap-y-10">
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex w-full flex-col items-end gap-4 sm:flex-row">
                <Form.Item label="User name" className="w-full">
                  <Input placeholder="First name" />
                </Form.Item>
                <Form.Item className="w-full">
                  <Input placeholder="Last name" />
                </Form.Item>
              </div>

              <Form.Item
                className="w-full"
                label={
                  <p>
                    <span>Company Name </span>
                    <span className="text-[#929FA5]">(Optional)</span>
                  </p>
                }
              >
                <Input />
              </Form.Item>
            </div>
            <Form.Item label="Address">
              <Input />
            </Form.Item>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Form.Item label="Country" className="w-full">
                <Select placeholder="Select..." />
              </Form.Item>
              <Form.Item label="Region/State" className="w-full">
                <Select placeholder="Select..." />
              </Form.Item>
              <Form.Item label="City" className="w-full">
                <Select placeholder="Select..." />
              </Form.Item>
              <Form.Item label="Zip Code" className="w-full">
                <Select placeholder="Select..." />
              </Form.Item>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Form.Item label="Email" className="w-full">
                <Input />
              </Form.Item>
              <Form.Item label="Phone number" className="w-full">
                <Input />
              </Form.Item>
            </div>
            <Form.Item
              label="Ship into different address"
              layout="horizontal"
              labelAlign="left"
            >
              <Checkbox />
            </Form.Item>
          </div>
          <div className="flex flex-col gap-y-5 rounded border border-[#E4E7E9]">
            <p className="px-8 pt-5 text-lg font-medium">Payment Option</p>
            <div className="border-y border-[#E4E7E9] p-6">
              <Radio.Group className="flex w-full flex-col sm:flex-row">
                {paymentOptions.map((option, i) => (
                  <Form.Item
                    key={i}
                    label={
                      <div className="flex w-full flex-col items-center justify-center gap-y-2 text-center">
                        {option.icon}
                        <p className="text-sm font-medium">{option.title}</p>
                      </div>
                    }
                    rootClassName={`w-full flex items-center justify-center sm:px-2 ${i !== 0 ? "sm:border-l border-t sm:border-t-0 pt-3 sm:pt-0  border-[#E4E7E9]" : "border-none"}`}
                  >
                    <Radio
                      value={option.title}
                      className="flex w-auto items-center justify-center"
                    />
                  </Form.Item>
                ))}
              </Radio.Group>
            </div>
            <div className="flex flex-col gap-y-4 p-8 pt-3">
              <Form.Item label="Name on Card">
                <Input />
              </Form.Item>
              <Form.Item label="Card Number">
                <Input type="number" />
              </Form.Item>
              <div className="flex flex-col gap-4 min-[500px]:flex-row">
                <Form.Item label="Expiry Date" className="w-full">
                  <Input placeholder="DD/YY" />
                </Form.Item>
                <Form.Item label="CVC" className="w-full">
                  <Input type="number" />
                </Form.Item>
              </div>
            </div>
          </div>
          <div>
            <p className="mb-6">Additional Information</p>
            <Form.Item
              label={
                <p>
                  <span>Order Notes </span>
                  <span className="text-[#929FA5]">(Optional)</span>
                </p>
              }
            >
              <TextArea
                placeholder="Notes about your order"
                classNames={{
                  textarea:
                    "placeholder:text-[#77878F] py-3 px-4 rounded resize-none",
                }}
              />
            </Form.Item>
          </div>
        </div>
      </Form>
      <div className="h-fit overflow-hidden rounded-[4px] border border-[#E4E7E9] lg:w-[40%]">
        <OrderSummary orders={cart} />
        {subTotal > 0 && (
          <div className="px-6 pb-6">
            <Button
              onClick={() => {
                setPlacedOrder(cart)
                dispatch(setCart([]))
              }}
              form="checkout-form"
              iconPosition="end"
              icon={<GoArrowRight size={20} />}
              className="h-14 w-full bg-[#FF7F50] font-bold uppercase text-white hover:!border-[#FF7F50] hover:!text-[#FF7F50]"
            >
              Place order
            </Button>
          </div>
        )}
      </div>
    </div>
  )

  const OrderSuccessfulSection = (
    <div className="flex h-full flex-grow flex-col items-center justify-center text-center">
      <CheckCircleIcon className="mb-6" />
      <p className="mb-3 text-2xl font-semibold text-[#191C1F]">
        Your order is successfully placed
      </p>
      <p className="mb-8 max-w-[424px] text-sm text-[#5F6C72]">
        Thanks for your time!!!
      </p>
      <div className="flex w-full flex-col items-center gap-3 min-[500px]:w-auto min-[500px]:flex-row">
        <Link to="/" className="w-full min-[500px]:w-auto">
          <Button className="h-12 !w-full rounded border-2 border-[#FF7F50] px-6 text-sm font-bold uppercase text-[#FF7F50] hover:!bg-[#FF7F50] hover:!text-white">
            Go to Home
          </Button>
        </Link>
        <Button
          onClick={() => setShowOrder(true)}
          iconPosition="end"
          icon={<GoArrowRight size={20} />}
          className="h-12 w-full rounded bg-[#FF7F50] px-6 text-sm font-bold uppercase text-white hover:!border-2 hover:!text-[#FF7F50] min-[500px]:w-[160px]"
        >
          View Order
        </Button>
      </div>
    </div>
  )

  const ViewOrderSection = (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="overflow-hidden rounded-[4px] border border-[#E4E7E9]">
        <OrderSummary orders={placedOrder} />
        <Link to="/" className="mx-6 mb-6 flex">
          <Button className="font-bolds h-12 w-full rounded border-2 border-[#FF7F50] px-6 text-sm font-bold uppercase text-[#FF7F50] hover:!bg-[#FF7F50] hover:!text-white">
            Go to Home
          </Button>
        </Link>
      </div>
    </div>
  )

  return showOrder
    ? ViewOrderSection
    : placedOrder && placedOrder.length > 0
      ? OrderSuccessfulSection
      : OrderPreviewSection
}

export default Checkout
