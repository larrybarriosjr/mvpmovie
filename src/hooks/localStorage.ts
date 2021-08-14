import { useLocalStorageValue } from "@react-hookz/web"
import { LocalStorageKey } from "constants/enum"
import { MovieType } from "types/movies"

export const useFavorites = () => useLocalStorageValue<MovieType[]>(LocalStorageKey.FAVORITES, [])
