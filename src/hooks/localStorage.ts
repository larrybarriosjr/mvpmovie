import { useLocalStorageValue } from "@react-hookz/web"
import { LocalStorageKey, MovieSort } from "constants/enum"
import { MovieType } from "types/movies"

export const usePopularPage = () => useLocalStorageValue<number>(LocalStorageKey.POPULAR_PAGE, 0)
export const useTrendingPage = () => useLocalStorageValue<number>(LocalStorageKey.TRENDING_PAGE, 0)
export const useFavoritesPage = () => useLocalStorageValue<number>(LocalStorageKey.FAVORITES_PAGE, 0)
export const useFaveLastPage = () => useLocalStorageValue<number>(LocalStorageKey.FAVORITES_LAST_PAGE, 0)
export const useSearchPage = () => useLocalStorageValue<number>(LocalStorageKey.SEARCH_PAGE, 0)

export const useFavorites = () => useLocalStorageValue<MovieType[]>(LocalStorageKey.FAVORITES, [])

export const useSearchInput = () => useLocalStorageValue<string>(LocalStorageKey.SEARCH_INPUT, "")
export const useSearchQuery = () => useLocalStorageValue<string>(LocalStorageKey.SEARCH_QUERY, "")

export const useGenre = () => useLocalStorageValue<string>(LocalStorageKey.GENRE, "")
export const useYear = () => useLocalStorageValue<string>(LocalStorageKey.YEAR, "")
export const useMovieSort = () => useLocalStorageValue<MovieSort>(LocalStorageKey.SORT_BY, MovieSort.LATEST)
export const useFetchingResults = () => useLocalStorageValue<boolean>(LocalStorageKey.FETCHING, false)
