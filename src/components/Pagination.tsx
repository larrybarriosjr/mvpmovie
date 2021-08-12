import { MAX_ITEMS, PAGE_SIZE } from "constants/default"
import RCPagination from "rc-pagination"
import EnUsLocale from "rc-pagination/lib/locale/en_US"
import { RiArrowLeftSFill, RiArrowRightSFill, RiMoreFill } from "react-icons/ri"

type PaginationProps = {
  currentPage: number
  totalItems: number
  onPageChange: (page: number, pageSize: number) => void
}

const Pagination = ({ currentPage, totalItems, onPageChange }: PaginationProps) => {
  return (
    <RCPagination
      className="flex items-center justify-center my-4 text-lg gap-x-4"
      current={currentPage}
      pageSize={PAGE_SIZE}
      total={Math.min(MAX_ITEMS, totalItems)}
      prevIcon={<RiArrowLeftSFill className="cursor-pointer" size="24" />}
      nextIcon={<RiArrowRightSFill className="cursor-pointer" size="24" />}
      jumpNextIcon={<RiMoreFill />}
      jumpPrevIcon={<RiMoreFill />}
      locale={EnUsLocale}
      onChange={onPageChange}
      hideOnSinglePage
    />
  )
}

export default Pagination
