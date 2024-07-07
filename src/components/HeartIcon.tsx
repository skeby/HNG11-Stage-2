import { GoHeart, GoHeartFill } from "react-icons/go"

interface Props {
  isFavorite: boolean
  onFavoriteChange?: (isFavorite: boolean) => void
}

const HeartIcon = ({ isFavorite, onFavoriteChange }: Props) => {
  return (
    <div
      className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-white duration-200 hover:scale-90"
      onClick={() => onFavoriteChange && onFavoriteChange(!isFavorite)}
    >
      <div className="relative size-6">
        <GoHeartFill
          className={`absolute left-0 top-0 z-10 h-full w-full duration-200 ${isFavorite ? "scale-100 opacity-100" : "scale-0 opacity-0"} text-[#e41b23] transition-all`}
          cursor={"pointer"}
          size={24}
        />
        <GoHeart
          className={`absolute left-0 top-0 z-10 h-full w-full text-black duration-200 ${isFavorite ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
          cursor={"pointer"}
          size={24}
        />
      </div>
    </div>
  )
}

export default HeartIcon
