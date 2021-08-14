import { useLocalStorageValue } from "@react-hookz/web"
import GenreDropdown from "components/GenreDropdown"
import Loading from "components/Loading"
import Searchbar from "components/Searchbar"
import SearchButton from "components/SearchButton"
import Section from "components/Section"
import SortButtonGroup from "components/SortButtonGroup"
import YearPicker from "components/YearPicker"
import { PAGE_SIZE } from "constants/default"
import { LocalStorageKey, MovieSort, RoutePath } from "constants/enum"
import { useSearchMovie } from "hooks/api"
import { Fragment, useEffect } from "react"
import { MovieType } from "types/movies"

type SearchPageProps = {
  favorites: MovieType[]
  toggleFavorites: (movie: MovieType) => void
}

const SearchPage = ({ favorites, toggleFavorites }: SearchPageProps) => {
  const [searchInput] = useLocalStorageValue<string>(LocalStorageKey.SEARCH_INPUT, "")
  const [currentPage, setCurrentPage] = useLocalStorageValue<number>(LocalStorageKey.SEARCH_PAGE, 0)
  const [searchQuery, setSearchQuery] = useLocalStorageValue<string>(LocalStorageKey.SEARCH_QUERY, "")

  const [genre] = useLocalStorageValue<string>(LocalStorageKey.GENRE, "")
  const [year] = useLocalStorageValue<string>(LocalStorageKey.YEAR, "")
  const [sortBy] = useLocalStorageValue<string>(LocalStorageKey.SORT_BY, "")

  const {
    data: search,
    refetch: fetchSearch,
    isFetching: searchIsFetching,
    isLoading: searchIsLoading
  } = useSearchMovie({ query: searchQuery, genre, year })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSubmitSearch = () => {
    setSearchQuery(searchInput)
  }

  useEffect(() => {
    if (!currentPage) setCurrentPage(1)
  }, [currentPage, setCurrentPage])

  useEffect(() => {
    if (!searchQuery) return
    fetchSearch()
  }, [searchQuery, fetchSearch])

  if (!search) return null
  if (searchIsLoading || searchIsFetching) return <Loading />

  const fullItems = search.data
    .map(item => item.movie)
    .sort((a, b) => (sortBy === MovieSort.ALPHABETICAL ? a.title.localeCompare(b.title) : b.year - a.year))
    .slice(currentPage * PAGE_SIZE - PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <Fragment>
      <section className="flex flex-col p-4 gap-y-4">
        <form onSubmit={handleSubmitSearch} className="flex justify-between w-full gap-4">
          <Searchbar />
          <GenreDropdown />
          <YearPicker />
          <SearchButton />
        </form>
        <SortButtonGroup />
      </section>
      <Section
        title="Search Movies"
        url={RoutePath.SEARCH}
        items={fullItems}
        favorites={favorites}
        toggleFavorites={toggleFavorites}
        currentPage={currentPage}
        totalItems={search.data.length}
        onPageChange={handlePageChange}
      />
    </Fragment>
  )
}

export default SearchPage
