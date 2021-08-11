import axios, { AxiosResponse } from "axios"
import { ApiRouteKey, ApiRoutePath } from "constants/enum"
import { TMDB_API_KEY, TMDB_BASE_URL } from "constants/env"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Axios } from "services/web"
import { MovieImageUrlType, MovieType, TrendingMovieType } from "types/movies"

export const useGetPopular = () => {
  const getPopular = () => Axios.get(ApiRoutePath.POPULAR, { params: { limit: 20 } })
  return useQuery<AxiosResponse<MovieType[]>>(ApiRouteKey.POPULAR, getPopular)
}

export const useGetTrending = () => {
  const getTrending = () => Axios.get(ApiRoutePath.TRENDING, { params: { limit: 20 } })
  return useQuery<AxiosResponse<TrendingMovieType[]>>(ApiRouteKey.TRENDING, getTrending)
}

export const useGetImageUrls = (items: MovieType[]) => {
  const [imageUrls, setImageUrls] = useState<MovieImageUrlType[]>([])

  useEffect(() => {
    const fetchImageUrls = async () => {
      const results = await Promise.all(
        items.map(item => axios.get(TMDB_BASE_URL + item.ids.tmdb + TMDB_API_KEY))
      )

      setImageUrls(results.map(({ data }) => ({ id: data?.id, url: data?.poster_path })))
    }

    fetchImageUrls()
  }, [items])

  return imageUrls
}
