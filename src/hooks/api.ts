import axios, { AxiosResponse } from "axios"
import { MAX_ITEMS, PAGE_SIZE } from "constants/default"
import { ApiRouteKey, ApiRoutePath } from "constants/enum"
import { TMDB_API_KEY, TMDB_BASE_URL } from "constants/env"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Axios } from "services/web"
import {
  MovieImageUrlType,
  MovieSearchQueryType,
  MovieType,
  SearchMovieType,
  TrendingMovieType
} from "types/movies"

export const useGetPopular = (page: number, limit?: number) => {
  const getPopular = () => Axios.get(ApiRoutePath.POPULAR, { params: { limit: limit || PAGE_SIZE, page } })
  return useQuery<AxiosResponse<MovieType[]>>(ApiRouteKey.POPULAR, getPopular)
}

export const useGetTrending = (page: number, limit?: number) => {
  const getTrending = () =>
    Axios.get(ApiRoutePath.TRENDING, { params: { limit: limit || PAGE_SIZE, page } })
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

export const useSearchMovie = ({ query }: MovieSearchQueryType) => {
  const searchMovie = () =>
    Axios.get(ApiRoutePath.SEARCH, { params: { query, fields: "title", limit: MAX_ITEMS } })
  return useQuery<AxiosResponse<SearchMovieType[]>>(ApiRouteKey.SEARCH, searchMovie)
}
