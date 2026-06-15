import type { Book } from '@/db/schema'
import { groupBooksByCycle } from '@/lib/checklist'
import BookRow from './BookRow'

interface BookListProps {
  books: Book[]
  checkedIds: Set<string>
  onToggle: (id: string) => void
  collapsedSeries: Set<string>
  onToggleSeries: (series: string) => void
}

export default function BookList({
  books,
  checkedIds,
  onToggle,
  collapsedSeries,
  onToggleSeries,
}: BookListProps) {
  const { seriesOrder, grouped } = groupBooksByCycle(books)

  return (
    <div className="mt-2 mb-4">
      {seriesOrder.map((series) => {
        const isCollapsed = collapsedSeries.has(series)
        const seriesBooks = grouped[series]
        return (
          <div key={series}>
            <div
              className="mt-4 mb-1 flex cursor-pointer items-center gap-2 select-none"
              onClick={() => onToggleSeries(series)}
            >
              <span className="w-2 shrink-0 text-[9px] text-[#8a6a30]/70">
                {isCollapsed ? '▶' : '▼'}
              </span>
              <span className="font-medieval text-[14px] tracking-[0.2em] whitespace-nowrap text-[#8a6a30] uppercase">
                {series} ({seriesBooks.length})
              </span>
              <div className="h-px flex-1 bg-[#c8962a]/30" />
            </div>
            {!isCollapsed &&
              seriesBooks.map((book, i) => (
                <BookRow
                  key={book.id}
                  index={i + 1}
                  title={book.title}
                  year={book.publishedYear}
                  checked={checkedIds.has(book.id)}
                  onToggle={() => onToggle(book.id)}
                />
              ))}
          </div>
        )
      })}
    </div>
  )
}
