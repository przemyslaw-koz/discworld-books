import SidebarNav from './SidebarNav'

export default function Sidebar() {
  return (
    <aside className="flex w-36 shrink-0 flex-col items-center border-r border-[#3a2e1a] bg-[#1e1a14] py-4">
      <div className="mb-3 w-full px-3">
        <div className="flex h-24 items-center justify-center border border-[#3a2e1a] bg-[#2a2418] text-xs text-[#7a6a4a]">
          [turtle illustration]
        </div>
      </div>

      <p className="font-medieval mb-4 px-3 text-center text-[11px] leading-snug tracking-wide text-[#d4b87a]">
        Discworld
        <br />
        Reading Checklist
      </p>

      <SidebarNav />

      <div className="flex-1" />

      <div className="mt-3 w-full px-3">
        <div className="flex h-24 items-center justify-center border border-[#3a2e1a] bg-[#2a2418] text-xs text-[#7a6a4a]">
          [city illustration]
        </div>
      </div>
    </aside>
  )
}
