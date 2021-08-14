import Loading from "components/Loading"
import Section from "components/Section"
import { HOME_POPULAR_SIZE, HOME_TRENDING_SIZE } from "constants/default"
import { EmptyText, RoutePath } from "constants/enum"
import { useGetPopular, useGetTrending } from "hooks/api"
import { useFavorites } from "hooks/localStorage"
import { Fragment, useEffect } from "react"
import { useLocation } from "react-router-dom"

const HomePage = () => {
  const location = useLocation()
  const [favorites] = useFavorites()

  const {
    data: popular,
    refetch: fetchPopular,
    isFetching: popularIsFetching,
    isLoading: popularIsLoading
  } = useGetPopular(1, HOME_POPULAR_SIZE)

  const {
    data: trending,
    refetch: fetchTrending,
    isFetching: trendingIsFetching,
    isLoading: trendingIsLoading
  } = useGetTrending(1, HOME_TRENDING_SIZE)

  useEffect(() => {
    if (location.pathname === RoutePath.HOME) {
      fetchPopular()
      fetchTrending()
    }
  }, [fetchPopular, fetchTrending, location.pathname])

  if (
    !popular ||
    popularIsFetching ||
    popularIsLoading ||
    !trending ||
    trendingIsFetching ||
    trendingIsLoading
  ) {
    return <Loading />
  }

  return (
    <Fragment>
      <Section
        title="Popular Movies"
        url={RoutePath.POPULAR}
        items={popular.data}
        quantity={4}
        emptyText={EmptyText.POPULAR}
      />

      <Section
        title="Trending Movies"
        url={RoutePath.TRENDING}
        items={trending.data.map(item => item.movie)}
        quantity={8}
        emptyText={EmptyText.TRENDING}
      />

      <Section
        title="Your Favorite Movies"
        url={RoutePath.FAVORITES}
        items={favorites}
        quantity={4}
        emptyText={EmptyText.FAVORITES}
      />
    </Fragment>
  )
}

export default HomePage
