import { MAX_ITEMS, PAGE_SIZE } from "constants/default"
import { RoutePath } from "constants/enum"
import { IMAGE_URL } from "constants/env"
import { useGetImageUrls } from "hooks/api"
import Pagination from "rc-pagination"
import EnUsLocale from "rc-pagination/lib/locale/en_US"
import { RiArrowLeftSFill, RiArrowRightSFill, RiMoreFill } from "react-icons/ri"
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti"
import { Link } from "react-router-dom"
import { MovieType } from "types/movies"

type SectionProps = {
  title: string
  url: RoutePath
  items: MovieType[]
  quantity?: number
  favorites: MovieType[]
  toggleFavorites: (movie: MovieType) => void
  currentPage?: number
  totalItems?: number
  onPageChange?: (page: number, pageSize: number) => void
}

const Section = ({
  title,
  url,
  items,
  quantity,
  favorites,
  toggleFavorites,
  currentPage,
  totalItems,
  onPageChange
}: SectionProps) => {
  const imageUrls = useGetImageUrls(items)

  const movieUrl = (movie: MovieType) => {
    return imageUrls.filter(item => item.id === movie.ids.tmdb)[0]
  }

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
            .filter((movie: MovieType) => movie.ids.tmdb === movieUrl(movie)?.id)
            .map((movie: MovieType) => (
              <li key={movie.ids.trakt} className="flex flex-col gap-2">
                <div className="relative p-1 overflow-hidden hover:ring-4 hover:ring-primary h-96">
                  <input
                    type="image"
                    src={IMAGE_URL + movieUrl(movie).url}
                    alt={movie.title}
                    className="object-cover h-full border border-white border-solid cursor-pointer w-60"
                    onClick={() => toggleFavorites(movie)}
                  />
                  <button
                    type="button"
                    className="absolute rounded-full right-2 bottom-2 bg-gray"
                    onClick={() => toggleFavorites(movie)}
                  >
                    {favorites.find(fave => fave.ids.trakt === movie.ids.trakt) ? (
                      <TiStarFullOutline size="36" className="text-primary" />
                    ) : (
                      <TiStarOutline size="36" />
                    )}
                  </button>
                </div>
                <div>
                  <Link to="" className="font-bold hover:text-primary">
                    {movie.title}
                  </Link>
                  <p className="font-thin">{movie.year}</p>
                </div>
              </li>
            ))}
        </ul>
      ) : url === RoutePath.FAVORITES ? (
        <div className="mt-8 mb-16 text-lg text-center">
          <p>You haven&apos;t added your favorite movies yet.</p>
          <p>Click on one of the movie posters to add one.</p>
        </div>
      ) : null}
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
