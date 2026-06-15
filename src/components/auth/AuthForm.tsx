'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

interface AuthFormProps {
  mode: 'login' | 'register'
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  function validate(): string | null {
    if (!email.trim()) return 'Email is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email address.'
    if (!password) return 'Password is required.'
    if (password.length < 8) return 'Password must be at least 8 characters.'
    if (mode === 'register' && !name.trim()) return 'Name is required.'
    return null
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setPending(true)
    try {
      if (mode === 'login') {
        const { error: authError } = await authClient.signIn.email({
          email,
          password,
          callbackURL: '/checklist',
        })
        if (authError) {
          setError(authError.message ?? 'Invalid credentials.')
          return
        }
      } else {
        const { error: authError } = await authClient.signUp.email({
          email,
          password,
          name,
          callbackURL: '/checklist',
        })
        if (authError) {
          setError(authError.message ?? 'Registration failed.')
          return
        }
      }
      router.push('/checklist')
    } finally {
      setPending(false)
    }
  }

  const isLogin = mode === 'login'

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {!isLogin && (
        <Field
          id="name"
          label="Thy Name"
          type="text"
          value={name}
          onChange={setName}
          placeholder="e.g. Rincewind"
          autoComplete="name"
        />
      )}
      <Field
        id="email"
        label="Scroll Address (Email)"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="wizard@unseen.edu"
        autoComplete={isLogin ? 'email' : 'email'}
      />
      <Field
        id="password"
        label="Secret Incantation (Password)"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder={isLogin ? '••••••••' : 'At least 8 characters'}
        autoComplete={isLogin ? 'current-password' : 'new-password'}
      />

      {error && (
        <p
          role="alert"
          className="font-medieval border border-[#8b3a3a] bg-[#f0d8c8] px-3 py-2 text-sm text-[#6b2020]"
        >
          ⚠ {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="font-medieval mt-1 border-2 border-[#2a1a0a] bg-[#c8962a] px-6 py-2.5 text-base font-semibold tracking-wide text-[#1a0f00] shadow-[2px_2px_0_#2a1a0a] transition-all hover:bg-[#d4a840] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? '⏳ One moment…' : isLogin ? '⚔ Enter the Ledger' : '📜 Register Your Name'}
      </button>
    </form>
  )
}

interface FieldProps {
  id: string
  label: string
  type: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  autoComplete: string
}

function Field({ id, label, type, value, onChange, placeholder, autoComplete }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-medieval text-sm font-semibold tracking-wide text-[#5a3a10]"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="border-2 border-[#b89040] bg-[#fdf5dc] px-3 py-2 text-sm text-[#2a1a0a] placeholder-[#b89040]/60 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1)] outline-none focus:border-[#8b6a20] focus:ring-1 focus:ring-[#8b6a20]"
      />
    </div>
  )
}
