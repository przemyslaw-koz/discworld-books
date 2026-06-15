import { db } from '@/db'
import { books as booksTable } from '@/db/schema'
import { asc } from 'drizzle-orm'
import AppShell from '@/components/layout/AppShell'
import LedgerPanel from '@/components/checklist/LedgerPanel'
import ActionBar from '@/components/checklist/ActionBar'

export default function ChecklistPage() {
  const books = db.select().from(booksTable).orderBy(asc(booksTable.sortOrder)).all()

  return (
    <AppShell>
      <div className="flex w-full max-w-[720px] flex-col items-center gap-2">
        <LedgerPanel books={books} />
        <ActionBar />
      </div>
    </AppShell>
  )
}
