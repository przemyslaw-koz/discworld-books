export default function OrnamentalDivider() {
  return (
    <div className="mx-auto my-5 flex w-[75%] items-center select-none">
      <div className="h-px flex-1 bg-[#c8962a]/50" />
      <div className="flex items-center gap-[5px] px-3 leading-none text-[#c8962a]">
        <span className="text-[6px] opacity-60">◆</span>
        <span className="text-[9px] opacity-80">✦</span>
        <span className="text-[13px]">◆</span>
        <span className="text-[9px] opacity-80">✦</span>
        <span className="text-[6px] opacity-60">◆</span>
      </div>
      <div className="h-px flex-1 bg-[#c8962a]/50" />
    </div>
  )
}
