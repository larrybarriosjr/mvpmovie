import Section from "components/Section"
import { PAGE_SIZE } from "constants/default"
import { RoutePath } from "constants/enum"
import Pagination from "rc-pagination"
import EnUsLocale from "rc-pagination/lib/locale/en_US"
import { Fragment } from "react"
import { RiArrowLeftSFill, RiArrowRightSFill, RiMoreFill } from "react-icons/ri"
import { useLocation } from "react-router-dom"
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
  const location = useLocation()

  const favoritesItems = items.slice(currentPage * PAGE_SIZE - PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <Fragment>
      <Section
        title={title}
        url={url}
        items={location.pathname === RoutePath.FAVORITES ? favoritesItems : items}
        favorites={favorites}
        toggleFavorites={toggleFavorites}
      />
      <Pagination
        className="flex items-center justify-center my-4 text-lg gap-x-4"
        current={currentPage}
        pageSize={PAGE_SIZE}
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
