export type MovieType = {
  title: string
  year: number
  ids: {
    trakt: number
    slug: string
    imdb: string
    tmdb: number
  }
}

export type TrendingMovieType = {
  watchers: number
  movie: MovieType
}

export type TmdbResultType = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}
