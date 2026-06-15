import { BookOpen, BarChart2, Share2, FileText, Info } from 'lucide-react'

const links = [
  { icon: BookOpen, label: 'My Ledger', href: '/checklist' },
  { icon: BarChart2, label: 'Statistics', href: '#' },
  { icon: Share2, label: 'Share', href: '#' },
  { icon: FileText, label: 'Export PDF', href: '#' },
  { icon: Info, label: 'About Discworld', href: '#' },
]

export default function SidebarNav() {
  return (
    <nav className="flex w-full flex-col gap-1 px-2">
      {links.map(({ icon: Icon, label, href }) => (
        <a
          key={label}
          href={href}
          className="font-medieval flex items-center gap-3 border-l-2 border-transparent px-3 py-2 text-[13px] tracking-wide text-[#c8aa6a] transition-colors hover:border-[#c8962a] hover:bg-[#2a2418] hover:text-[#e8d090]"
        >
          <Icon size={16} className="shrink-0 text-[#c8962a]" />
          {label}
        </a>
      ))}
    </nav>
  )
}
