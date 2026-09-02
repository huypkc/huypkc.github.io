import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ProjectJsonLd } from "@/components/JsonLd"
import { metadataFor, routeFor } from "@/lib/seo"
import CaseStudyHeader from "@/components/CaseStudyHeader"
import EvidenceTable from "@/components/EvidenceTable"
import LimitationBlock from "@/components/LimitationBlock"
import { evidenceFor, LINKS } from "@/data/portfolio"

export const metadata: Metadata = metadataFor("/projects/one-frame")

const DECISIONS = [
  {
    title: "Today only",
    desc: "One entry per local calendar day, enforced by the database key rather than by the interface. You can rewrite today as often as you like; you cannot fill in yesterday.",
  },
  {
    title: "A missed day stays missed",
    desc: "A journal you can backfill becomes a backlog, and a backlog becomes homework. The calendar shows the gap instead of inviting you to repair it.",
  },
  {
    title: "No account, no server",
    desc: "V1 has no backend at all. Which also means uninstalling loses everything — so the app says that on the first screen, before anyone has anything to lose.",
  },
  {
    title: "Backup is the user's job, stated plainly",
    desc: "One encrypted file through the system share sheet, with the part most apps leave out: forget the password and nobody can recover it.",
  },
]

const LIMITATIONS = [
  "The source repository is private. The committed command output is what a reader can inspect — it can be read, not re-run.",
  "Not published to Google Play or the App Store, and there is no GitHub release. The Android build exists; distribution does not.",
  "iOS is a release-parity target, not a shipped platform. No iOS build has been verified here.",
  "No sync, no cloud backup and no account, by design rather than by omission.",
  "A portfolio project with no users.",
]

export default function OneFramePage() {
  const rows = evidenceFor("One Frame")

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <ProjectJsonLd
        name="One Frame"
        path="/projects/one-frame"
        description={routeFor("/projects/one-frame").description}
        applicationCategory="LifestyleApplication"
        operatingSystem="Android"
        programmingLanguage={["Dart"]}
      />
      <CaseStudyHeader
        project="One Frame"
        status="Not published"
        title={
          <>
            One photograph and
            <br className="hidden md:block" /> one sentence a day
          </>
        }
        lede="A local-first Android journal whose whole design is a refusal: today only, on this device only. Taken to a signed release build and validated on hardware, then deliberately not shipped to a store."
      />

      <figure className="mb-14">
        <div className="overflow-hidden rounded-sm border border-line bg-card">
          <Image
            src={LINKS.oneFrame.screens}
            alt="Three One Frame screens photographed on Android: today's frame, the archive grid, and the calendar"
            width={1408}
            height={709}
            sizes="(max-width: 1024px) 100vw, 64rem"
            className="h-auto w-full"
            priority
          />
        </div>
        <figcaption className="mt-3 font-mono text-[11px] text-dim">
          Captured on an Android device from the release build — today&apos;s
          frame, the archive, and the calendar with its gaps left visible.
        </figcaption>
      </figure>

      <section className="mb-14">
        <h2 className="mb-2 font-serif text-2xl text-fg">Product decisions</h2>
        <p className="mb-6 font-mono text-[12px] text-dim">
          The constraint is the product
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {DECISIONS.map((d) => (
            <div
              key={d.title}
              className="rounded-sm border border-line bg-card p-5"
            >
              <h3 className="mb-2 text-[13px] font-semibold text-fg">
                {d.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-muted-fg">
                {d.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-2 font-serif text-2xl text-fg">
          Implementation evidence
        </h2>
        <p className="mb-6 max-w-2xl text-[13px] leading-relaxed text-muted-fg">
          The repository is private, so most of this is{" "}
          <span className="font-medium text-fg">Partial</span> rather than
          verified: the unedited output of each command is committed to this
          site and can be read, but you cannot re-run it yourself. That
          distinction is kept rather than smoothed over.
        </p>
        <EvidenceTable rows={rows} />
      </section>

      <section className="mb-14">
        <h2 className="mb-4 font-serif text-2xl text-fg">
          The release gate, and why it is a failing build
        </h2>
        <div className="max-w-2xl space-y-3 text-[15px] leading-relaxed text-body">
          <p>
            In a clean checkout the release build{" "}
            <span className="font-mono text-[13px]">fails</span>, on purpose:
            the signing key is gitignored, so Gradle refuses rather than falling
            back to the debug key. A green build in that state would mean
            signing had silently regressed.
          </p>
        </div>
        <a
          href={LINKS.oneFrame.signingRun}
          className="mt-4 inline-block rounded-sm border border-line bg-muted px-4 py-3 font-mono text-[12px] text-muted-fg transition-colors hover:border-fg hover:text-fg"
        >
          BUILD FAILED in 18s · exit=1 — read the unedited output ↗
        </a>
      </section>

      <LimitationBlock title="Distribution and access" items={LIMITATIONS} />

      <div className="flex items-center justify-between border-t border-line pt-6">
        <Link
          href="/projects"
          className="font-mono text-[12px] text-dim transition-colors hover:text-fg"
        >
          ← All projects
        </Link>
        <Link
          href="/projects/first-week"
          className="font-mono text-[12px] text-dim transition-colors hover:text-fg"
        >
          Next: First Week →
        </Link>
      </div>
    </div>
  )
}
