import ProgressBar from '@/components/ui/ProgressBar'

interface ProgressBlockProps {
  checked: number
  total: number
}

export default function ProgressBlock({ checked, total }: ProgressBlockProps) {
  return (
    <div className="flex items-center gap-2 border-t-2 border-[#c8962a]/60 bg-gradient-to-b from-[#d4a84020] to-transparent py-5">
      {/* Left illustration — turtle/world placeholder */}
      <div className="flex h-16 w-16 shrink-0 items-end justify-center border-2 border-[#c8962a]/50 bg-[#e4d090] pb-1 text-[9px] text-[#7a6a4a] shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] select-none">
        [turtle]
      </div>

      <span className="shrink-0 text-xs text-[#c8962a]/70 select-none">◆</span>

      {/* Center: label · counter · bar */}
      <div className="flex flex-1 flex-col items-center gap-1.5">
        <span className="font-medieval text-[11px] tracking-[0.35em] text-[#8a7248] uppercase select-none">
          Progress
        </span>
        <span className="font-medieval text-[2rem] leading-none font-bold text-[#3a7820]">
          {checked} / {total}
        </span>
        <ProgressBar value={checked} max={total} />
      </div>

      <span className="shrink-0 text-xs text-[#c8962a]/70 select-none">◆</span>

      {/* Right illustration — elephants/world placeholder */}
      <div className="flex h-16 w-16 shrink-0 items-end justify-center border-2 border-[#c8962a]/50 bg-[#e4d090] pb-1 text-[9px] text-[#7a6a4a] shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] select-none">
        [elephants]
      </div>
    </div>
  )
}
