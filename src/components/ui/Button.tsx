import { type LucideIcon } from 'lucide-react'

interface ButtonProps {
  label: string
  icon: LucideIcon
  variant: 'slate' | 'maroon'
}

const ASSETS = {
  slate: '/assets/ui-pack/Individual files/3x/Buttons/Button_05A_Normal.png',
  maroon: '/assets/ui-pack/Individual files/3x/Buttons/Button_06A_Normal.png',
} as const

export default function Button({ label, icon: Icon, variant }: ButtonProps) {
  return (
    <button
      type="button"
      style={{
        backgroundImage: `url('${ASSETS[variant]}')`,
        backgroundSize: '100% 100%',
        imageRendering: 'pixelated',
      }}
      className="font-medieval flex cursor-default items-center gap-3 border-0 px-10 py-3 text-[15px] text-[#e8d898] shadow-[0_4px_14px_rgba(0,0,0,0.65)]"
    >
      <Icon size={18} className="shrink-0" />
      {label}
    </button>
  )
}
