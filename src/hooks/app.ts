import { MovieImageUrlType, MovieType } from "types/movies"

export const getMovieUrl = (urls: MovieImageUrlType[], movie: MovieType) => {
  return urls.find(item => item.id === movie.ids.tmdb)
}
