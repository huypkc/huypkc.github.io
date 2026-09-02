import type { Metadata } from "next"
import Link from "next/link"
import { PageJsonLd } from "@/components/JsonLd"
import { metadataFor, routeFor } from "@/lib/seo"
import {
  CV_CURRENT,
  CV_EDUCATION,
  CV_EXPERIENCE,
  CV_PERSON,
  CV_PROJECTS,
  CV_SKILLS,
  CV_SUMMARY,
} from "@/data/cv"

export const metadata: Metadata = metadataFor("/cv")

/** Section heading plus the hairline the rest of the site uses. */
function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-10 break-inside-avoid first:mt-0">
      <h2 className="mb-4 border-b border-line pb-2 font-mono text-[11px] uppercase tracking-widest text-muted-fg">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function CvPage() {
  const contact = [
    { label: CV_PERSON.location, href: null },
    { label: CV_PERSON.email, href: `mailto:${CV_PERSON.email}` },
    { label: CV_PERSON.githubLabel, href: CV_PERSON.github },
    { label: CV_PERSON.linkedinLabel, href: CV_PERSON.linkedin },
    { label: CV_PERSON.siteLabel, href: CV_PERSON.site },
  ]

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 print:max-w-none print:px-0 print:py-0">
      <PageJsonLd
        id="cv"
        name="CV"
        path="/cv"
        description={routeFor("/cv").description}
      />

      {/* Header — name and title as real text, never an image. */}
      <header className="mb-8">
        <h1 className="font-serif text-4xl leading-tight text-fg md:text-5xl">
          {CV_PERSON.name}
        </h1>
        <p className="mt-2 text-[16px] text-body">{CV_PERSON.title}</p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[12px] text-muted-fg">
          {contact.map((c) => (
            <li key={c.label}>
              {c.href ? (
                <a
                  href={c.href}
                  className="underline-offset-4 transition-colors hover:text-fg hover:underline"
                >
                  {c.label}
                </a>
              ) : (
                c.label
              )}
            </li>
          ))}
        </ul>
      </header>

      <Section title="Summary">
        <p className="max-w-2xl text-[14px] leading-relaxed text-body">
          {CV_SUMMARY}
        </p>
      </Section>

      {/* Plain text, one row per category — parses cleanly and reads fast. */}
      <Section title="Technical skills">
        <dl className="space-y-2">
          {CV_SKILLS.map((g) => (
            <div key={g.label} className="grid gap-x-4 sm:grid-cols-[9rem_1fr]">
              <dt className="font-mono text-[12px] text-dim">{g.label}</dt>
              <dd className="text-[13px] leading-relaxed text-body">
                {g.items.join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Selected projects">
        {/* The CV files its current role here rather than under employment,
            because this is the work it refers to. Without it the page reads as
            though work stopped in Jan 2025. */}
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4">
          <h3 className="text-[14px] font-semibold text-fg">
            {CV_CURRENT.label}
            <span className="font-normal text-muted-fg">
              {" "}
              — {CV_CURRENT.title}
            </span>
          </h3>
          <p className="font-mono text-[11px] text-dim">
            <time dateTime={CV_CURRENT.from}>{CV_CURRENT.from}</time> – Present
          </p>
        </div>
        <p className="mb-6 max-w-2xl text-[13px] leading-relaxed text-muted-fg">
          Ordered by how much of each claim a reader can open and check, not by
          how recent it is. Numbers appear only where an artifact carries them.
        </p>
        <div className="space-y-8">
          {CV_PROJECTS.map((p) => (
            <article key={p.name} className="break-inside-avoid">
              <div className="mb-1 flex flex-wrap items-baseline gap-x-3">
                <h3 className="text-[15px] font-semibold text-fg">{p.name}</h3>
                <span className="text-[13px] text-muted-fg">{p.kind}</span>
              </div>
              <p className="mb-2 font-mono text-[11px] text-dim">{p.stack}</p>

              <p className="text-[13px] leading-relaxed text-body">{p.built}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-body">
                {p.decision}
              </p>
              {/* The label comes from the data: "Verified" is a load-bearing
                  word on this site, and a private repository's output is not
                  verified just because it is published. */}
              <p className="mt-2 border-l border-line pl-3 text-[13px] leading-relaxed text-muted-fg">
                <span className="font-mono text-[11px] uppercase tracking-wider text-dim">
                  {p.evidenceStatus}:{" "}
                </span>
                {p.evidence}
              </p>

              {(p.links.length > 0 || p.caseStudy) && (
                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  {p.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        aria-label={`${p.name} — ${l.label}`}
                        className="font-mono text-[11px] text-muted-fg underline-offset-4 transition-colors hover:text-fg hover:underline"
                      >
                        {l.label} ↗
                      </a>
                    </li>
                  ))}
                  {p.caseStudy ? (
                    <li>
                      <Link
                        href={p.caseStudy}
                        aria-label={`${p.name} — full case study`}
                        className="font-mono text-[11px] text-muted-fg underline-offset-4 transition-colors hover:text-fg hover:underline"
                      >
                        Case study →
                      </Link>
                    </li>
                  ) : null}
                </ul>
              )}
            </article>
          ))}
        </div>
      </Section>

      <Section title="Professional experience">
        <div className="space-y-6">
          {CV_EXPERIENCE.map((r) => (
            <article key={r.company} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-[14px] font-semibold text-fg">
                  {r.company}
                  <span className="font-normal text-muted-fg"> — {r.title}</span>
                </h3>
                <p className="font-mono text-[11px] text-dim">
                  <time dateTime={r.from}>{r.period.split(" – ")[0]}</time>
                  {" – "}
                  <time dateTime={r.to}>{r.period.split(" – ")[1]}</time>
                </p>
              </div>
              <ul className="mt-2 space-y-1">
                {r.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-start gap-2 text-[13px] leading-relaxed text-body"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-dim"
                    />
                    {pt}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Education">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <h3 className="text-[14px] font-semibold text-fg">
            {CV_EDUCATION.institution}
            <span className="font-normal text-muted-fg">
              {" "}
              — {CV_EDUCATION.degree}
            </span>
          </h3>
          <p className="font-mono text-[11px] text-dim">
            <time dateTime={CV_EDUCATION.from}>{CV_EDUCATION.from}</time>
            {" – "}
            <time dateTime={CV_EDUCATION.to}>{CV_EDUCATION.to}</time>
          </p>
        </div>
        <p className="mt-1 text-[13px] text-body">{CV_EDUCATION.field}</p>
      </Section>

      {/* Print hint, and the standing offer that the rest of the site backs. */}
      <p className="mt-10 border-t border-line pt-6 text-[12px] leading-relaxed text-muted-fg print:hidden">
        Every project claim above links to the artifact behind it. The{" "}
        <Link href="/evidence" className="text-fg underline underline-offset-4">
          evidence index
        </Link>{" "}
        lists all of them with their verification status, including the ones
        that are only partial or unavailable. Use your browser&apos;s print
        dialogue to save this page as a PDF.
      </p>
    </div>
  )
}
