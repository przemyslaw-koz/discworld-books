export default function TopNav() {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-[#3a2e1a] bg-[#0f0f0f] px-4">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#3a2e1a] bg-[#2a2418] text-xs text-[#7a6a4a]">
          [logo]
        </div>
        <span className="font-medieval text-sm font-semibold tracking-wider text-[#d4b87a]">
          Discworld Ledger
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="text-right">
          <p className="text-xs leading-none text-[#d4b87a]">Rincewind</p>
          <p className="mt-0.5 text-xs leading-none text-[#7a6a4a]">Not a wizard</p>
        </div>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#3a2e1a] bg-[#2a2418] text-xs text-[#7a6a4a]">
          [avatar]
        </div>
      </div>
    </header>
  )
}
