import { getPopular } from "api/movies"
import { ApiRouteKey } from "constants/enum"
import { useQuery } from "react-query"

export const useGetPopular = () => {
  return useQuery(ApiRouteKey.POPULAR, getPopular)
}
