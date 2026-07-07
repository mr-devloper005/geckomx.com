'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Info, Mail, Menu, Search, UserPlus, LogIn, LogOut, PlusCircle, UserCircle2, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const navLinks = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'About', href: '/about', icon: Info },
  { label: 'Contact', href: '/contact', icon: Mail },
  { label: 'Search', href: '/search', icon: Search },
]

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const links = [
    ...navLinks,
    ...(session ? [] : [
      { label: 'Sign in', href: '/login', icon: LogIn },
      { label: 'Sign up', href: '/signup', icon: UserPlus },
    ]),
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)] shadow-[0_10px_30px_rgba(8,33,59,0.08)]">
      <nav className="mx-auto flex min-h-[76px] w-full max-w-[var(--editable-container)] items-center gap-5 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3 pr-4">
          <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-md border border-[var(--slot4-accent)]/45 bg-[var(--slot4-surface-bg)] transition group-hover:border-[var(--slot4-accent)]">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-full w-full scale-125 object-contain" />
          </span>
          <span className="hidden min-w-0 md:block">
            <span className="editable-display block max-w-[220px] truncate text-2xl font-extrabold leading-none tracking-[-0.02em]">
              <span className="text-[var(--slot4-accent)]">Gecko</span>MX
            </span>
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          {links.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`))
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-2 rounded-md px-3 py-2 text-sm font-bold transition ${
                  active ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]' : 'text-[var(--slot4-page-text)] hover:bg-[var(--slot4-panel-bg)]'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
          {session ? (
            <>
              <span className="inline-flex max-w-[180px] items-center gap-2 truncate rounded-md border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-3 py-2 text-sm font-bold text-[var(--slot4-page-text)]">
                <UserCircle2 className="h-4 w-4 shrink-0 text-[var(--slot4-accent)]" />
                {session.name || 'Member'}
              </span>
              <Link href="/create" className="inline-flex items-center gap-2 rounded-md bg-[var(--slot4-accent)] px-3 py-2 text-sm font-bold text-white transition hover:brightness-95">
                <PlusCircle className="h-4 w-4" />
                Create
              </Link>
              <button type="button" onClick={logout} className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-bold text-[var(--slot4-page-text)] transition hover:bg-[var(--slot4-panel-bg)]">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="ml-auto rounded-md border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-2 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-4 py-5 lg:hidden">
          <div className="grid gap-1">
            {links.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`))
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 border-l-2 px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] ${
                    active
                      ? 'border-[var(--slot4-accent)] bg-[var(--slot4-surface-bg)] text-[var(--slot4-accent)]'
                      : 'border-transparent text-[var(--slot4-muted-text)] hover:border-[var(--slot4-accent)]/40 hover:bg-[var(--slot4-surface-bg)]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
            {session ? (
              <>
                <div className="flex items-center gap-3 border-l-2 border-transparent px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--slot4-page-text)]">
                  <UserCircle2 className="h-4 w-4 text-[var(--slot4-accent)]" />
                  {session.name || 'Member'}
                </div>
                <Link
                  href="/create"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 border-l-2 border-transparent px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--slot4-muted-text)] hover:border-[var(--slot4-accent)]/40 hover:bg-[var(--slot4-surface-bg)]"
                >
                  <PlusCircle className="h-4 w-4" />
                  Create
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout()
                    setOpen(false)
                  }}
                  className="flex items-center gap-3 border-l-2 border-transparent px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.16em] text-[var(--slot4-muted-text)] hover:border-[var(--slot4-accent)]/40 hover:bg-[var(--slot4-surface-bg)]"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
