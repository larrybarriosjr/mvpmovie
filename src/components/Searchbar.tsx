import clsx from "clsx"
import { ChangeEvent, useState } from "react"
import { RiSearchLine } from "react-icons/ri"

const Searchbar = () => {
  const [value, setValue] = useState<string>("")

  const inputClasses = clsx([
    "pl-10 py-2 bg-black border-2 rounded-full outline-none border-gray focus:border-primary",
    { "font-bold": value }
  ])

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <label className="relative mx-2 ml-auto mr-4 lg:mr-16">
      <RiSearchLine className="absolute h-full my-auto left-3" size="20" />
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
