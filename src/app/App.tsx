import Footer from "components/layout/Footer"
import Navbar from "components/layout/Navbar"
import { LocalStorageKey, RoutePath } from "constants/enum"
import { useGetPopular, useGetTopRated } from "hooks/api"
import { useLocalStorage } from "hooks/web"
import HomePage from "pages/HomePage"
import ListPage from "pages/ListPage"
import { Route, Switch } from "react-router-dom"
import { MovieType } from "types/tmdb"

function App() {
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
    <div className="flex flex-col w-full min-h-screen text-white bg-black">
      <Navbar />
      <main className="flex-grow w-full max-w-5xl px-2 mx-auto mt-28">
        <Switch>
          <Route exact path={RoutePath.HOME}>
            <HomePage
              popular={popular.data.results}
              topRated={topRated.data.results}
              favorites={favorites}
              toggleFavorites={handleToggleFavorites}
            />
          </Route>
          <Route exact path={RoutePath.POPULAR}>
            <ListPage
              title="Popular Movies"
              url={RoutePath.POPULAR}
              items={popular.data.results}
              favorites={favorites}
              toggleFavorites={handleToggleFavorites}
            />
          </Route>
          <Route exact path={RoutePath.TOP_RATED}>
            <ListPage
              title="Top Rated Movies"
              url={RoutePath.TOP_RATED}
              items={topRated.data.results}
              favorites={favorites}
              toggleFavorites={handleToggleFavorites}
            />
          </Route>
          <Route exact path={RoutePath.FAVORITES}>
            <ListPage
              title="Your Favorite Movies"
              url={RoutePath.FAVORITES}
              items={favorites}
              favorites={favorites}
              toggleFavorites={handleToggleFavorites}
            />
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  )
}

export default App
