import { type FC, useMemo } from "react"
import type { Pageable } from "~/server/schema"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination"

type Props = {
  pageable: Pageable
  totalPages: number
  setPageable: (pageable: Pageable) => void
}

const ListPagination: FC<Props> = ({ pageable, totalPages, setPageable }) => {
  const currentPage = useMemo(() => {
    return pageable.page + 1
  }, [pageable])
  const items = []
  const maxVisiblePages = 3

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= Math.max(1, currentPage - 1) && i <= Math.min(totalPages, currentPage + 1)) || totalPages <= maxVisiblePages) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={i === currentPage}
            onClick={(e) => {
              e.preventDefault()
              setPageable({ ...pageable, page: i - 1 })
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    } else if ((i === currentPage - 2 && currentPage > 3) || (i === currentPage + 2 && currentPage < totalPages - 2)) {
      items.push(
        <PaginationItem key={i}>
          <PaginationEllipsis />
        </PaginationItem>
      )
    }
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {currentPage > 1 ? (
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setPageable({ ...pageable, page: currentPage - 2 })
              }}
            />
          ) : (
            <PaginationPrevious href="#" className="pointer-events-none opacity-50" />
          )}
        </PaginationItem>
        {items}
        <PaginationItem>
          {currentPage < totalPages ? (
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setPageable({ ...pageable, page: currentPage })
              }}
            />
          ) : (
            <PaginationNext href="#" className="pointer-events-none opacity-50" />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default ListPagination
