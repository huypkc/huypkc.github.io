import type { Metadata } from "next"
import Link from "next/link"
import PageHeader from "@/components/PageHeader"

/**
 * Next's built-in 404 inherits the root canonical, which points every missing
 * URL at the homepage, and ships a second <title> and a conflicting robots
 * tag. Overriding it here removes the canonical entirely and marks the page
 * noindex, which is what a non-content page should say.
 */
export const metadata: Metadata = {
  title: "Page not found",
  description: "This URL does not exist on huypkc.github.io.",
  alternates: { canonical: null },
  robots: { index: false, follow: true },
  openGraph: undefined,
  twitter: undefined,
}

const ELSEWHERE = [
  { href: "/projects", label: "Work", note: "case studies" },
  { href: "/evidence", label: "Evidence", note: "every claim and its artifact" },
  { href: "/timeline", label: "Timeline", note: "what was built, in order" },
  { href: "/contact", label: "Contact", note: "availability and links" },
]

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHeader
        label="404"
        title="Page not found"
        lede="This URL does not exist. It may have been a link that was never published, or one that has since moved."
      />

      <nav aria-label="Elsewhere on this site">
        <ul className="grid gap-3 sm:grid-cols-2">
          {ELSEWHERE.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-baseline justify-between gap-4 rounded-sm border border-line bg-card p-4 transition-colors hover:border-fg"
              >
                <span className="text-[14px] text-fg">{item.label}</span>
                <span className="font-mono text-[11px] text-dim">
                  {item.note}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
