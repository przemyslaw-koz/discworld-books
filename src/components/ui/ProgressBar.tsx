import { calculateProgress } from '@/lib/checklist'

interface ProgressBarProps {
  value: number
  max: number
}

export default function ProgressBar({ value, max }: ProgressBarProps) {
  const pct = calculateProgress(value, max)
  return (
    <div className="h-2.5 w-full bg-[#8a7a4a]">
      <div className="h-full bg-[#4a8a2a]" style={{ width: `${pct}%` }} />
    </div>
  )
}
