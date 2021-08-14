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
  YEAR = "year",
  SORT_BY = "sort_by"
}

export enum MovieSortLabel {
  ALPHABETICAL = "Alphabetical",
  LATEST = "Latest Release"
}

export enum MovieSort {
  ALPHABETICAL = "alphabetical",
  LATEST = "latest"
}

export enum EmptyText {
  POPULAR = "No popular movies found. Make sure you're online.",
  TRENDING = "No trending movies found. Make sure you're online.",
  FAVORITES = "You haven't added your favorite movies yet. Click on one of the movie posters to add one.",
  SEARCH = "No movies found. Please make sure the query is spelled correctly."
}
