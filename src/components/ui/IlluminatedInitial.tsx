export default function IlluminatedInitial({ letter }: { letter: string }) {
  return (
    <div className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden border-2 border-[#c8962a] bg-[#1a1200]">
      <div className="absolute inset-1 border border-[#c8962a]/40" />
      <span className="relative z-10 font-serif text-5xl leading-none font-bold text-[#c8962a] select-none">
        {letter}
      </span>
    </div>
  )
}
