import GenreDropdown from "components/GenreDropdown"
import Loading from "components/Loading"
import Searchbar from "components/Searchbar"
import SearchButton from "components/SearchButton"
import Section from "components/Section"
import SortButtonGroup from "components/SortButtonGroup"
import YearPicker from "components/YearPicker"
import { PAGE_SIZE } from "constants/default"
import { EmptyText, MovieSort, RoutePath } from "constants/enum"
import { useSearchMovie } from "hooks/api"
import {
  useGenre,
  useMovieSort,
  useSearchInput,
  useSearchPage,
  useSearchQuery,
  useYear
} from "hooks/localStorage"
import { FormEvent, Fragment, useEffect } from "react"

const SearchPage = () => {
  const [searchInput] = useSearchInput()
  const [currentPage, setCurrentPage] = useSearchPage()
  const [searchQuery, setSearchQuery] = useSearchQuery()

  const [genre] = useGenre()
  const [year] = useYear()
  const [sortBy] = useMovieSort()

  const {
    data: search,
    refetch: fetchSearch,
    isFetching: searchIsFetching,
    isLoading: searchIsLoading
  } = useSearchMovie({ query: searchQuery, genre, year })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchQuery(searchInput)
  }

  useEffect(() => {
    if (!currentPage) setCurrentPage(1)
  }, [currentPage, setCurrentPage])

  useEffect(() => {
    if (!searchQuery) return
    fetchSearch()
  }, [searchQuery, fetchSearch])

  const fullItems = search?.data
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
      {!searchIsLoading && !searchIsFetching && search?.data.length && fullItems ? (
        <Section
          title="Search Movies"
          url={RoutePath.SEARCH}
          items={fullItems}
          currentPage={currentPage}
          totalItems={search.data.length}
          onPageChange={handlePageChange}
          emptyText={EmptyText.SEARCH}
        />
      ) : (
        <Loading />
      )}
    </Fragment>
  )
}

export default SearchPage
