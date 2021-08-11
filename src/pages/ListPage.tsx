import Section from "components/Section"
import { RoutePath } from "constants/enum"
import Pagination from "rc-pagination"
import EnUsLocale from "rc-pagination/lib/locale/en_US"
import { Fragment } from "react"
import { RiArrowLeftSFill, RiArrowRightSFill, RiMoreFill } from "react-icons/ri"
import { MovieType } from "types/movies"

type ListPageProps = {
  title: string
  url: RoutePath
  items: MovieType[]
  favorites: MovieType[]
  toggleFavorites: (movie: MovieType) => void
  currentPage: number
  totalItems: number
  onPageChange: (page: number, pageSize: number) => void
}

const ListPage = ({
  title,
  url,
  items,
  favorites,
  toggleFavorites,
  currentPage,
  totalItems,
  onPageChange
}: ListPageProps) => {
  return (
    <Fragment>
      <Section
        title={title}
        url={url}
        items={items}
        favorites={favorites}
        toggleFavorites={toggleFavorites}
      />
      <Pagination
        className="flex items-center justify-center my-4 text-lg gap-x-4"
        current={currentPage}
        pageSize={20}
        total={Math.min(2_000, totalItems)}
        prevIcon={<RiArrowLeftSFill className="cursor-pointer" size="24" />}
        nextIcon={<RiArrowRightSFill className="cursor-pointer" size="24" />}
        jumpNextIcon={<RiMoreFill />}
        jumpPrevIcon={<RiMoreFill />}
        locale={EnUsLocale}
        onChange={onPageChange}
        hideOnSinglePage
      />
    </Fragment>
  )
}

export default ListPage
