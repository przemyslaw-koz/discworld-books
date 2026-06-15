interface SpriteProps {
  src: string
  /** Sprite width in source pixels */
  width: number
  /** Sprite height in source pixels */
  height: number
  /** Sprite X offset within the source image (source pixels, default 0) */
  x?: number
  /** Sprite Y offset within the source image (source pixels, default 0) */
  y?: number
  /** Full sheet width in source pixels — omit if src is an individual file */
  sheetWidth?: number
  /** Full sheet height in source pixels — omit if src is an individual file */
  sheetHeight?: number
  /** Integer display scale multiplier (default 1) */
  scale?: number
  className?: string
}

/**
 * Renders a single sprite using CSS background-image crop technique.
 * Works with individual files (x=0, y=0) or sprite sheets (with x/y offsets).
 */
export default function Sprite({
  src,
  width,
  height,
  x = 0,
  y = 0,
  sheetWidth,
  sheetHeight,
  scale = 1,
  className,
}: SpriteProps) {
  const displayW = width * scale
  const displayH = height * scale
  const bgW = (sheetWidth ?? width) * scale
  const bgH = (sheetHeight ?? height) * scale

  return (
    <div
      className={className}
      style={{
        width: displayW,
        height: displayH,
        backgroundImage: `url('${src}')`,
        backgroundSize: `${bgW}px ${bgH}px`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `${-x * scale}px ${-y * scale}px`,
        imageRendering: 'pixelated',
        flexShrink: 0,
      }}
    />
  )
}
