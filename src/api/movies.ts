import { ApiRoutePath } from "constants/enum"
import { Axios } from "services/web"

export const getPopular = () => {
  return Axios.get(ApiRoutePath.POPULAR)
}
