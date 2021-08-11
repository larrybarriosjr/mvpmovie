import Section from "components/Section"
import { RoutePath } from "constants/enum"
import { Fragment } from "react"
import { MovieType } from "types/tmdb"

type ListPageProps = {
  title: string
  url: RoutePath
  items: MovieType[]
  favorites: MovieType[]
  toggleFavorites: (movie: MovieType) => void
}

const ListPage = ({ title, url, items, favorites, toggleFavorites }: ListPageProps) => {
  return (
    <Fragment>
      <Section
        title={title}
        url={url}
        items={items}
        favorites={favorites}
        toggleFavorites={toggleFavorites}
      />
    </Fragment>
  )
}

export default ListPage
