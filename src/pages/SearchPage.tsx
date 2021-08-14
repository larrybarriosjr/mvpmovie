import clsx from "clsx"
import GenreDropdown from "components/GenreDropdown"
import Section from "components/Section"
import { PAGE_SIZE } from "constants/default"
import { RoutePath } from "constants/enum"
import { ChangeEvent, Fragment, useState } from "react"
import { RiSearchLine } from "react-icons/ri"
import { useLocation } from "react-router-dom"
import { MovieType } from "types/movies"

type SearchPageProps = {
  title: string
  url: RoutePath
  items: MovieType[]
  favorites: MovieType[]
  toggleFavorites: (movie: MovieType) => void
  currentPage: number
  totalItems: number
  onPageChange: (page: number) => void
}

const SearchPage = ({
  title,
  url,
  items,
  favorites,
  toggleFavorites,
  currentPage,
  totalItems,
  onPageChange
}: SearchPageProps) => {
  const location = useLocation()
  const fullItems = items.slice(currentPage * PAGE_SIZE - PAGE_SIZE, currentPage * PAGE_SIZE)

  const [queryValue, setQueryValue] = useState<string>("")

  const inputClasses = clsx([
    "pl-10 py-2 w-full bg-black border-2 rounded-full outline-none border-gray",
    "hover:border-primary focus:border-primary",
    { "font-bold": queryValue }
  ])

  const handleQueryValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQueryValue(e.target.value)
  }

  return (
    <Fragment>
      <section className="p-4">
        <form className="flex justify-between w-full gap-4">
          <label className="relative w-full">
            <RiSearchLine className="absolute h-full my-auto cursor-default left-3" size="20" />
            <input
              name="search"
              placeholder="Search movie..."
              className={inputClasses}
              value={queryValue}
              onChange={handleQueryValueChange}
            />
          </label>
          <GenreDropdown />
        </form>
      </section>
      <Section
        title={title}
        url={url}
        items={location.pathname === RoutePath.SEARCH ? fullItems : items}
        favorites={favorites}
        toggleFavorites={toggleFavorites}
        currentPage={currentPage}
        totalItems={totalItems}
        onPageChange={onPageChange}
      />
    </Fragment>
  )
}

export default SearchPage
