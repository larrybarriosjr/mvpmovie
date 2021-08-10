import clsx from "clsx"
import { ChangeEvent, useState } from "react"

const Searchbar = () => {
  const [value, setValue] = useState<string>("")

  const inputClasses = clsx([
    "px-4 py-2 text-white bg-black border-2 rounded-full outline-none border-gray focus:border-primary",
    { "font-bold": value }
  ])

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <label className="mx-2 ml-auto mr-4 lg:mr-16">
      <input
        name="search"
        placeholder="Search movie..."
        className={inputClasses}
        value={value}
        onChange={handleValueChange}
      />
    </label>
  )
}

export default Searchbar
