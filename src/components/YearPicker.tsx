import clsx from "clsx"
import dayjs from "dayjs"
import { useYear } from "hooks/localStorage"
import { useEffect } from "react"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const YearPicker = () => {
  const [year, setYear] = useYear()

  const inputClasses = clsx([
    "w-full p-2 text-center bg-black border-2 rounded-full outline-none border-gray focus:border-primary",
    { "font-bold": year }
  ])

  useEffect(() => {
    if (!year) setYear("")
  }, [year, setYear])

  const handleYearChange = (date: Date | null) => {
    setYear(date ? dayjs(date).format("YYYY") : "")
  }

  return (
    <div>
      <ReactDatePicker
        className={inputClasses}
        wrapperClassName="w-40"
        calendarClassName="w-40"
        selected={year ? new Date(year) : null}
        placeholderText="Select year"
        onChange={handleYearChange}
        dateFormat="yyyy"
        maxDate={new Date()}
        yearItemNumber={8}
        showYearPicker
      />
    </div>
  )
}

export default YearPicker
