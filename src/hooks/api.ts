import axios, { AxiosResponse } from "axios"
import { MAX_ITEMS, PAGE_SIZE } from "constants/default"
import { ApiRouteKey, ApiRoutePath } from "constants/enum"
import { TMDB_API_KEY, TMDB_BASE_URL } from "constants/env"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Axios } from "services/web"
import {
  GenreType,
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
  const getTmdbMovie = (item: MovieType) =>
    axios.get<{ id: number; poster_path: string }>(`${TMDB_BASE_URL}${item.ids.tmdb}${TMDB_API_KEY}`)

  useEffect(() => {
    const fetchImageUrls = async () => {
      const results = await Promise.allSettled(items.map(getTmdbMovie))
      setImageUrls(
        results
          .map(data =>
            data.status === "fulfilled"
              ? { id: data.value.data.id, url: data.value.data.poster_path }
              : { id: 0, url: "" }
          )
          .filter(data => data.id && data.url)
      )
    }

    fetchImageUrls()
  }, [items])

  return imageUrls
}

export const useSearchMovie = ({ query, genre, year }: MovieSearchQueryType) => {
  const searchMovie = () =>
    Axios.get(ApiRoutePath.SEARCH, {
      params: {
        query,
        fields: "title",
        limit: MAX_ITEMS,
        genres: genre || undefined,
        years: year || undefined,
        extended: "full"
      }
    })
  return useQuery<AxiosResponse<SearchMovieType[]>>(ApiRouteKey.SEARCH, searchMovie)
}

export const useGetGenres = () => {
  const getGenres = () => Axios.get(ApiRoutePath.GENRES)
  return useQuery<AxiosResponse<GenreType[]>>(ApiRouteKey.GENRES, getGenres)
}
