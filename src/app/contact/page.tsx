import type { Metadata } from "next"
import Link from "next/link"
import PageHeader from "@/components/PageHeader"
import { CONTACT } from "@/data/portfolio"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Available for existing product work, MVP completion, mobile and web implementation, Supabase/Firebase integration, admin portals and production readiness.",
}

const AVAILABLE_FOR = [
  "Existing product work — finishing slices, bug fixes, parity passes",
  "MVP completion — from prototype to something releasable",
  "Mobile implementation — Flutter, Android verified",
  "Web implementation — React, Next.js",
  "Supabase and Firebase integration, including the data boundary",
  "Admin and customer portals",
  "Production readiness — tests, CI, release gates, data correctness",
]

const LINKS = [
  {
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    label: "GitHub",
    value: CONTACT.githubLabel,
    href: CONTACT.github,
  },
  {
    label: "LinkedIn",
    value: CONTACT.linkedinLabel,
    href: CONTACT.linkedin,
  },
]

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHeader label="Get in touch" title="Contact" />

      <div className="grid gap-12 md:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="mb-5 font-mono text-[11px] uppercase tracking-widest text-dim">
            Available for
          </h2>
          <ul className="mb-10 space-y-3">
            {AVAILABLE_FOR.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-fg" />
                <span className="text-[14px] leading-relaxed text-body">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="rounded-sm border border-line bg-card p-5">
            <p className="text-[14px] leading-relaxed text-muted-fg">
              Contract and freelance work where the problem is scoped and the
              delivery is checkable. The way this site is put together is the
              way I would report on the work:{" "}
              <Link
                href="/evidence"
                className="text-fg underline underline-offset-4"
              >
                a claim, the artifact behind it, and a status
              </Link>{" "}
              that stays honest when the artifact is missing.
            </p>
          </div>
        </div>

        <div>
          <h2 className="mb-5 font-mono text-[11px] uppercase tracking-widest text-dim">
            Links
          </h2>
          <div className="space-y-2">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group flex items-center justify-between gap-3 rounded-sm border border-line bg-card p-4 transition-colors hover:border-fg"
              >
                <div className="min-w-0">
                  <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-dim">
                    {link.label}
                  </div>
                  <div className="truncate text-[13px] text-body transition-colors group-hover:text-fg">
                    {link.value}
                  </div>
                </div>
                <span
                  aria-hidden
                  className="shrink-0 font-mono text-sm text-line transition-colors group-hover:text-dim"
                >
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
