/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_BASE_URL: string
    REACT_APP_IMAGE_URL: string
    REACT_APP_API_VERSION_PROP: string
    REACT_APP_API_VERSION_VALUE: string
    REACT_APP_API_KEY_PROP: string
    REACT_APP_API_KEY_VALUE: string
    REACT_APP_TMDB_BASE_URL: string
    REACT_APP_TMDB_API_KEY: string
    REACT_APP_PAGE_COUNT: string
    REACT_APP_ITEM_COUNT: string
  }
}

declare module "rc-pagination/lib/locale/en_US"
