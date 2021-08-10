import Section from "components/layout/Section"
import { LocalStorageKey, RoutePath } from "constants/enum"
import { useGetPopular, useGetTopRated } from "hooks/api"
import { useLocalStorage } from "hooks/web"
import { Fragment } from "react"
import { MovieType } from "types/tmdb"

const HomePage = () => {
  const { data: popular } = useGetPopular()
  const { data: topRated } = useGetTopRated()

  const [favorites, setFavorites] = useLocalStorage<MovieType[]>(LocalStorageKey.FAVORITES, [])

  const handleToggleFavorites = (movie: MovieType) => {
    favorites.find(fave => fave.id === movie.id)
      ? setFavorites(favorites.filter(fave => fave.id !== movie.id))
      : setFavorites(faves => [...faves, movie])
  }

  if (!popular) return null
  if (!topRated) return null

  return (
    <Fragment>
      <Section
        title="Popular Movies"
        url={RoutePath.POPULAR}
        items={popular.data.results}
        quantity={4}
        favorites={favorites}
        toggleFavorites={handleToggleFavorites}
      />
      <Section
        title="Top Rated Movies"
        url={RoutePath.TOP_RATED}
        items={topRated.data.results}
        quantity={8}
        favorites={favorites}
        toggleFavorites={handleToggleFavorites}
      />
      <Section
        title="Your Favorite Movies"
        url={RoutePath.FAVORITES}
        items={favorites}
        quantity={4}
        favorites={favorites}
        toggleFavorites={handleToggleFavorites}
      />
    </Fragment>
  )
}

export default HomePage
