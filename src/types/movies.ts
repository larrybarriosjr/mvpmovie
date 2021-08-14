export type MovieType = {
  title: string
  year: number
  ids: {
    trakt: number
    slug: string
    imdb: string
    tmdb: number
  }
  tagline: string
  overview: string
  released: string
  runtime: number
  country: string
  trailer: string
  homepage: string
  status: string
  rating: number
  votes: number
  comment_count: number
  updated_at: string
  language: string
}

export type TrendingMovieType = {
  watchers: number
  movie: MovieType
}

export type MovieImageUrlType = {
  id: number
  url: string
}

export type MovieSearchQueryType = {
  query: string
  genre?: string
  year?: string
}

export type SearchMovieType = {
  type: string
  score: number
  movie: MovieType
}

export type GenreType = {
  name: string
  slug: string
}
