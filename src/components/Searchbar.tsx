import { useLocalStorageValue } from "@react-hookz/web"
import clsx from "clsx"
import { LocalStorageKey, RoutePath } from "constants/enum"
import { ChangeEvent, KeyboardEvent } from "react"
import { RiSearchLine } from "react-icons/ri"
import { useHistory } from "react-router-dom"

type SearchbarProps = {
  standalone?: boolean
}

const Searchbar = ({ standalone }: SearchbarProps) => {
  const history = useHistory()
  const [value, setValue] = useLocalStorageValue<string>(LocalStorageKey.SEARCH_INPUT, "")
  const [, setQuery] = useLocalStorageValue<string>(LocalStorageKey.SEARCH_QUERY, "")

  const inputClasses = clsx([
    "pl-10 py-2 w-full bg-black border-2 rounded-full outline-none border-gray focus:border-primary",
    { "font-bold": value }
  ])

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleMovieSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (standalone && value && e.key === "Enter") {
      setQuery(value)
      history.push(RoutePath.SEARCH)
    }
  }

  return (
    <label className="relative flex w-full">
      <RiSearchLine className="absolute h-full my-auto cursor-default left-3" size="20" />
      <input
        name="search"
        placeholder="Search movie..."
        className={inputClasses}
        value={value}
        onChange={handleValueChange}
        onKeyDown={handleMovieSearch}
      />
    </label>
  )
}

export default Searchbar
