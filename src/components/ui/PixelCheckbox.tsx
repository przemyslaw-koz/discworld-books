const ASSETS = {
  on: '/assets/ui-pack/Individual files/3x/Checkboxes/Checkbox_01A_On.png',
  off: '/assets/ui-pack/Individual files/3x/Checkboxes/Checkbox_01A_Off.png',
} as const

export default function PixelCheckbox({ checked }: { checked: boolean }) {
  return (
    <img
      src={checked ? ASSETS.on : ASSETS.off}
      alt={checked ? 'Checked' : 'Unchecked'}
      width={48}
      height={48}
      className="shrink-0 select-none"
      style={{ imageRendering: 'pixelated' }}
    />
  )
}
