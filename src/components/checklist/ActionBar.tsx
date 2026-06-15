import Button from '@/components/ui/Button'
import { Share2, FileText } from 'lucide-react'

export default function ActionBar() {
  return (
    <div className="flex w-full max-w-[720px] items-center justify-center gap-4">
      <Button label="Share" icon={Share2} variant="slate" />
      <span className="text-xs text-[#c8962a]/50 select-none">◆</span>
      <Button label="Export PDF" icon={FileText} variant="maroon" />
    </div>
  )
}
