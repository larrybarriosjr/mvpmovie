import { getPopular, getTopRated } from "api/movies"
import { AxiosResponse } from "axios"
import { ApiRouteKey } from "constants/enum"
import { useQuery } from "react-query"
import { MovieResponseType } from "types/tmdb"

export const useGetPopular = () => {
  return useQuery<AxiosResponse<MovieResponseType>>(ApiRouteKey.POPULAR, getPopular)
}

export const useGetTopRated = () => {
  return useQuery<AxiosResponse<MovieResponseType>>(ApiRouteKey.TOP_RATED, getTopRated)
}
