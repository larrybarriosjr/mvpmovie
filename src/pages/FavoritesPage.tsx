import Section from "components/Section"
import { PAGE_SIZE } from "constants/default"
import { EmptyText, RoutePath } from "constants/enum"
import { useFaveLastPage, useFavorites, useFavoritesPage } from "hooks/localStorage"
import { useEffect } from "react"

const FavoritesPage = () => {
  const [favorites, setFavorites] = useFavorites()

  const [favoritesPage, setFavoritesPage] = useFavoritesPage()
  const [faveLastPage, setFaveLastPage] = useFaveLastPage()

  const fullItems = favorites.slice(favoritesPage * PAGE_SIZE - PAGE_SIZE, favoritesPage * PAGE_SIZE)

  const handlePageChange = (page: number) => {
    setFavoritesPage(page)
  }

  useEffect(() => {
    if (!favorites) setFavorites([])
    if (!faveLastPage) setFaveLastPage(1)
  }, [favorites, faveLastPage, setFavorites, setFaveLastPage])

  useEffect(() => {
    if (!favorites) return
    if (!faveLastPage) return
    const faveTotalPages = Math.ceil(favorites.length / PAGE_SIZE) || 1
    if (faveLastPage !== faveTotalPages) setFaveLastPage(faveTotalPages)
    if (favoritesPage > faveLastPage) setFavoritesPage(faveTotalPages)
  }, [favorites, faveLastPage, favoritesPage, setFaveLastPage, setFavoritesPage])

  return (
    <Section
      title="Your Favorite Movies"
      url={RoutePath.FAVORITES}
      items={fullItems}
      currentPage={favoritesPage}
      totalItems={favorites.length}
      onPageChange={handlePageChange}
      emptyText={EmptyText.FAVORITES}
    />
  )
}

export default FavoritesPage
