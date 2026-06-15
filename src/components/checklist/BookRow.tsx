import PixelCheckbox from '@/components/ui/PixelCheckbox'

interface BookRowProps {
  index: number
  title: string
  year: number
  checked: boolean
  onToggle: () => void
}

export default function BookRow({ index, title, year, checked, onToggle }: BookRowProps) {
  return (
    <div
      className="flex cursor-pointer items-center gap-3 border-b border-[#c8962a]/25 py-2.5 last:border-b-0"
      onClick={onToggle}
    >
      <PixelCheckbox checked={checked} />

      <span className="font-medieval w-6 shrink-0 text-base text-[#8a7248]">{index}.</span>

      <span className="font-medieval flex-1 text-[16px] leading-tight text-[#2a1a0a]">{title}</span>

      <span className="font-medieval shrink-0 text-[15px] text-[#8a7248]">{year}</span>
    </div>
  )
}
