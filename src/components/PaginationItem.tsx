import { Tooltip } from "antd"
import { IoEllipsisHorizontal } from "react-icons/io5"
import { LiaArrowLeftSolid, LiaArrowRightSolid } from "react-icons/lia"

interface Props {
  page: number
  type: "page" | "prev" | "next" | "jump-prev" | "jump-next"
  pageSize: number
  currentPage: number
  total: number
}

const PaginationItem = ({
  page,
  type,
  pageSize,
  currentPage,
  total,
}: Props) => {
  if (type === "prev") {
    return (
      <div
        className={`group flex size-10 items-center justify-center rounded-full border-[1.5px] text-sm font-semibold text-black transition-all ${currentPage === 1 ? "border-[#E4E7E9]" : "!border-[#FF7F50] hover:bg-[#FF7F50]"}`}
      >
        <LiaArrowLeftSolid
          size={20}
          className={`transition-all ${currentPage === 1 ? "text-[#E4E7E9]" : "text-[#FF7F50] group-hover:text-white"}`}
        />
      </div>
    )
  } else if (type === "next") {
    return (
      <div
        className={`group flex size-10 items-center justify-center rounded-full !border-[1.5px] text-sm font-semibold text-black transition-all duration-200 ${currentPage === Math.ceil(total / pageSize) ? "border-[#E4E7E9]" : "border-[#FF7F50] hover:bg-[#FF7F50]"}`}
      >
        <LiaArrowRightSolid
          size={20}
          className={`transition-all duration-200 ${currentPage === Math.ceil(total / pageSize) ? "text-[#E4E7E9]" : "text-[#FF7F50] group-hover:text-white"}`}
        />
      </div>
    )
  } else if (type === "jump-next") {
    return (
      <Tooltip title="Next 5 pages">
        <div className="text-blackSub flex h-12 w-[30px] items-center justify-center text-sm font-semibold text-black">
          <IoEllipsisHorizontal />
        </div>
      </Tooltip>
    )
  } else if (type === "jump-prev") {
    return (
      <Tooltip title="Previous 5 pages">
        <div className="text-blackSub flex h-12 w-[30px] items-center justify-center text-sm font-semibold text-black">
          <IoEllipsisHorizontal />
        </div>
      </Tooltip>
    )
  } else {
    return (
      <div
        className={`flex size-10 items-center justify-center rounded-full border-[1.5px] text-sm text-black ${page === currentPage ? "cursor-default border-none bg-[#FF7F50] text-white" : "border-[#E4E7E9] hover:bg-black/10"} font-semibold transition-all`}
      >
        {page}
      </div>
    )
  }
}

export default PaginationItem
