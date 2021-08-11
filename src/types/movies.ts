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

export type MovieImageUrlType = {
  id: number
  url: string
}
