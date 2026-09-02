import Link from "next/link"
import EvidenceChip from "@/components/EvidenceChip"
import SectionLabel from "@/components/SectionLabel"
import { chipsFor, LINKS, PROJECTS } from "@/data/portfolio"

const CAPABILITIES = [
  {
    title: "Mobile product delivery",
    projects: ["FieldProof", "One Frame", "First Week"],
    evidence: [
      "Flutter across three shipped codebases",
      "Offline and local-first persistence",
      "Release builds that fail closed without a signing key",
      "Walked on real Android hardware",
    ],
    href: "/projects/fieldproof",
  },
  {
    title: "Backend and data boundaries",
    projects: ["FieldProof"],
    evidence: [
      "Supabase / Postgres schema and migrations",
      "Row Level Security enforced and forced, not advisory",
      "183 database assertions covering silent denials",
      "38-assertion smoke against the real hosted project",
    ],
    href: "/projects/fieldproof",
  },
  {
    title: "Web product interfaces",
    projects: ["FieldProof Admin"],
    evidence: [
      "Next.js review console, deployed and reachable",
      "Search, review and detail surfaces over live data",
      "Read-only by database policy, not by hiding buttons",
    ],
    href: LINKS.fieldproof.demo,
    external: true,
  },
  {
    title: "Finishing work on an existing codebase",
    projects: ["FieldProof"],
    evidence: [
      "Slices landed as reviewed pull requests",
      "Design-parity pass across mobile and admin",
      "Defects found by device QA, then closed",
    ],
    href: LINKS.fieldproof.parityPr,
    external: true,
  },
]

const CAPTIONS = [
  "React / Next.js",
  "Flutter",
  "Supabase / Firebase",
  "APIs",
  "Product delivery",
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-20 md:pt-28 md:pb-28">
        <div className="max-w-2xl">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-widest text-dim">
            Product Engineer
          </p>
          <h1 className="mb-6 font-serif text-5xl leading-[1.08] text-fg md:text-6xl">
            Huy Tran
          </h1>
          <p className="mb-4 max-w-xl text-[17px] leading-relaxed text-body">
            I build and finish web and mobile products,
            <br className="hidden md:block" /> with evidence attached.
          </p>
          <div className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[12px] text-dim">
            {CAPTIONS.map((c, i) => (
              <span key={c} className="flex items-center gap-4">
                {i > 0 ? <span className="text-line">·</span> : null}
                {c}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center rounded-sm bg-fg px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#2a2a2a]"
            >
              View verified work
            </Link>
            <Link
              href="/evidence"
              className="inline-flex items-center rounded-sm border border-line bg-card px-5 py-2.5 text-[13px] font-medium text-fg transition-colors hover:border-fg"
            >
              Evidence index
            </Link>
          </div>
        </div>
      </section>

      {/* Evidence snapshot */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <SectionLabel>Evidence snapshot</SectionLabel>
              <h2 className="font-serif text-2xl text-fg">Verified work</h2>
            </div>
            <Link
              href="/evidence"
              className="font-mono text-[12px] tracking-wide text-muted-fg transition-colors hover:text-fg"
            >
              Full evidence index →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {PROJECTS.map((p) => {
              const chips = chipsFor(p.name)
              return (
                <article
                  key={p.slug}
                  className="flex flex-col gap-4 rounded-sm border border-line bg-card p-6 transition-colors hover:border-dim"
                >
                  <div>
                    <h3 className="mb-1 text-[15px] font-semibold text-fg">
                      {p.name}
                    </h3>
                    <p className="font-mono text-[11px] text-dim">
                      {p.stack.length > 0
                        ? p.stack.join(" · ")
                        : "No stack claimed"}
                    </p>
                  </div>
                  <ul className="grow space-y-1">
                    {p.snapshot.map((e) => (
                      <li
                        key={e}
                        className="flex items-start gap-2 text-[13px] text-body"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-dim" />
                        {e}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {chips.length > 0 ? (
                      chips.map((c) => <EvidenceChip key={c} kind={c} />)
                    ) : (
                      <span className="font-mono text-[10px] tracking-widest text-dim">
                        NO EVIDENCE
                      </span>
                    )}
                  </div>
                  <div className="border-t border-line pt-3">
                    <Link
                      href={p.href}
                      className="text-[12px] font-medium text-fg transition-colors hover:text-muted-fg"
                    >
                      Inspect project →
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* What I can prove */}
      <section className="border-t border-line bg-card">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="mb-10">
            <SectionLabel>Claims</SectionLabel>
            <h2 className="font-serif text-2xl text-fg">What I can prove</h2>
          </div>

          <div className="divide-y divide-line">
            {CAPABILITIES.map((c) => (
              <div
                key={c.title}
                className="grid items-start gap-6 py-7 md:grid-cols-[2fr_3fr]"
              >
                <div>
                  <h3 className="mb-2 text-[15px] font-semibold text-fg">
                    {c.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {c.projects.map((p) => (
                      <span
                        key={p}
                        className="rounded-sm border border-line bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-fg"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <ul className="mb-3 space-y-1.5">
                    {c.evidence.map((e) => (
                      <li
                        key={e}
                        className="flex items-start gap-2 text-[13px] text-body"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-fg" />
                        {e}
                      </li>
                    ))}
                  </ul>
                  {c.external ? (
                    <a
                      href={c.href}
                      className="font-mono text-[11px] text-muted-fg transition-colors hover:text-fg"
                    >
                      Inspect ↗
                    </a>
                  ) : (
                    <Link
                      href={c.href}
                      className="font-mono text-[11px] text-muted-fg transition-colors hover:text-fg"
                    >
                      Inspect →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 border-t border-line pt-6 font-mono text-[11px] leading-relaxed text-dim">
            Every line above is carried by a record on the{" "}
            <Link href="/evidence" className="text-muted-fg hover:text-fg">
              evidence index
            </Link>
            . Where a record has no inspectable artifact, it is not marked
            verified.
          </p>
        </div>
      </section>
    </>
  )
}
