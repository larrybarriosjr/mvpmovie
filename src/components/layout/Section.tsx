import { RoutePath } from "constants/enum"
import { IMAGE_URL } from "constants/env"
import dayjs from "dayjs"
import { Link } from "react-router-dom"
import { MovieType } from "types/tmdb"

type SectionProps = {
  title: string
  url: RoutePath
  items: MovieType[]
  quantity: number
}

const Section = ({ title, url, items, quantity }: SectionProps) => {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        <Link to={url} className="text-sm border-b hover:text-primary">
          View All
        </Link>
      </div>
      <ul className="flex flex-wrap justify-between my-4 text-center">
        {items.slice(0, quantity).map((movie: MovieType) => (
          <li key={movie.id} className="flex flex-col gap-1 mx-auto">
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
  )
}

export default Section
