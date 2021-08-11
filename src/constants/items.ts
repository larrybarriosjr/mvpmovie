import { RouteItemType } from "types/items"
import { RouteName, RoutePath } from "./enum"

export const routes: RouteItemType[] = [
  { name: RouteName.HOME, url: RoutePath.HOME },
  { name: RouteName.POPULAR, url: RoutePath.POPULAR },
  { name: RouteName.TRENDING, url: RoutePath.TRENDING },
  { name: RouteName.FAVORITES, url: RoutePath.FAVORITES }
]
