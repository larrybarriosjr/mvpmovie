import { useLocalStorageValue } from "@react-hookz/web"
import clsx from "clsx"
import { LocalStorageKey, MovieSort } from "constants/enum"
import { sortItems } from "constants/items"
import { ChangeEvent, useEffect } from "react"

const SortButtonGroup = () => {
  const [sortBy, setSortBy] = useLocalStorageValue<MovieSort>(LocalStorageKey.SORT_BY, MovieSort.LATEST)

  const sortClasses = (sort: MovieSort) =>
    clsx([
      "px-4 py-2 font-bold rounded-full border-black border-2 hover:border-primary",
      { "text-black bg-primary": sort === sortBy }
    ])

  const handleMovieSort = (e: ChangeEvent<HTMLInputElement>) => {
    setSortBy(e.target.value as MovieSort)
  }

  useEffect(() => {
    if (!sortBy) setSortBy(MovieSort.LATEST)
  }, [sortBy, setSortBy])

  return (
    <div className="flex items-center gap-x-4">
      <p>Sort By:</p>
      {sortItems.map((item, idx) => (
        <label key={idx} className={sortClasses(item.value)}>
          {item.label}
          <input
            name="movie_sort"
            type="radio"
            value={item.value}
            onChange={handleMovieSort}
            checked={sortBy === item.value}
            hidden
          />
        </label>
      ))}
    </div>
  )
}

export default SortButtonGroup
