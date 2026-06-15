interface ProgressBarProps {
  value: number
  max: number
}

export default function ProgressBar({ value, max }: ProgressBarProps) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0
  return (
    <div className="h-2.5 w-full bg-[#8a7a4a]">
      <div className="h-full bg-[#4a8a2a]" style={{ width: `${pct}%` }} />
    </div>
  )
}
