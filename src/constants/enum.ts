export enum RouteName {
  HOME = "Home",
  POPULAR = "Popular",
  TRENDING = "Trending",
  FAVORITES = "Favorites"
}

export enum RoutePath {
  HOME = "/",
  POPULAR = "/popular",
  TRENDING = "/trending",
  FAVORITES = "/favorites",
  DETAILS = "/movie",
  SEARCH = "/search"
}

export enum ApiRouteKey {
  POPULAR = "popular",
  TRENDING = "trending",
  SEARCH = "search",
  GENRES = "genres"
}

export enum ApiRoutePath {
  POPULAR = "/movies/popular",
  TRENDING = "/movies/trending",
  SEARCH = "/search/movie",
  GENRES = "/genres/movies"
}

export enum LocalStorageKey {
  FAVORITES = "favorites",
  POPULAR_PAGE = "popular_page",
  TRENDING_PAGE = "trending_page",
  FAVORITES_PAGE = "favorites_page",
  FAVORITES_LAST_PAGE = "favorites_last_page",
  SEARCH_PAGE = "search_page",
  SEARCH_INPUT = "search_input",
  SEARCH_QUERY = "search_query",
  GENRE = "genre",
  YEAR = "year"
}

export enum MovieSortLabel {
  AZ = "Alphabetical",
  YR = "By Year"
}

export enum MovieSort {
  AZ = "alphabetical",
  YR = "by_year"
}
