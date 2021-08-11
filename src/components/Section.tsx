import { RoutePath } from "constants/enum"
import { IMAGE_URL } from "constants/env"
import { useGetImageUrls } from "hooks/api"
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti"
import { Link } from "react-router-dom"
import { MovieType } from "types/movies"

type SectionProps = {
  title: string
  url: RoutePath
  items: MovieType[]
  quantity?: number
  favorites: MovieType[]
  toggleFavorites: (movie: MovieType) => void
}

const Section = ({ title, url, items, quantity, favorites, toggleFavorites }: SectionProps) => {
  const imageUrls = useGetImageUrls(items)

  const movieUrl = (movie: MovieType) => {
    return imageUrls.find(item => item.id === movie.ids.tmdb)
  }

  if (!imageUrls) return null

  return (
    <section className="my-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        {quantity && items.length ? (
          <Link to={url} className="text-sm border-b hover:text-primary">
            View All
          </Link>
        ) : null}
      </div>
      {items.length ? (
        <ul className="grid grid-cols-2 my-4 text-center md:grid-cols-4 justify-items-center gap-y-6">
          {items.slice(0, quantity).map((movie: MovieType) =>
            movieUrl(movie) ? (
              <li key={movie.ids.trakt} className="flex flex-col gap-2">
                <div className="relative p-1 cursor-pointer hover:ring-4 hover:ring-primary">
                  <Link to={`${RoutePath.DETAILS}/${movie.ids.trakt}`}>
                    <img
                      src={IMAGE_URL + movieUrl(movie)?.url}
                      alt={movie.title}
                      width="240"
                      className="border border-white border-solid"
                    />
                  </Link>
                  <button
                    type="button"
                    className="absolute rounded-full right-2 bottom-2 bg-gray"
                    onClick={() => toggleFavorites(movie)}
                  >
                    {favorites.find(fave => fave.ids.trakt === movie.ids.trakt) ? (
                      <TiStarFullOutline size="36" className="text-primary" />
                    ) : (
                      <TiStarOutline size="36" />
                    )}
                  </button>
                </div>
                <div>
                  <Link to="" className="font-bold hover:text-primary">
                    {movie.title}
                  </Link>
                  <p className="font-thin">{movie.year}</p>
                </div>
              </li>
            ) : null
          )}
        </ul>
      ) : url === RoutePath.FAVORITES ? (
        <div className="mt-8 mb-16 text-lg text-center">
          <p>You haven&apos;t added your favorite movies yet.</p>
          <p>Search for a movie and click on one of the stars (&#9734;) to add one.</p>
        </div>
      ) : null}
    </section>
  )
}

export default Section
