import clsx from "clsx"
import { MovieSort } from "constants/enum"
import { sortItems } from "constants/items"
import { ChangeEvent, useState } from "react"

const SortButtonGroup = () => {
  const [sortBy, setSortBy] = useState<MovieSort>(MovieSort.AZ)

  const sortClasses = (sort: MovieSort) =>
    clsx([
      "px-4 py-2 font-bold rounded-full border-black border-2 hover:border-primary",
      { "text-black bg-primary": sort === sortBy }
    ])

  const handleMovieSort = (e: ChangeEvent<HTMLInputElement>) => {
    setSortBy(e.target.value as MovieSort)
  }

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
