import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ProjectJsonLd } from "@/components/JsonLd"
import { metadataFor, routeFor } from "@/lib/seo"
import CaseStudyHeader from "@/components/CaseStudyHeader"
import EvidenceTable from "@/components/EvidenceTable"
import LimitationBlock from "@/components/LimitationBlock"
import { evidenceFor, LINKS } from "@/data/portfolio"

export const metadata: Metadata = metadataFor("/projects/first-week")

const SHOTS = [
  {
    src: "/img/first-week/task-provenance.png",
    label: "A task, opened",
    note: "trust level, deadline and source above the instructions",
  },
  {
    src: "/img/first-week/two-checklists.png",
    label: "Two pilots, side by side",
    note: "1,240 students against 3",
  },
  {
    src: "/img/first-week/young-checklist.png",
    label: "The thin checklist",
    note: "says it is new before you rely on it",
  },
]

const IMPLEMENTATION = [
  {
    title: "Contract first",
    desc: "openapi.yaml carries 9 operations, each answering exactly one thing a screen does, so the UI is written against the contract rather than against whatever a server happens to return.",
  },
  {
    title: "Seeded, then frozen",
    desc: "271 real Vietnamese universities pulled once from a public API, normalised and committed, so the seed API is never a runtime dependency. Checklists ship bundled and refresh from a public data repository; a refresh that fails keeps what it had and says so rather than presenting stale data as fresh.",
  },
  {
    title: "Provenance in the type system",
    desc: "A task cannot be constructed without a trust level: official, community-confirmed, or one senior's tip. There is no code path that produces an unattributed claim.",
  },
]

const LIMITATIONS = [
  "There is no CI. The repository has no GitHub Actions workflow at all — the gates run locally through tool/check.sh and no hosted run stands behind them. The test output committed on this site is the artifact.",
  "No accounts, no server, no sync. Contributions live only inside the session.",
  "No moderation of contributions and no verification that a contributor is a real student.",
  "Two pilot cohorts only. This is not deployed to any institution and has no production users.",
]

export default function FirstWeekPage() {
  const rows = evidenceFor("First Week")

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <ProjectJsonLd
        name="First Week"
        path="/projects/first-week"
        description={routeFor("/projects/first-week").description}
        applicationCategory="EducationalApplication"
        operatingSystem="Android"
        programmingLanguage={["Dart"]}
        codeRepository={LINKS.firstWeek.repo}
      />
      <CaseStudyHeader
        project="First Week"
        status="Portfolio project"
        title={
          <>
            A checklist that admits
            <br className="hidden md:block" /> what it does not know
          </>
        }
        lede="An enrolment checklist for Vietnamese students, written by the cohort before them. Every task carries where its claim came from, and a school nobody has filled in yet renders as thin as it really is."
      />

      <section className="mb-14">
        <h2 className="mb-4 font-serif text-2xl text-fg">Problem</h2>
        <div className="max-w-2xl space-y-3 text-[15px] leading-relaxed text-body">
          <p>
            A new student needs to know what to do and by when. The answers
            exist, but they are scattered across announcements, group chats and
            the memory of the cohort above — and those three sources do not carry
            the same weight.
          </p>
          <p>
            So the product decision is about standing, not layout: a deadline
            the school published and a rumour from one senior must never render
            the same way, and where nobody knows, the screen has to say so
            rather than produce something plausible.
          </p>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-6 font-serif text-2xl text-fg">Implementation</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {IMPLEMENTATION.map((i) => (
            <div
              key={i.title}
              className="rounded-sm border border-line bg-card p-5"
            >
              <h3 className="mb-2 text-[13px] font-semibold text-fg">
                {i.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-muted-fg">
                {i.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-2 font-serif text-2xl text-fg">
          The argument, on a real phone
        </h2>
        <p className="mb-6 font-mono text-[12px] text-dim">
          Redmi Note 10 · release build · driven by hand
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {SHOTS.map((s) => (
            <figure
              key={s.src}
              className="overflow-hidden rounded-sm border border-line bg-card"
            >
              <div className="relative aspect-[1080/2400] bg-muted">
                <Image
                  src={s.src}
                  alt={`First Week on Android — ${s.label}`}
                  fill
                  sizes="(max-width: 640px) 90vw, 30vw"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="border-t border-line px-3 py-2.5">
                <span className="block text-[12px] text-fg">{s.label}</span>
                <span className="block font-mono text-[10px] leading-tight text-dim">
                  {s.note}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 max-w-2xl text-[12px] leading-relaxed text-muted-fg">
          One checklist reads ten steps and seven real deadlines; the other
          reads four steps and none. The gap is the product working, not a
          fixture left half-filled — and the device pass caught a counting
          defect the green test suite had missed.
        </p>
      </section>

      <section className="mb-14">
        <h2 className="mb-2 font-serif text-2xl text-fg">
          What was actually verified
        </h2>
        <p className="mb-6 max-w-2xl text-[13px] leading-relaxed text-muted-fg">
          The repository is public, so the test command reproduces for anyone
          who clones it. The one thing this project does not have is continuous
          integration — that row says so rather than being left out.
        </p>
        <EvidenceTable rows={rows} />
        <a
          href={LINKS.firstWeek.testRun}
          className="mt-4 inline-block rounded-sm border border-line bg-muted px-4 py-3 font-mono text-[12px] text-muted-fg transition-colors hover:border-fg hover:text-fg"
        >
          +79: All tests passed! — read the unedited output ↗
        </a>
      </section>

      <LimitationBlock items={LIMITATIONS} />

      <div className="flex items-center justify-between border-t border-line pt-6">
        <Link
          href="/projects"
          className="font-mono text-[12px] text-dim transition-colors hover:text-fg"
        >
          ← All projects
        </Link>
        <Link
          href="/projects/skillr"
          className="font-mono text-[12px] text-dim transition-colors hover:text-fg"
        >
          Next: Skillr →
        </Link>
      </div>
    </div>
  )
}
