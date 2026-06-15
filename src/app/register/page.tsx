import Link from 'next/link'
import AuthForm from '@/components/auth/AuthForm'

export const metadata = {
  title: 'Register — Discworld Ledger',
}

export default function RegisterPage() {
  return (
    <AuthPageShell title="hy Name in the Ledger" subtitle="Create thy account to begin tracking">
      <AuthForm mode="register" />
      <p className="font-medieval mt-4 text-center text-sm text-[#7a5a20]">
        Already registered?{' '}
        <Link href="/login" className="font-semibold text-[#5a3a10] underline hover:text-[#8b6a20]">
          Sign in here
        </Link>
      </p>
    </AuthPageShell>
  )
}

function AuthPageShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen items-center justify-center [background-color:#161410] [background-image:radial-gradient(ellipse_at_30%_40%,rgba(50,35,10,0.45)_0%,transparent_55%),radial-gradient(ellipse_at_75%_65%,rgba(28,18,4,0.4)_0%,transparent_50%)] p-4">
      <div className="w-full max-w-md shadow-[0_10px_48px_rgba(0,0,0,0.9),0_3px_12px_rgba(0,0,0,0.65)]">
        <div className="parchment border-[5px] border-[#2a1a0a]">
          <div className="relative m-3 border border-[#c8962a] p-8 shadow-[inset_0_2px_10px_rgba(0,0,0,0.07)]">
            <span className="absolute top-0.5 left-0.5 text-xs leading-none text-[#c8962a] select-none">
              ◆
            </span>
            <span className="absolute top-0.5 right-0.5 text-xs leading-none text-[#c8962a] select-none">
              ◆
            </span>
            <span className="absolute bottom-0.5 left-0.5 text-xs leading-none text-[#c8962a] select-none">
              ◆
            </span>
            <span className="absolute right-0.5 bottom-0.5 text-xs leading-none text-[#c8962a] select-none">
              ◆
            </span>

            <header className="mb-6 text-center">
              <p className="font-medieval text-xs tracking-widest text-[#8b6a20] uppercase">
                Discworld Reading Ledger
              </p>
              <h1 className="font-medieval mt-1 text-2xl font-bold text-[#2a1a0a]">T{title}</h1>
              <p className="mt-1 text-sm text-[#7a5a20]">{subtitle}</p>
              <div className="mx-auto mt-3 h-px w-3/4 bg-gradient-to-r from-transparent via-[#c8962a] to-transparent" />
            </header>

            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
