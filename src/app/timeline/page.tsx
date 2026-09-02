import type { Metadata } from "next"
import Link from "next/link"
import PageHeader from "@/components/PageHeader"
import StatusBadge from "@/components/StatusBadge"
import { TIMELINE } from "@/data/portfolio"

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "What was actually built and verified, in order. Employment is present but secondary — it carries no artifact I am free to publish.",
}

export default function TimelinePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHeader
        label="Engineering history"
        title="Timeline"
        lede="Verifiable engineering history. Not a resume — the question this page answers is what was built and verified, not what job titles accumulated."
      />

      <div className="space-y-12">
        {TIMELINE.map((group) => (
          <section key={group.year}>
            <div className="mb-6 flex items-center gap-4">
              <h2 className="font-serif text-3xl text-fg">{group.year}</h2>
              <div className="h-px grow bg-line" />
            </div>

            <div className="space-y-4 md:pl-8">
              {group.items.map((item) => (
                <article
                  key={item.project}
                  className="rounded-sm border border-line bg-card p-6 transition-colors hover:border-dim"
                >
                  <div className="mb-3">
                    <div className="mb-1 flex flex-wrap items-center gap-3">
                      <h3 className="text-[15px] font-semibold text-fg">
                        {item.project}
                      </h3>
                      <StatusBadge status={item.status} />
                      {item.when ? (
                        <span className="font-mono text-[10px] tracking-wide text-dim">
                          {item.when}
                        </span>
                      ) : null}
                    </div>
                    <p className="max-w-2xl text-[13px] leading-relaxed text-muted-fg">
                      {item.description}
                    </p>
                  </div>

                  <ul className="mb-4 space-y-1.5">
                    {item.what.map((w) => (
                      <li
                        key={w}
                        className="flex items-start gap-2 text-[12px] text-body"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-dim" />
                        {w}
                      </li>
                    ))}
                  </ul>

                  {item.href ? (
                    <Link
                      href={item.href}
                      className="font-mono text-[11px] text-muted-fg transition-colors hover:text-fg"
                    >
                      Evidence →
                    </Link>
                  ) : (
                    <span className="font-mono text-[11px] text-dim">
                      No evidence attached
                    </span>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-12 max-w-2xl border-t border-line pt-6 text-[13px] leading-relaxed text-muted-fg">
        Dates appear only where they are evidenced by a repository&apos;s own
        history. Employment years are not reconstructed from project dates, and
        no employer is listed with a date I cannot support — which is why the
        entry below 2026 carries none.
      </p>
    </div>
  )
}
