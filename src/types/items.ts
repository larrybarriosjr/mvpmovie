import { MovieSort, MovieSortLabel, RouteName, RoutePath } from "constants/enum"

export type RouteItemType = {
  name: RouteName
  url: RoutePath
}

export type MovieSortItemType = {
  label: MovieSortLabel
  value: MovieSort
}
