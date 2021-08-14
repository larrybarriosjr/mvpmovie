import { MAX_ITEMS, PAGE_SIZE } from "constants/default"
import { RoutePath } from "constants/enum"
import { useGetImageUrls } from "hooks/api"
import { getMovieUrl } from "hooks/app"
import Pagination from "rc-pagination"
import EnUsLocale from "rc-pagination/lib/locale/en_US"
import { RiArrowLeftSFill, RiArrowRightSFill, RiMoreFill } from "react-icons/ri"
import { Link } from "react-router-dom"
import { MovieType } from "types/movies"
import MovieItem from "./MovieItem"

type SectionProps = {
  title: string
  url: RoutePath
  items: MovieType[]
  quantity?: number
  currentPage?: number
  totalItems?: number
  onPageChange?: (page: number, pageSize: number) => void
  emptyText: string
}

const Section = ({
  title,
  url,
  items,
  quantity,
  currentPage,
  totalItems,
  onPageChange,
  emptyText
}: SectionProps) => {
  const imageUrls = useGetImageUrls(items)

  return (
    <section className="my-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        {quantity && items.length ? (
          <Link to={url} className="text-sm border-b hover:text-primary">
            View All
          </Link>
        ) : null}
      </div>

      {items.length ? (
        <ul className="grid grid-cols-2 my-4 text-center md:grid-cols-4 justify-items-center gap-y-6">
          {items
            .slice(0, quantity)
            .filter((movie: MovieType) => movie.ids.tmdb === getMovieUrl(imageUrls, movie)?.id)
            .map((movie: MovieType) => (
              <MovieItem key={movie.ids.trakt} urls={imageUrls} movie={movie} />
            ))}
        </ul>
      ) : (
        <p className="mx-auto my-16 text-lg text-center text-white w-96">{emptyText}</p>
      )}

      {currentPage && totalItems && onPageChange ? (
        <Pagination
          className="flex items-center justify-center my-4 text-lg gap-x-4"
          current={currentPage}
          pageSize={PAGE_SIZE}
          total={Math.min(MAX_ITEMS, totalItems)}
          prevIcon={<RiArrowLeftSFill className="cursor-pointer" size="24" />}
          nextIcon={<RiArrowRightSFill className="cursor-pointer" size="24" />}
          jumpNextIcon={<RiMoreFill />}
          jumpPrevIcon={<RiMoreFill />}
          locale={EnUsLocale}
          onChange={onPageChange}
          hideOnSinglePage
        />
      ) : null}
    </section>
  )
}

export default Section
