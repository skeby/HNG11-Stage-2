import { Button, Checkbox, Form, message, Radio } from "antd";
import { useAppDispatch, useAppSelector } from "../state/store";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Select from "../components/Select";
import AmazonIcon from "../assets/icons/amazon.svg?react";
import CardIcon from "../assets/icons/card.svg?react";
import CashIcon from "../assets/icons/cash.svg?react";
import PaypalIcon from "../assets/icons/paypal.svg?react";
import VenmoIcon from "../assets/icons/venmo.svg?react";
import TextArea from "antd/es/input/TextArea";
import { setCart } from "../state/slices/appSlice";

const Checkout = () => {
  const { cart } = useAppSelector((state) => state.app);
  const navigate = useNavigate();
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

  const paymentOptions = [
    {
      icon: <CashIcon />,
      title: "Cash on Delivery",
    },
    {
      icon: <VenmoIcon />,
      title: "Venmo",
    },
    {
      icon: <PaypalIcon />,
      title: "Paypal",
    },
    {
      icon: <AmazonIcon />,
      title: "Amazon Pay",
    },
    {
      icon: <CardIcon />,
      title: "Debit/Credit Card",
    },
  ];
  return (
    <div className="flex lg:flex-row flex-col gap-6">
      <Form className="lg:w-[60%]" layout="vertical" id="checkout-form">
        <p className="mb-6 font-medium text-lg">Billing Information</p>
        <div className="flex flex-col gap-y-10">
          <div className="flex flex-col gap-y-4 text-sm">
            <div className="flex gap-x-4">
              <div className="w-full flex items-end gap-x-4">
                <Form.Item label="User name">
                  <Input placeholder="First name" />
                </Form.Item>
                <Form.Item>
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
            <div className="flex gap-x-4">
              <Form.Item label="Country" className="w-full">
                <Select placeholder="Select..." />
              </Form.Item>
              <Form.Item label="Country" className="w-full">
                <Select placeholder="Select..." />
              </Form.Item>
              <Form.Item label="Country" className="w-full">
                <Select placeholder="Select..." />
              </Form.Item>
              <Form.Item label="Country" className="w-full">
                <Select placeholder="Select..." />
              </Form.Item>
            </div>
            <div className="flex gap-x-4">
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
              className="w-auto"
            >
              <Checkbox />
            </Form.Item>
          </div>
          <div className="border-[#E4E7E9] border rounded flex flex-col gap-y-5">
            <p className="px-8 pt-5 text-lg font-medium">Payment Option</p>
            <div className="border-y border-[#E4E7E9] p-6 flex gap-x-[3px] justify-between">
              <Radio.Group className="flex w-full">
                {paymentOptions.map((option, i) => (
                  <Form.Item
                    key={i}
                    // labelAlign="right"
                    label={
                      <div className="w-full justify-center flex flex-col items-center gap-y-2">
                        {option.icon}
                        <p className="font-medium text-sm">{option.title}</p>
                      </div>
                    }
                    rootClassName={`w-full flex items-center justify-center ${i !== 0 ? "border-l border-[#E4E7E9]" : "border-none"}`}
                  >
                    <Radio
                      value={option.title}
                      className="flex items-center w-auto justify-center"
                    />
                  </Form.Item>
                ))}
              </Radio.Group>
            </div>
            <div className="pt-3 flex flex-col gap-y-4 p-8">
              <Form.Item label="Name on Card">
                <Input />
              </Form.Item>
              <Form.Item label="Card Number">
                <Input type="number" />
              </Form.Item>
              <div className="flex gap-x-4">
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
      <div className="lg:w-[40%] rounded-[4px] h-fit border-[#E4E7E9] border overflow-hidden">
        <div className="p-6 text-lg font-medium">Order Summary</div>
        <div className="flex flex-col gap-y-4 px-6 mb-6">
          {cart.map((item) => (
            <div key={item.id} className="h-16 flex items-center gap-x-4">
              <img
                src={item.imageSrc}
                className="size-16 rounded-sm object-cover"
              />
              <div>
                <p className="mb-[6px] text-[#191C1F] text-sm">
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
            <Button
              onClick={() => {
                message.success("Order placed successfully", 3).then(() => {
                  navigate("/");
                  dispatch(setCart([]));
                });
              }}
              form="checkout-form"
              iconPosition="end"
              icon={<GoArrowRight size={20} />}
              className="w-full h-14 uppercase font-bold text-white hover:!border-[#FF7F50] hover:!text-[#FF7F50] bg-[#FF7F50]"
            >
              Place order
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
