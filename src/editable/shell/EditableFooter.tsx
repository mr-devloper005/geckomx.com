'use client'

import Link from 'next/link'
import { Home, Info, Mail, Search, UserPlus, LogIn, LogOut } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const footerLinks = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'About', href: '/about', icon: Info },
  { label: 'Contact', href: '/contact', icon: Mail },
  { label: 'Search', href: '/search', icon: Search },
]

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()
  const links = [
    ...footerLinks,
    ...(session ? [] : [
      { label: 'Sign up', href: '/signup', icon: UserPlus },
      { label: 'Sign in', href: '/login', icon: LogIn },
    ]),
  ]

  return (
    <footer className="bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <section className="bg-[var(--slot4-dark-bg)] text-white">
        <div className="mx-auto max-w-[var(--editable-container)] px-4 py-12 text-center sm:px-6 lg:px-8">
          <h2 className="editable-display text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
            GeckoMX business discovery and practical insight
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/82 sm:text-base">
            Explore useful insights, verified details, helpful resources, and fresh opportunities in one polished hub.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1.4fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-md border border-[var(--slot4-accent)]/40 bg-[var(--slot4-surface-bg)]">
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-full w-full scale-125 object-contain" />
            </span>
            <span className="editable-display text-xl font-extrabold tracking-[-0.02em]">
              <span className="text-[var(--slot4-accent)]">Gecko</span>MX
            </span>
          </Link>
        </div>

        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--slot4-accent)]">Links</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {links.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href} className="inline-flex items-center gap-2 text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">
                  <Icon className="h-4 w-4 text-[var(--slot4-accent)]" /> {item.label}
                </Link>
              )
            })}
            {session ? (
              <button type="button" onClick={logout} className="inline-flex items-center gap-2 text-left text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">
                <LogOut className="h-4 w-4 text-[var(--slot4-accent)]" /> Logout
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--editable-border)] px-4 py-5 text-center text-xs font-medium tracking-[0.12em] text-[var(--slot4-muted-text)]">
        © {year} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}
