"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
  { href: "/projects", label: "Work" },
  { href: "/evidence", label: "Evidence" },
  { href: "/timeline", label: "Timeline" },
  { href: "/contact", label: "Contact" },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="shrink-0 font-serif text-[15px] tracking-tight text-fg"
        >
          Huy Tran
        </Link>
        <nav
          aria-label="Primary"
          className="-mr-1 flex items-center gap-5 overflow-x-auto sm:gap-7"
        >
          {items.map((item) => {
            // /projects stays lit while you are inside a case study.
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap text-[13px] font-medium tracking-wide transition-colors ${
                  active ? "text-fg" : "text-muted-fg hover:text-fg"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
