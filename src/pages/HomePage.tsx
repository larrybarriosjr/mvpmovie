import Loading from "components/Loading"
import Section from "components/Section"
import { RoutePath } from "constants/enum"
import { useFavorites } from "hooks/localStorage"
import { Fragment } from "react"
import { MovieType } from "types/movies"

type HomePageProps = {
  popular: MovieType[]
  trending: MovieType[]
  loading?: boolean
}

const HomePage = ({ popular, trending, loading }: HomePageProps) => {
  const [favorites] = useFavorites()

  if (loading) return <Loading />

  return (
    <Fragment>
      <Section title="Popular Movies" url={RoutePath.POPULAR} items={popular} quantity={4} />
      <Section title="Trending Movies" url={RoutePath.TRENDING} items={trending} quantity={8} />
      <Section title="Your Favorite Movies" url={RoutePath.FAVORITES} items={favorites} quantity={4} />
    </Fragment>
  )
}

export default HomePage
