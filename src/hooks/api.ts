import { AxiosResponse } from "axios"
import { ApiRouteKey, ApiRoutePath } from "constants/enum"
import { useQuery } from "react-query"
import { Axios } from "services/web"
import { MovieType, TrendingMovieType } from "types/tmdb"

export const useGetPopular = () => {
  const getPopular = () => Axios.get(ApiRoutePath.POPULAR)
  return useQuery<AxiosResponse<MovieType[]>>(ApiRouteKey.POPULAR, getPopular)
}

export const useGetTrending = () => {
  const getTrending = () => Axios.get(ApiRoutePath.TRENDING)
  return useQuery<AxiosResponse<TrendingMovieType[]>>(ApiRouteKey.TRENDING, getTrending)
}
