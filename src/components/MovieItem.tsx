import { IMAGE_URL } from "constants/env"
import { getMovieUrl } from "hooks/app"
import { useFavorites } from "hooks/localStorage"
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti"
import { MovieImageUrlType, MovieType } from "types/movies"

type MovieItemProps = {
  urls: MovieImageUrlType[]
  movie: MovieType
}

const MovieItem = ({ urls, movie }: MovieItemProps) => {
  const [favorites, setFavorites] = useFavorites()

  const handleToggleFavorites = (movie: MovieType) => {
    favorites.find(fave => fave.ids.trakt === movie.ids.trakt)
      ? setFavorites(favorites.filter(fave => fave.ids.trakt !== movie.ids.trakt))
      : setFavorites([...favorites, movie])
  }

  return (
    <li key={movie.ids.trakt} className="flex flex-col gap-2">
      <div className="relative p-1 overflow-hidden hover:ring-4 hover:ring-primary h-96">
        <input
          type="image"
          src={IMAGE_URL + getMovieUrl(urls, movie)?.url}
          alt={movie.title}
          className="object-cover h-full border border-white border-solid cursor-pointer w-60"
          onClick={() => handleToggleFavorites(movie)}
        />
        <button
          type="button"
          className="absolute rounded-full right-2 bottom-2 bg-gray"
          onClick={() => handleToggleFavorites(movie)}
        >
          {favorites.find(fave => fave.ids.trakt === movie.ids.trakt) ? (
            <TiStarFullOutline size="36" className="text-primary" />
          ) : (
            <TiStarOutline size="36" />
          )}
        </button>
      </div>
      <div>
        <p className="font-bold">{movie.title}</p>
        <p className="font-thin">{movie.year}</p>
      </div>
    </li>
  )
}

export default MovieItem
