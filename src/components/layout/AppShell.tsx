import TopNav from './TopNav'
import Sidebar from './Sidebar'

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col [background-color:#161410] [background-image:radial-gradient(ellipse_at_30%_40%,rgba(50,35,10,0.45)_0%,transparent_55%),radial-gradient(ellipse_at_75%_65%,rgba(28,18,4,0.4)_0%,transparent_50%)]">
      <TopNav />
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex flex-1 items-start justify-center overflow-y-auto [background-image:radial-gradient(ellipse_at_50%_30%,rgba(40,28,8,0.3)_0%,transparent_65%)] p-10">
          {children}
        </main>
      </div>
    </div>
  )
}
