import { RouteItemType } from "types/items"
import { RouteName, RoutePath } from "./enum"

export const routes: RouteItemType[] = [
  { name: RouteName.HOME, url: RoutePath.HOME },
  { name: RouteName.POPULAR, url: RoutePath.POPULAR },
  { name: RouteName.TOP_RATED, url: RoutePath.TOP_RATED },
  { name: RouteName.FAVORITES, url: RoutePath.FAVORITES }
]
