import Footer from "components/Footer"
import Navbar from "components/Navbar"
import { EmptyText, RoutePath } from "constants/enum"
import { ITEM_COUNT } from "constants/env"
import { useGetPopular, useGetTrending } from "hooks/api"
import {
  useFavoritesPage,
  useGenre,
  usePopularPage,
  useSearchInput,
  useSearchPage,
  useTrendingPage,
  useYear
} from "hooks/localStorage"
import FavoritesPage from "pages/FavoritesPage"
import HomePage from "pages/HomePage"
import ListPage from "pages/ListPage"
import SearchPage from "pages/SearchPage"
import { useEffect } from "react"
import { Route, Switch, useLocation } from "react-router-dom"

function App() {
  const location = useLocation()

  const [popularPage, setPopularPage] = usePopularPage()
  const [trendingPage, setTrendingPage] = useTrendingPage()
  const [favoritesPage, setFavoritesPage] = useFavoritesPage()

  const [, setSearchInput] = useSearchInput()
  const [, setSearchPage] = useSearchPage()
  const [, setGenre] = useGenre()
  const [, setYear] = useYear()

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

  const handlePageChange = (setter: (value: number) => void) => (page: number) => {
    setter(page)
  }

  useEffect(() => {
    if (location.pathname !== RoutePath.POPULAR || !popularPage) setPopularPage(1)
    if (location.pathname !== RoutePath.TRENDING || !trendingPage) setTrendingPage(1)
    if (location.pathname !== RoutePath.FAVORITES || !favoritesPage) setFavoritesPage(1)
    if (location.pathname !== RoutePath.SEARCH) {
      setSearchInput("")
      setSearchPage(1)
      setGenre("")
      setYear("")
    }
  }, [
    location.pathname,
    popularPage,
    trendingPage,
    favoritesPage,
    setPopularPage,
    setTrendingPage,
    setFavoritesPage,
    setSearchInput,
    setSearchPage,
    setGenre,
    setYear
  ])

  useEffect(() => {
    if (location.pathname === RoutePath.POPULAR) fetchPopular()
    if (location.pathname === RoutePath.TRENDING) fetchTrending()
  }, [location, popularPage, fetchPopular, trendingPage, fetchTrending])

  return (
    <div className="flex flex-col w-full min-h-screen text-white bg-black">
      <Navbar />
      <main className="flex-grow w-full max-w-5xl px-2 mx-auto mt-28">
        <Switch>
          <Route exact path={RoutePath.HOME} component={HomePage} />
          <Route exact path={RoutePath.FAVORITES} component={FavoritesPage} />
          <Route exact path={RoutePath.SEARCH} component={SearchPage} />

          <Route exact path={RoutePath.POPULAR}>
            <ListPage
              title="Popular Movies"
              url={RoutePath.POPULAR}
              items={popular?.data}
              currentPage={popularPage}
              totalItems={popular?.headers[ITEM_COUNT]}
              onPageChange={handlePageChange(setPopularPage)}
              emptyText={EmptyText.POPULAR}
              loading={popularIsFetching || popularIsLoading}
            />
          </Route>

          <Route exact path={RoutePath.TRENDING}>
            <ListPage
              title="Trending Movies"
              url={RoutePath.TRENDING}
              items={trending?.data.map(item => item.movie)}
              currentPage={trendingPage}
              totalItems={trending?.headers[ITEM_COUNT]}
              onPageChange={handlePageChange(setTrendingPage)}
              emptyText={EmptyText.TRENDING}
              loading={trendingIsFetching || trendingIsLoading}
            />
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  )
}

export default App
