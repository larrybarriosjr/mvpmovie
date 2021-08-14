import Section from "components/Section"
import { PAGE_SIZE } from "constants/default"
import { RoutePath } from "constants/enum"
import { useLocation } from "react-router-dom"
import { MovieType } from "types/movies"

type ListPageProps = {
  title: string
  url: RoutePath
  items: MovieType[]
  currentPage: number
  totalItems: number
  onPageChange: (page: number) => void
  emptyText: string
}

const ListPage = ({
  title,
  url,
  items,
  currentPage,
  totalItems,
  onPageChange,
  emptyText
}: ListPageProps) => {
  const location = useLocation()
  const fullItems = items.slice(currentPage * PAGE_SIZE - PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <Section
      title={title}
      url={url}
      items={location.pathname === RoutePath.FAVORITES ? fullItems : items}
      currentPage={currentPage}
      totalItems={totalItems}
      onPageChange={onPageChange}
      emptyText={emptyText}
    />
  )
}

export default ListPage
