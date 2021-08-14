import Footer from "components/Footer"
import Loading from "components/Loading"
import Navbar from "components/Navbar"
import { HOME_POPULAR_SIZE, HOME_TRENDING_SIZE, PAGE_SIZE } from "constants/default"
import { RoutePath } from "constants/enum"
import { ITEM_COUNT } from "constants/env"
import { useGetPopular, useGetTrending } from "hooks/api"
import {
  useFaveLastPage,
  useFavorites,
  useFavoritesPage,
  useGenre,
  usePopularPage,
  useSearchInput,
  useTrendingPage,
  useYear
} from "hooks/localStorage"
import HomePage from "pages/HomePage"
import ListPage from "pages/ListPage"
import SearchPage from "pages/SearchPage"
import { useEffect, useState } from "react"
import { Route, Switch, useLocation } from "react-router-dom"

function App() {
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [popularPage, setPopularPage] = usePopularPage()
  const [trendingPage, setTrendingPage] = useTrendingPage()
  const [favoritesPage, setFavoritesPage] = useFavoritesPage()
  const [faveLastPage, setFaveLastPage] = useFaveLastPage()

  const [favorites, setFavorites] = useFavorites()

  const [, setSearchInput] = useSearchInput()
  const [, setGenre] = useGenre()
  const [, setYear] = useYear()

  const {
    data: popular,
    refetch: fetchPopular,
    isFetching: popularIsFetching,
    isLoading: popularIsLoading
  } = useGetPopular(popularPage)

  const {
    data: homePopular,
    refetch: fetchHomePopular,
    isFetching: homePopularIsFetching,
    isLoading: homePopularIsLoading
  } = useGetPopular(1, HOME_POPULAR_SIZE)

  const {
    data: trending,
    refetch: fetchTrending,
    isFetching: trendingIsFetching,
    isLoading: trendingIsLoading
  } = useGetTrending(trendingPage)

  const {
    data: homeTrending,
    refetch: fetchHomeTrending,
    isFetching: homeTrendingIsFetching,
    isLoading: homeTrendingIsLoading
  } = useGetTrending(1, HOME_TRENDING_SIZE)

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
    setFavoritesPage
  ])

  useEffect(() => {
    if (location.pathname !== RoutePath.SEARCH) {
      setSearchInput("")
      setGenre("")
      setYear("")
    }
  }, [location.pathname, setGenre, setSearchInput, setYear])

  useEffect(() => {
    if (!favorites) setFavorites([])
    if (!faveLastPage) setFaveLastPage(1)
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
    if (location.pathname === RoutePath.HOME) {
      fetchHomePopular()
      fetchHomeTrending()
    }
  }, [
    location,
    popularPage,
    fetchPopular,
    trendingPage,
    fetchTrending,
    fetchHomePopular,
    fetchHomeTrending
  ])

  useEffect(() => {
    if (popularIsFetching || popularIsLoading) return
    setLoading(false)
  }, [popularIsFetching, popularIsLoading])

  useEffect(() => {
    if (trendingIsFetching || trendingIsLoading) return
    setLoading(false)
  }, [trendingIsFetching, trendingIsLoading])

  useEffect(() => {
    if (homePopularIsFetching || homePopularIsLoading) return
    setLoading(false)
  }, [homePopularIsFetching, homePopularIsLoading])

  useEffect(() => {
    if (homeTrendingIsFetching || homeTrendingIsLoading) return
    setLoading(false)
  }, [homeTrendingIsFetching, homeTrendingIsLoading])

  return (
    <div className="flex flex-col w-full min-h-screen text-white bg-black">
      <Navbar />
      <main className="flex-grow w-full max-w-5xl px-2 mx-auto mt-28">
        <Switch>
          <Route exact path={RoutePath.HOME}>
            {!loading && homePopular && homeTrending ? (
              <HomePage
                popular={homePopular.data}
                trending={homeTrending.data.map(item => item.movie)}
                loading={
                  homePopularIsLoading ||
                  homePopularIsFetching ||
                  homeTrendingIsLoading ||
                  homeTrendingIsFetching
                }
              />
            ) : (
              <Loading />
            )}
          </Route>
          <Route exact path={RoutePath.POPULAR}>
            {!loading && popular ? (
              <ListPage
                title="Popular Movies"
                url={RoutePath.POPULAR}
                items={popular.data}
                currentPage={popularPage}
                totalItems={popular.headers[ITEM_COUNT]}
                onPageChange={handlePageChange(setPopularPage)}
                emptyText={EmptyText.POPULAR}
              />
            ) : (
              <Loading />
            )}
          </Route>
          <Route exact path={RoutePath.TRENDING}>
            {!loading && trending ? (
              <ListPage
                title="Trending Movies"
                url={RoutePath.TRENDING}
                items={trending.data.map(item => item.movie)}
                currentPage={trendingPage}
                totalItems={trending.headers[ITEM_COUNT]}
                onPageChange={handlePageChange(setTrendingPage)}
                emptyText={EmptyText.TRENDING}
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
              currentPage={favoritesPage}
              totalItems={favorites.length}
              onPageChange={handlePageChange(setFavoritesPage)}
              emptyText={EmptyText.FAVORITES}
            />
          </Route>
          <Route exact path={RoutePath.SEARCH} component={SearchPage} />
        </Switch>
      </main>
      <Footer />
    </div>
  )
}

export default App
