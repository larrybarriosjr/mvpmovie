import Section from "components/layout/Section"
import { RoutePath } from "constants/enum"
import { useGetPopular, useGetTopRated } from "hooks/api"
import { Fragment } from "react"

const HomePage = () => {
  const { data: popular } = useGetPopular()
  const { data: topRated } = useGetTopRated()

  if (!popular) return null
  if (!topRated) return null

  return (
    <Fragment>
      <Section title="Popular Movies" url={RoutePath.POPULAR} items={popular.data.results} quantity={4} />
      <Section
        title="Top Rated Movies"
        url={RoutePath.TOP_RATED}
        items={topRated.data.results}
        quantity={8}
      />
    </Fragment>
  )
}

export default HomePage
