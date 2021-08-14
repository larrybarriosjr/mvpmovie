import Loading from "components/Loading"
import Section from "components/Section"
import { RoutePath } from "constants/enum"
import { MovieType } from "types/movies"

type ListPageProps = {
  title: string
  url: RoutePath
  items?: MovieType[]
  currentPage: number
  totalItems: number
  onPageChange: (page: number) => void
  emptyText: string
  loading: boolean
}

const ListPage = ({
  title,
  url,
  items,
  currentPage,
  totalItems,
  onPageChange,
  emptyText,
  loading
}: ListPageProps) => {
  if (!items || loading) return <Loading />

  return (
    <Section
      title={title}
      url={url}
      items={items}
      currentPage={currentPage}
      totalItems={totalItems}
      onPageChange={onPageChange}
      emptyText={emptyText}
    />
  )
}

export default ListPage
