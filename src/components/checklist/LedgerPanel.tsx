'use client'

import { useState, useEffect } from 'react'
import type { Book } from '@/db/schema'
import { toggleSetItem } from '@/lib/checklist'
import LedgerHeader from './LedgerHeader'
import BookList from './BookList'
import ProgressBlock from './ProgressBlock'

const STORAGE_KEY = 'discworld-checked-ids'

interface LedgerPanelProps {
  books: Book[]
}

export default function LedgerPanel({ books }: LedgerPanelProps) {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set())
  const [hydrated, setHydrated] = useState(false)
  const [collapsedSeries, setCollapsedSeries] = useState<Set<string>>(new Set())

  function toggleSeries(series: string) {
    setCollapsedSeries((prev) => toggleSetItem(prev, series))
  }

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setCheckedIds(new Set(JSON.parse(stored) as string[]))
    } catch {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...checkedIds]))
  }, [checkedIds, hydrated])

  function toggle(id: string) {
    setCheckedIds((prev) => toggleSetItem(prev, id))
  }

  return (
    <div className="w-full max-w-[720px] shadow-[0_10px_48px_rgba(0,0,0,0.9),0_3px_12px_rgba(0,0,0,0.65)]">
      {/* Outer dark frame */}
      <div className="parchment border-[5px] border-[#2a1a0a]">
        {/* Inner ornamental border */}
        <div className="relative m-3 min-h-[600px] border border-[#c8962a] p-10 shadow-[inset_0_2px_10px_rgba(0,0,0,0.07)]">
          {/* Corner ornaments */}
          <span className="absolute top-0.5 left-0.5 text-xs leading-none text-[#c8962a] select-none">
            ◆
          </span>
          <span className="absolute top-0.5 right-0.5 text-xs leading-none text-[#c8962a] select-none">
            ◆
          </span>
          <span className="absolute bottom-0.5 left-0.5 text-xs leading-none text-[#c8962a] select-none">
            ◆
          </span>
          <span className="absolute right-0.5 bottom-0.5 text-xs leading-none text-[#c8962a] select-none">
            ◆
          </span>

          <LedgerHeader />
          <BookList
            books={books}
            checkedIds={checkedIds}
            onToggle={toggle}
            collapsedSeries={collapsedSeries}
            onToggleSeries={toggleSeries}
          />
          <ProgressBlock checked={checkedIds.size} total={books.length} />
        </div>
      </div>
    </div>
  )
}
