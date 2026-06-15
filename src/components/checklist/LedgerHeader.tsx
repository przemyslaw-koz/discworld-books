import IlluminatedInitial from '@/components/ui/IlluminatedInitial'
import OrnamentalDivider from '@/components/ui/OrnamentalDivider'

export default function LedgerHeader() {
  return (
    <header>
      <div className="flex items-start gap-4">
        <IlluminatedInitial letter="T" />

        <h1 className="font-medieval flex-1 text-[1.8rem] leading-snug font-bold text-[#2a1a0a]">
          he Great Discworld
          <br />
          Reading Ledger
        </h1>

        {/* wizard illustration — placeholder until pixel asset is ready */}
        <div className="flex h-20 w-16 shrink-0 items-end justify-center border border-[#c8962a]/50 bg-[#e8d8a0] pb-1 text-[10px] text-[#7a6a4a] select-none">
          [wizard]
        </div>
      </div>

      <OrnamentalDivider />
    </header>
  )
}
