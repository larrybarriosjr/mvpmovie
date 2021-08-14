import { MovieSortItemType, RouteItemType } from "types/items"
import { MovieSort, MovieSortLabel, RouteName, RoutePath } from "./enum"

export const routes: RouteItemType[] = [
  { name: RouteName.HOME, url: RoutePath.HOME },
  { name: RouteName.POPULAR, url: RoutePath.POPULAR },
  { name: RouteName.TRENDING, url: RoutePath.TRENDING },
  { name: RouteName.FAVORITES, url: RoutePath.FAVORITES }
]

export const sortItems: MovieSortItemType[] = [
  { label: MovieSortLabel.AZ, value: MovieSort.AZ },
  { label: MovieSortLabel.YR, value: MovieSort.YR }
]
