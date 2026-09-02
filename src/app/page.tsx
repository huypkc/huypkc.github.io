import Link from "next/link"
import EvidenceChip from "@/components/EvidenceChip"
import SectionLabel from "@/components/SectionLabel"
import { HomeJsonLd } from "@/components/JsonLd"
import { chipsFor, LINKS, PROJECTS } from "@/data/portfolio"

const CAPABILITIES = [
  {
    title: "Mobile product delivery",
    guarantee:
      "Work captured on a phone with no connection is still there after a restart, and reaches the server exactly once.",
    projects: ["FieldProof", "One Frame", "First Week"],
    evidence: [
      "Flutter across three codebases",
      "Offline and local-first persistence",
      "Release builds that fail closed without a signing key",
      "Walked on real Android hardware",
    ],
    href: "/projects/fieldproof",
  },
  {
    title: "Backend and data boundaries",
    guarantee:
      "Unauthorised access is refused by database policy rather than by the application, so removing the app's own gate leaks nothing.",
    projects: ["FieldProof"],
    evidence: [
      "Supabase / Postgres schema and migrations",
      "Row Level Security enforced and forced, not advisory",
      "183 database assertions covering silent denials",
      "38-test smoke against the real hosted project",
    ],
    href: "/projects/fieldproof",
  },
  {
    title: "Web product interfaces",
    guarantee:
      "Read-only by database policy, not by hiding buttons — the console holds no privileged credential at all.",
    projects: ["FieldProof Admin"],
    evidence: [
      "Next.js review console, deployed and reachable",
      "Search, review and detail surfaces over live data",
      "No privileged key reaches the browser bundle",
    ],
    href: LINKS.fieldproof.demo,
    external: true,
  },
  {
    title: "Finishing work on an existing codebase",
    guarantee:
      "Slices land as reviewed pull requests with the gates green, and defects the device found are closed rather than noted.",
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
      <HomeJsonLd />

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
                    {/* Name as label, outcome as heading — the same order the
                        case-study pages already use. A project with
                        no outcome keeps its name as the heading, so every card
                        has exactly one and none repeats itself. */}
                    {p.outcome ? (
                      <>
                        <p className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-dim">
                          {p.name}
                        </p>
                        {/* The name is inside the heading but hidden, so a
                            headings list names the project each outcome
                            belongs to without changing the rendered page. */}
                        <h3 className="text-[16px] font-semibold leading-snug text-fg">
                          <span className="sr-only">{p.name}: </span>
                          {p.outcome}
                        </h3>
                      </>
                    ) : (
                      <h3 className="text-[16px] font-semibold leading-snug text-fg">
                        {p.name}
                      </h3>
                    )}
                  </div>

                  <p className="text-[13px] leading-relaxed text-body">
                    {p.description}
                  </p>

                  {p.guarantee ? (
                    <p className="border-l border-line pl-3 text-[13px] leading-relaxed text-muted-fg">
                      {p.guarantee}
                    </p>
                  ) : null}

                  {/* Proof sits under the promise it supports, never above it. */}
                  <div className="mt-auto flex flex-col gap-2 pt-1">
                    {p.proof.length > 0 ? (
                      <ul
                        aria-label={`Evidence and limitations for ${p.name}`}
                        className="flex flex-wrap gap-x-5 gap-y-1"
                      >
                        {p.proof.map((e) => (
                          <li
                            key={e}
                            className="font-mono text-[11px] text-muted-fg"
                          >
                            {e}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {chips.length > 0 ? (
                      <ul
                        aria-label={`Evidence available for ${p.name}`}
                        className="flex flex-wrap gap-1.5"
                      >
                        {chips.map((c) => (
                          <li key={c}>
                            <EvidenceChip kind={c} />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="font-mono text-[11px] text-dim">
                        Not verified
                      </span>
                    )}
                  </div>

                  <div className="border-t border-line pt-3">
                    <Link
                      href={p.href}
                      aria-label={`Inspect project: ${p.name}`}
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
                  <p className="mb-3 text-[13px] leading-relaxed text-body">
                    {c.guarantee}
                  </p>
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
                  {/* Four links all reading "Inspect" are useless in a screen
                      reader's link list; the label names what is inspected. */}
                  {c.external ? (
                    <a
                      href={c.href}
                      aria-label={`Inspect the evidence for ${c.title} (external)`}
                      className="font-mono text-[11px] text-muted-fg transition-colors hover:text-fg"
                    >
                      Inspect ↗
                    </a>
                  ) : (
                    <Link
                      href={c.href}
                      aria-label={`Inspect the evidence for ${c.title}`}
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
