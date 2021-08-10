import { RoutePath } from "constants/enum"
import { IMAGE_URL } from "constants/env"
import dayjs from "dayjs"
import { useGetPopular } from "hooks/api"
import { Fragment } from "react"
import { Link } from "react-router-dom"
import { MovieType } from "types/tmdb"

const HomePage = () => {
  const { data: popular } = useGetPopular()

  if (!popular) return null

  return (
    <Fragment>
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Popular Movies</h2>
          <Link to={RoutePath.POPULAR} className="text-sm border-b hover:text-primary">
            View All
          </Link>
        </div>
        <ul className="flex justify-between my-4 text-center">
          {popular.data.results.slice(0, 4).map((movie: MovieType) => (
            <li key={movie.id} className="flex flex-col gap-2">
              <Link to="" className="p-1 cursor-pointer hover:ring-4 hover:ring-primary">
                <img
                  src={IMAGE_URL + movie.poster_path}
                  alt={movie.title}
                  width="240"
                  className="border border-white border-solid"
                />
              </Link>
              <div>
                <Link to="" className="font-bold hover:text-primary">
                  {movie.original_title}
                </Link>
                <p className="font-thin">{dayjs(movie.release_date).format("YYYY")}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Fragment>
  )
}

export default HomePage
