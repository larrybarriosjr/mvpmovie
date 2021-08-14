import { useLocalStorageValue } from "@react-hookz/web"
import { LocalStorageKey } from "constants/enum"
import { useGetGenres } from "hooks/api"
import { useEffect } from "react"
import Select from "react-select"
import { ReactSelectOnChangeType, ReactSelectStyleType } from "types/lib"

const GenreDropdown = () => {
  const { data: genres, refetch: fetchGenres } = useGetGenres()

  const [, setGenre] = useLocalStorageValue<string>(LocalStorageKey.GENRE, "")

  const dropdownStyles: ReactSelectStyleType = {
    control: (base, state) => ({
      ...base,
      color: "var(--white)",
      width: "240px",
      background: "var(--black)",
      borderWidth: "2px",
      borderRadius: "9999px",
      borderColor: "var(--gray)",
      paddingTop: "0.15rem",
      paddingBottom: "0.15em",
      border: state.isFocused ? "2px solid var(--primary)" : "",
      boxShadow: "none",
      whiteSpace: "nowrap",
      ":hover": {
        borderColor: "var(--primary)"
      }
    }),
    menu: base => ({
      ...base,
      background: "var(--black)",
      border: "2px solid var(--primary)",
      borderRadius: "5px"
    }),
    option: (base, state) => ({
      ...base,
      color: state.isFocused ? "var(--black)" : "",
      background: state.isFocused ? "var(--primary)" : "",
      fontWeight: state.isFocused ? "bold" : "normal"
    }),
    singleValue: base => ({
      ...base,
      color: "var(--white)",
      fontWeight: "bold"
    })
  }

  const handleValueChange: ReactSelectOnChangeType = (value, action) => {
    if (value) setGenre(value.value)
    if (action.action === "clear") setGenre("")
  }

  useEffect(() => {
    if (!genres) fetchGenres()
  }, [genres, fetchGenres])

  return (
    <Select
      placeholder="Select genre"
      options={genres?.data.map(item => ({ value: item.slug, label: item.name }))}
      styles={dropdownStyles}
      isSearchable={false}
      onChange={handleValueChange}
      isClearable
    />
  )
}

export default GenreDropdown
