import { Button, Form, FormProps, Radio } from "antd"
import { useAppDispatch, useAppSelector } from "../state/store"
import { GoArrowRight } from "react-icons/go"
import { Link } from "react-router-dom"
import Input from "../components/Input"
import Select from "../components/Select"
import TextArea from "antd/es/input/TextArea"
import { setCart } from "../state/slices/appSlice"
import { paths, paymentOptions, validation } from "../static"
import { useState } from "react"
import { CheckoutFormFields, Product } from "../types"
import CheckCircleIcon from "../assets/icons/check-circle.svg?react"
import { API_BASE_URL } from "../services/axiosClient"
import { animateScroll } from "react-scroll"
import { useAppMutation } from "../hooks/useAppMutation"
import { ORGANIZATION_ID } from "../config/env"
import { AnimatePresence, motion, MotionProps } from "framer-motion"

const Checkout = () => {
  const {
    mutate: createSale,
    isPending,
    isSuccess,
  } = useAppMutation({
    mutationKey: ["checkout"],
    path: paths.sales.add,
    showLoader: false,
    onSuccess: (data) => {
      if (data) {
        setPlacedOrder(cart)
        dispatch(setCart([]))
        animateScroll.scrollToTop()
      }
    },
  })
  const { cart } = useAppSelector((state) => state.app)
  const [showOrder, setShowOrder] = useState(false)
  const [placedOrder, setPlacedOrder] = useState<Product[]>([])
  const dispatch = useAppDispatch()
  const subTotal = (
    cart.length === 0 && placedOrder.length !== 0 ? placedOrder : cart
  ).reduce(
    (acc, item) =>
      acc + item.current_price?.[0]?.["NGN"]?.[0] * (item?.quantity ?? 1),
    0
  )
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

  const animationProps: MotionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.7, type: "tween" },
  }

  const formInitialValues: CheckoutFormFields = {
    first_name: "",
    last_name: "",
    company_name: "",
    address: "",
    country: "South Africa",
    state: "Jo'burg",
    city: "",
    zip_code: "",
    email: "",
    phone: "",
    name_on_card: "",
    card_number: "",
    expiry_date: "",
    cvc: "",
    order_notes: "",
    country_code: "+27",
    mode_of_payment: "",
    description: "",
  }

  const onCheckout: FormProps<CheckoutFormFields>["onFinish"] = (values) => {
    const { address, mode_of_payment, ...rest } = values
    const data = {
      organization_id: ORGANIZATION_ID,
      products_sold: cart.map((item) => ({
        product_id: item.id,
        amount: item.current_price[0]?.["NGN"]?.[0],
        quantity: item.quantity,
        currency_code: "NGN",
      })),
      currency_code: "NGN",
      sales_status: "pending",
      ...rest,
    }
    createSale(data)
  }

  const OrderSummary = ({ orders }: { orders: Product[] }) => (
    <>
      <div className="p-6 text-lg font-medium">Order Summary</div>
      <div className="mb-6 flex flex-col gap-y-4 px-6">
        {orders.map((item) => (
          <div key={item.id} className="flex h-16 items-center gap-x-4">
            <img
              src={`${API_BASE_URL}/images/${item.photos?.[0]?.url}`}
              className="size-16 rounded-sm object-cover"
            />
            <div>
              <p className="mb-[6px] text-sm text-[#191C1F]">
                {item.name.slice(0, 30)}...
              </p>
              <p className="text-sm">
                <span className="text-[#5F6C72]">{item.quantity} x </span>
                <span className="text-[#2DA5F3]">
                  ₦{item.current_price[0]?.["NGN"]?.[0].toLocaleString()}
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
    <Form
      scrollToFirstError
      layout="vertical"
      className="flex flex-col gap-6 lg:flex-row"
      onFinish={onCheckout}
      initialValues={formInitialValues}
      requiredMark={false}
    >
      <div className="lg:w-[60%]">
        <p className="mb-6 text-lg font-medium">Billing Information</p>
        <div className="flex flex-col gap-y-10">
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex w-full flex-col gap-4 sm:flex-row">
                <Form.Item<CheckoutFormFields>
                  name={"first_name"}
                  label="Name"
                  className="w-full"
                  rules={[{ required: true, message: validation.required }]}
                >
                  <Input placeholder="First name" />
                </Form.Item>
                <Form.Item
                  name={"last_name"}
                  className="w-full"
                  label="ㅤ"
                  rules={[{ required: true, message: validation.required }]}
                >
                  <Input placeholder="Last name" />
                </Form.Item>
              </div>

              <Form.Item
                name={"company_name"}
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
            <Form.Item
              name={"address"}
              rules={[{ required: true, message: validation.required }]}
              label="Address"
            >
              <Input />
            </Form.Item>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Form.Item
                name={"country"}
                rules={[{ required: true, message: validation.required }]}
                label="Country"
                className="w-full"
              >
                <Select
                  options={[
                    { label: "Nigeria", value: "Nigeria" },
                    { label: "South Africa", value: "South Africa" },
                    { label: "United Kingdom", value: "United Kingdom" },
                  ]}
                  placeholder="Select..."
                />
              </Form.Item>
              <Form.Item
                name={"state"}
                rules={[{ required: true, message: validation.required }]}
                label="Region/State"
                className="w-full"
              >
                <Select
                  options={[
                    { label: "Jo'burg", value: "Jo'burg" },
                    { label: "Kaduna", value: "Kaduna" },
                    { label: "Lagos", value: "Lagos" },
                    { label: "Kano", value: "Kano" },
                  ]}
                  placeholder="Select..."
                />
              </Form.Item>
              <Form.Item
                name={"city"}
                rules={[{ required: true, message: validation.required }]}
                label="City"
                className="w-full"
              >
                <Select
                  options={[
                    { label: "Lekki", value: "Lekki" },
                    { label: "Victoria Island", value: "Victoria Island" },
                    { label: "Agege", value: "Agege" },
                  ]}
                  placeholder="Select..."
                />
              </Form.Item>
              <Form.Item
                name={"zip_code"}
                rules={[{ required: true, message: validation.required }]}
                label="Zip Code"
                className="w-full"
              >
                <Input placeholder="Select..." />
              </Form.Item>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Form.Item
                name={"email"}
                label="Email"
                className="w-full"
                rules={[{ required: true, message: validation.email }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={"phone"}
                label="Phone number"
                className="w-full"
                rules={[{ required: true, message: validation.required }]}
              >
                <Input
                  prefix={
                    <Form.Item
                      name={"country_code"}
                      rules={[{ required: true, message: validation.required }]}
                      className="!w-20"
                    >
                      <Select
                        className="!h-[34px]"
                        options={[
                          { value: "+27", label: "+27" },
                          { value: "+1", label: "+1" },
                          { value: "+44", label: "+44" },
                          { value: "+234", label: "+234" },
                          { value: "+233", label: "+233" },
                        ]}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </Form.Item>
                  }
                  classNames={{
                    input:
                      "placeholder:text-[#77878F] !w-full h-[34px] rounded-sm border-[#E4E7E9]",
                    wrapper: "!h-11 !px-1",
                    affixWrapper: "!h-11 !px-1",
                    prefix: "!h-[34px]",
                  }}
                  styles={{
                    affixWrapper: {
                      borderRadius: "2px",
                      padding: "4px",
                    },
                  }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex flex-col gap-y-5 rounded border border-[#E4E7E9]">
            <p className="px-8 pt-5 text-lg font-medium">Payment Option</p>
            <div className="border-y border-[#E4E7E9] p-6">
              <Form.Item
                layout="vertical"
                name={"mode_of_payment"}
                className="text-center"
                rules={[{ required: true, message: validation.required }]}
                rootClassName={`w-full`}
              >
                <Radio.Group className="mb-3 flex !h-auto !w-full flex-col gap-2 sm:flex-row">
                  {paymentOptions.map((option, i) => (
                    <Radio
                      rootClassName={`m-0 after:hidden flex-col-reverse !flex !justify-center w-full !items-center gap-y-4 ${i !== 0 ? "sm:border-l border-t sm:border-t-0 pt-3 sm:pt-0  border-[#E4E7E9]" : "border-none"}`}
                      key={i}
                      value={option.title}
                    >
                      <div className="flex w-full flex-col items-center justify-center gap-y-2 text-center">
                        {option.icon}
                        <p className="text-sm font-medium text-black">
                          {option.title}
                        </p>
                      </div>
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            </div>
            <div className="flex flex-col gap-y-4 p-8 pt-3">
              <Form.Item
                name={"name_on_card"}
                rules={[{ required: true, message: validation.required }]}
                label="Name on Card"
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={"card_number"}
                rules={[{ required: true, message: validation.required }]}
                label="Card Number"
              >
                <Input type="number" />
              </Form.Item>
              <div className="flex flex-col gap-4 min-[500px]:flex-row">
                <Form.Item
                  name={"expiry_date"}
                  rules={[{ required: true, message: validation.required }]}
                  label="Expiry Date"
                  className="w-full"
                >
                  <Input type="number" placeholder="DD/YY" />
                </Form.Item>
                <Form.Item
                  name={"cvc"}
                  rules={[{ required: true, message: validation.required }]}
                  label="CVC"
                  className="w-full"
                >
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
      </div>
      <div className="h-fit overflow-hidden rounded-[4px] border border-[#E4E7E9] lg:w-[40%]">
        <OrderSummary orders={cart} />
        {subTotal > 0 && (
          <div className="px-6 pb-6">
            <Button
              loading={isPending}
              htmlType="submit"
              iconPosition="end"
              icon={<GoArrowRight size={20} />}
              className="h-14 w-full bg-[#FF7F50] font-bold uppercase text-white hover:!border-[#FF7F50] hover:!text-[#FF7F50]"
            >
              Place order
            </Button>
          </div>
        )}
      </div>
    </Form>
  )

  const OrderSuccessfulSection = (
    <motion.div
      {...animationProps}
      className="flex h-full flex-grow flex-col items-center justify-center text-center"
    >
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
          onClick={() => {
            setShowOrder(true)
            animateScroll.scrollToTop()
          }}
          iconPosition="end"
          icon={<GoArrowRight size={20} />}
          className="h-12 w-full rounded bg-[#FF7F50] px-6 text-sm font-bold uppercase text-white hover:!border-2 hover:!text-[#FF7F50] min-[500px]:w-[160px]"
        >
          View Order
        </Button>
      </div>
    </motion.div>
  )

  const ViewOrderSection = (
    <motion.div
      {...animationProps}
      className="flex h-full flex-col items-center justify-center"
    >
      <div className="overflow-hidden rounded-[4px] border border-[#E4E7E9]">
        <OrderSummary orders={placedOrder} />
        <Link to="/" className="mx-6 mb-6 flex">
          <Button className="font-bolds h-12 w-full rounded border-2 border-[#FF7F50] px-6 text-sm font-bold uppercase text-[#FF7F50] hover:!bg-[#FF7F50] hover:!text-white">
            Go to Home
          </Button>
        </Link>
      </div>
    </motion.div>
  )

  return (
    <AnimatePresence>
      {showOrder
        ? ViewOrderSection
        : placedOrder && placedOrder.length > 0 && isSuccess
          ? OrderSuccessfulSection
          : OrderPreviewSection}
    </AnimatePresence>
  )
}

export default Checkout
