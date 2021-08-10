import Section from "components/layout/Section"
import { RoutePath } from "constants/enum"
import { useGetPopular } from "hooks/api"
import { Fragment } from "react"

const HomePage = () => {
  const { data: popular } = useGetPopular()

  if (!popular) return null

  return (
    <Fragment>
      <Section title="Popular Movies" url={RoutePath.POPULAR} items={popular.data.results} quantity={4} />
    </Fragment>
  )
}

export default HomePage
