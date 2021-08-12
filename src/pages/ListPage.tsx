import Pagination from "components/Pagination"
import Section from "components/Section"
import { PAGE_SIZE } from "constants/default"
import { RoutePath } from "constants/enum"
import { Fragment } from "react"
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
  onPageChange: (page: number) => void
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
      <Pagination currentPage={currentPage} totalItems={totalItems} onPageChange={onPageChange} />
    </Fragment>
  )
}

export default ListPage
