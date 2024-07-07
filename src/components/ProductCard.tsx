import { IoStar } from "react-icons/io5";
import Image from "./Image";
import { IoIosStarOutline } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import HeartIcon from "./HeartIcon";
import { LuEye } from "react-icons/lu";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../state/store";
import { setCart, setFavorites } from "../state/slices/appSlice";
import useMessage from "antd/es/message/useMessage";
import { Product } from "../types";
import { Skeleton } from "antd";

export interface ProductCardProps extends Product {}

const ProductCard = (props: ProductCardProps) => {
  const [message, contextHolder] = useMessage();
  const { imageSrc, stars, ratings, price, title, tags } = props;
  const [previewVisible, setPreviewVisible] = useState(false);
  const dispatch = useAppDispatch();
  const { cart, favorites, isDataLoading } = useAppSelector(
    (state) => state.app
  );

  const shortenedTitle = `${title.slice(0, 10)}...`;

  const addToCart = () => {
    const productExists = cart.find((item) => item.id === props.id);

    if (productExists) {
      // Increase quantity if product exists
      const updatedCartItems = cart.map((item) =>
        item.id === props.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      dispatch(setCart(updatedCartItems));
    } else {
      // Add new product with quantity 1 if it doesn't exist
      dispatch(setCart([...cart, { ...props, quantity: 1 }]));
    }
  };

  return (
    <div className="border relative border-[#E4E7E9] hover:border-[#C9CFD2] cursor-pointer hover:shadow-xl transition-all duration-300 rounded-[3px] p-4 flex flex-col gap-y-6 h-full">
      <Skeleton
        paragraph={{
          rows: 8,
        }}
        active
        loading={isDataLoading}
      >
        {contextHolder}
        <div className="absolute flex items-center gap-2 z-10">
          {tags?.map((tag, i) => (
            <div
              key={i}
              style={{ backgroundColor: tag.color }}
              className="h-[26px] text-xs font-semibold text-white top-0 left-0 px-2.5 py-[5px] rounded-sm uppercase"
            >
              {tag.title}
            </div>
          ))}
        </div>
        <Image
          preview={{
            visible: previewVisible,
            onVisibleChange(value) {
              if (!value) {
                setPreviewVisible(false);
              }
            },
            destroyOnClose: true,
            maskClassName: "!cursor-default",
            mask: (
              <div className="flex absolute items-center gap-x-2 px-2">
                <HeartIcon
                  isFavorite={favorites.some((f) => f.id === props.id)}
                  onFavoriteChange={(isFavorite) => {
                    if (isFavorite) {
                      dispatch(setFavorites([...favorites, props]));
                    } else {
                      dispatch(
                        setFavorites(favorites.filter((f) => f.id !== props.id))
                      );
                    }
                    message.success(
                      isFavorite
                        ? `${shortenedTitle} added to favorites`
                        : `${shortenedTitle} removed from favorites`
                    );
                  }}
                />
                <div
                  className="size-12 rounded-full bg-white flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    addToCart();
                    message.success(`${shortenedTitle} added to cart`);
                  }}
                >
                  <FiShoppingCart
                    size={24}
                    className="text-black relative -left-[3px]"
                  />
                </div>
                <div
                  className="size-12 rounded-full bg-[#FF7F50] flex items-center justify-center cursor-pointer"
                  onClick={() => setPreviewVisible(true)}
                >
                  <LuEye size={24} className="text-white" />
                </div>
              </div>
            ),
          }}
          src={imageSrc}
          alt={title}
          className="!h-[172px] !max-w-[100px]"
        />
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-x-1">
            <div className="flex items-center">
              {[...Array(stars)].map((_s, i) => (
                <IoStar key={i} size={16} className="text-[#FF7F50]" />
              ))}
              {[...Array(5 - stars)].map((_s, i) => (
                <IoIosStarOutline
                  key={i}
                  size={16}
                  className="text-[#ADB7BC]"
                />
              ))}
            </div>
            <p className="text-[#5d6468] text-xs">({ratings})</p>
          </div>
          <p className="text-sm h-10 overflow-hidden overflow-ellipsis">
            {title}
          </p>
          <p className="text-[#2DA5F3]">₦{price.toLocaleString()}</p>
        </div>
      </Skeleton>
    </div>
  );
};

export default ProductCard;
