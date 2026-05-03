import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TablePaginationProps {
  page: number
  totalPages: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
}

export function TablePagination({ page, totalPages, totalItems, pageSize, onPageChange }: TablePaginationProps) {
  if (totalPages <= 1) return null
  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, totalItems)

  return (
    <div className="flex items-center justify-between border-t px-4 py-3">
      <p className="text-xs text-muted-foreground">
        Showing {from}–{to} of {totalItems}
      </p>
      <div className="flex items-center gap-1.5">
        <Button variant="outline" size="icon" className="size-7"
          disabled={page === 1} onClick={() => onPageChange(page - 1)}>
          <ChevronLeft className="size-3.5" />
        </Button>
        <span className="px-2 text-xs font-medium">{page} / {totalPages}</span>
        <Button variant="outline" size="icon" className="size-7"
          disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
          <ChevronRight className="size-3.5" />
        </Button>
      </div>
    </div>
  )
}
