import Footer from "components/Footer"
import Navbar from "components/Navbar"
import { LocalStorageKey, RoutePath } from "constants/enum"
import { useGetPopular, useGetTrending } from "hooks/api"
import { useLocalStorage } from "hooks/web"
import HomePage from "pages/HomePage"
import ListPage from "pages/ListPage"
import { Route, Switch } from "react-router-dom"
import { MovieType } from "types/movies"

function App() {
  const { data: popular } = useGetPopular()
  const { data: trending } = useGetTrending()

  const [favorites, setFavorites] = useLocalStorage<MovieType[]>(LocalStorageKey.FAVORITES, [])

  const handleToggleFavorites = (movie: MovieType) => {
    favorites.find(fave => fave.ids.trakt === movie.ids.trakt)
      ? setFavorites(favorites.filter(fave => fave.ids.trakt !== movie.ids.trakt))
      : setFavorites(faves => [...faves, movie])
  }

  if (!popular) return null
  if (!trending) return null

  return (
    <div className="flex flex-col w-full min-h-screen text-white bg-black">
      <Navbar />
      <main className="flex-grow w-full max-w-5xl px-2 mx-auto mt-28">
        <Switch>
          <Route exact path={RoutePath.HOME}>
            <HomePage
              popular={popular.data}
              trending={trending.data.map(item => item.movie)}
              favorites={favorites}
              toggleFavorites={handleToggleFavorites}
            />
          </Route>
          <Route exact path={RoutePath.POPULAR}>
            <ListPage
              title="Popular Movies"
              url={RoutePath.POPULAR}
              items={popular.data}
              favorites={favorites}
              toggleFavorites={handleToggleFavorites}
            />
          </Route>
          <Route exact path={RoutePath.TRENDING}>
            <ListPage
              title="Trending Movies"
              url={RoutePath.TRENDING}
              items={trending.data.map(item => item.movie)}
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
