import { GoHeart, GoHeartFill } from "react-icons/go";

interface Props {
  isFavorite: boolean;
  onFavoriteChange?: (isFavorite: boolean) => void;
}

const HeartIcon = ({ isFavorite, onFavoriteChange }: Props) => {
  return (
    <div
      className="size-12 rounded-full bg-white flex items-center justify-center cursor-pointer"
      onClick={() => onFavoriteChange && onFavoriteChange(!isFavorite)}
    >
      <div className="relative size-6">
        <GoHeartFill
          className={`no-navigate absolute left-0 top-0 z-10 h-full w-full duration-200 ${isFavorite ? "scale-100 opacity-100" : "scale-0 opacity-0"} transition-all text-[#e41b23]`}
          cursor={"pointer"}
          size={24}
        />
        <GoHeart
          className={`no-navigate absolute left-0 text-black top-0 z-10 h-full w-full duration-200 ${isFavorite ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
          cursor={"pointer"}
          size={24}
        />
      </div>
    </div>
  );
};

export default HeartIcon;
