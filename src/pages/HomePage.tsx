import Section from "components/layout/Section"
import { RoutePath } from "constants/enum"
import { Fragment } from "react"
import { MovieType } from "types/tmdb"

type HomePageProps = {
  popular: MovieType[]
  topRated: MovieType[]
  favorites: MovieType[]
  toggleFavorites: (movie: MovieType) => void
}

const HomePage = ({ popular, topRated, favorites, toggleFavorites }: HomePageProps) => {
  return (
    <Fragment>
      <Section
        title="Popular Movies"
        url={RoutePath.POPULAR}
        items={popular}
        quantity={4}
        favorites={favorites}
        toggleFavorites={toggleFavorites}
      />
      <Section
        title="Top Rated Movies"
        url={RoutePath.TOP_RATED}
        items={topRated}
        quantity={8}
        favorites={favorites}
        toggleFavorites={toggleFavorites}
      />
      <Section
        title="Your Favorite Movies"
        url={RoutePath.FAVORITES}
        items={favorites}
        quantity={4}
        favorites={favorites}
        toggleFavorites={toggleFavorites}
      />
    </Fragment>
  )
}

export default HomePage
