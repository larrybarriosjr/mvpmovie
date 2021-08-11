import { getPopular, getTrending } from "api/movies"
import { AxiosResponse } from "axios"
import { ApiRouteKey } from "constants/enum"
import { useQuery } from "react-query"
import { MovieType, TrendingMovieType } from "types/tmdb"

export const useGetPopular = () => {
  return useQuery<AxiosResponse<MovieType[]>>(ApiRouteKey.POPULAR, getPopular)
}

export const useGetTrending = () => {
  return useQuery<AxiosResponse<TrendingMovieType[]>>(ApiRouteKey.TRENDING, getTrending)
}
