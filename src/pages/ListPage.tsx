import Section from "components/Section"
import { PAGE_SIZE } from "constants/default"
import { RoutePath } from "constants/enum"
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
  const fullItems = items.slice(currentPage * PAGE_SIZE - PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <Section
      title={title}
      url={url}
      items={location.pathname === RoutePath.FAVORITES ? fullItems : items}
      favorites={favorites}
      toggleFavorites={toggleFavorites}
      currentPage={currentPage}
      totalItems={totalItems}
      onPageChange={onPageChange}
    />
  )
}

export default ListPage
