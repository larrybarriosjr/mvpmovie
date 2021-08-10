import { ApiRoutePath } from "constants/enum"
import { Axios } from "services/web"

export const getPopular = () => {
  return Axios.get(ApiRoutePath.POPULAR)
}

export const getTopRated = () => {
  return Axios.get(ApiRoutePath.TOP_RATED)
}
