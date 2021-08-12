import Footer from "components/Footer"
import Loading from "components/Loading"
import Navbar from "components/Navbar"
import { PAGE_SIZE } from "constants/default"
import { LocalStorageKey, RoutePath } from "constants/enum"
import { ITEM_COUNT } from "constants/env"
import { useGetPopular, useGetTrending } from "hooks/api"
import { useLocalStorage } from "hooks/web"
import HomePage from "pages/HomePage"
import ListPage from "pages/ListPage"
import { useEffect, useState } from "react"
import { Route, Switch, useLocation } from "react-router-dom"
import { MovieType } from "types/movies"

function App() {
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [popularPage, setPopularPage] = useLocalStorage<number>(LocalStorageKey.POPULAR_PAGE, 0)
  const [trendingPage, setTrendingPage] = useLocalStorage<number>(LocalStorageKey.TRENDING_PAGE, 0)
  const [favoritesPage, setFavoritesPage] = useLocalStorage<number>(LocalStorageKey.FAVORITES_PAGE, 0)
  const [faveLastPage, setFaveLastPage] = useLocalStorage<number>(LocalStorageKey.FAVORITES_LAST_PAGE, 0)

  const [favorites, setFavorites] = useLocalStorage<MovieType[]>(LocalStorageKey.FAVORITES, [])

  const {
    data: popular,
    refetch: fetchPopular,
    isFetching: popularIsFetching,
    isLoading: popularIsLoading
  } = useGetPopular(popularPage)

  const {
    data: trending,
    refetch: fetchTrending,
    isFetching: trendingIsFetching,
    isLoading: trendingIsLoading
  } = useGetTrending(trendingPage)

  const handleToggleFavorites = (movie: MovieType) => {
    favorites.find(fave => fave.ids.trakt === movie.ids.trakt)
      ? setFavorites(favorites.filter(fave => fave.ids.trakt !== movie.ids.trakt))
      : setFavorites(faves => [...faves, movie])
  }

  const handlePageChange = (setter: (value: number) => void) => (page: number) => {
    setter(page)
    setLoading(true)
  }

  useEffect(() => {
    if (location.pathname !== RoutePath.POPULAR || !popularPage) setPopularPage(1)
    if (location.pathname !== RoutePath.TRENDING || !trendingPage) setTrendingPage(1)
    if (location.pathname !== RoutePath.FAVORITES || !favoritesPage) setFavoritesPage(1)
  }, [
    location,
    popularPage,
    trendingPage,
    favoritesPage,
    setPopularPage,
    setTrendingPage,
    setFavoritesPage,
  ])

  useEffect(() => {
    if (!favorites) setFavorites([])
    if (!faveLastPage) setFaveLastPage(0)
  }, [favorites, faveLastPage, setFavorites, setFaveLastPage])

  useEffect(() => {
    if (!favorites) return
    if (!faveLastPage) return
    const faveTotalPages = Math.ceil(favorites.length / PAGE_SIZE) || 1
    if (faveLastPage !== faveTotalPages) setFaveLastPage(faveTotalPages)
    if (favoritesPage > faveLastPage) setFavoritesPage(faveTotalPages)
  }, [favorites, faveLastPage, favoritesPage, setFaveLastPage, setFavoritesPage])

  useEffect(() => {
    if (location.pathname === RoutePath.POPULAR) fetchPopular()
    if (location.pathname === RoutePath.TRENDING) fetchTrending()
  }, [location, popularPage, fetchPopular, trendingPage, fetchTrending])

  useEffect(() => {
    if (popularIsFetching || popularIsLoading) return
    setLoading(false)
  }, [popularIsFetching, popularIsLoading])

  useEffect(() => {
    if (trendingIsFetching || trendingIsLoading) return
    setLoading(false)
  }, [trendingIsFetching, trendingIsLoading])

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
              loading={popularIsLoading || popularIsFetching || trendingIsLoading || trendingIsFetching}
            />
          </Route>
          <Route exact path={RoutePath.POPULAR}>
            {!loading ? (
              <ListPage
                title="Popular Movies"
                url={RoutePath.POPULAR}
                items={popular.data}
                favorites={favorites}
                toggleFavorites={handleToggleFavorites}
                currentPage={popularPage}
                totalItems={popular.headers[ITEM_COUNT]}
                onPageChange={handlePageChange(setPopularPage)}
              />
            ) : (
              <Loading />
            )}
          </Route>
          <Route exact path={RoutePath.TRENDING}>
            {!loading ? (
              <ListPage
                title="Trending Movies"
                url={RoutePath.TRENDING}
                items={trending.data.map(item => item.movie)}
                favorites={favorites}
                toggleFavorites={handleToggleFavorites}
                currentPage={trendingPage}
                totalItems={trending.headers[ITEM_COUNT]}
                onPageChange={handlePageChange(setTrendingPage)}
              />
            ) : (
              <Loading />
            )}
          </Route>
          <Route exact path={RoutePath.FAVORITES}>
            <ListPage
              title="Your Favorite Movies"
              url={RoutePath.FAVORITES}
              items={favorites}
              favorites={favorites}
              toggleFavorites={handleToggleFavorites}
              currentPage={favoritesPage}
              totalItems={favorites.length}
              onPageChange={handlePageChange(setFavoritesPage)}
            />
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  )
}

export default App
