import Loading from "components/Loading"
import Section from "components/Section"
import { RoutePath } from "constants/enum"
import { Fragment } from "react"
import { MovieType } from "types/movies"

type HomePageProps = {
  popular: MovieType[]
  trending: MovieType[]
  favorites: MovieType[]
  toggleFavorites: (movie: MovieType) => void
  loading?: boolean
}

const HomePage = ({ popular, trending, favorites, toggleFavorites, loading }: HomePageProps) => {
  if (loading) return <Loading />

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
        title="Trending Movies"
        url={RoutePath.TRENDING}
        items={trending}
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
