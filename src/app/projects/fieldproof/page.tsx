import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import CaseStudyHeader from "@/components/CaseStudyHeader"
import EvidenceTable from "@/components/EvidenceTable"
import LimitationBlock from "@/components/LimitationBlock"
import StatusBadge from "@/components/StatusBadge"
import { evidenceFor, LINKS } from "@/data/portfolio"

export const metadata: Metadata = {
  title: "FieldProof",
  description:
    "An offline-capable field inspection workflow — Flutter, Supabase/Postgres and Next.js — with 279 mobile tests, 183 database assertions and a live review console.",
}

const WORKFLOW = [
  { step: "Inspection", sub: "site, address, client" },
  { step: "Findings", sub: "items and severity" },
  { step: "Photo evidence", sub: "private bucket" },
  { step: "Submit", sub: "server stamps and freezes" },
  { step: "Report", sub: "PDF from one snapshot" },
  { step: "History", sub: "full-text search" },
  { step: "Admin review", sub: "read-only console" },
]

/** The real offline chain, taken from the acceptance record — including the link that is missing. */
const OFFLINE = [
  {
    stage: "Create a draft with the server unreachable",
    status: "Verified" as const,
    note: "Driven through the widget tree with the remote repository failing",
  },
  {
    stage: "Add, edit and delete its punch items",
    status: "Verified" as const,
    note: "Same editor as online, no separate offline code path",
  },
  {
    stage: "Attach a photograph offline",
    status: "Unavailable" as const,
    note: "Not implemented. Deferred as its own slice, with the reason recorded",
  },
  {
    stage: "Force-stop and reopen, still offline",
    status: "Verified" as const,
    note: "The queue is rebuilt from stored bytes alone",
  },
  {
    stage: "Reconnect and push the queue",
    status: "Verified" as const,
    note: "Also proven against the real project, not only against fakes",
  },
  {
    stage: "Replay the push after a retry",
    status: "Verified" as const,
    note: "Upsert on a device-generated key — one inspection, two items, no duplicate",
  },
  {
    stage: "Submit only after the server has agreed",
    status: "Verified" as const,
    note: "An unsynced draft raises rather than looking submitted",
  },
]

const MOBILE_SHOTS = [
  {
    src: "/img/fieldproof/mobile/01-inspections-populated.png",
    label: "History",
    note: "newest first, total order",
  },
  {
    src: "/img/fieldproof/mobile/03-inspections-offline-pending.png",
    label: "Offline",
    note: "not synced, and says so",
  },
  {
    src: "/img/fieldproof/mobile/07-detail-hero.png",
    label: "Findings",
    note: "severity and open state",
  },
  {
    src: "/img/fieldproof/mobile/10-editor-new.png",
    label: "Editor",
    note: "constrained enums",
  },
  {
    src: "/img/fieldproof/mobile/12-reports.png",
    label: "Report",
    note: "submitted work only",
  },
  {
    src: "/img/fieldproof/mobile/17-search-results.png",
    label: "Search",
    note: "site, address, client",
  },
]

const ADMIN_LEAD = {
  src: "/img/fieldproof/admin/queue.png",
  label: "Submitted queue",
  note: "the SMOKE … do-not-keep rows are real — the hosted smoke test writes them into the demo project on every CI run",
}

const ADMIN_SHOTS = [
  {
    src: "/img/fieldproof/admin/detail.png",
    label: "Review detail",
    note: "photos through short-lived signed URLs",
  },
  {
    src: "/img/fieldproof/admin/search.png",
    label: "Search",
    note: "one term matching a site and a client",
  },
]

const BOUNDARY = [
  {
    title: "Denied by absence, not by rule",
    desc: "RLS is enabled and forced on every application table, and no policy exists for the anonymous role. An unauthenticated client is refused outright rather than returned an empty list.",
  },
  {
    title: "Administrators cannot write",
    desc: "Every admin insert, update and delete is refused by the database. Updates and deletes deny silently, so each test re-reads the row afterwards to prove nothing changed.",
  },
  {
    title: "Role cannot be self-escalated",
    desc: "The role column is revoked from authenticated users at the column level. A user can rename themselves and cannot promote themselves.",
  },
  {
    title: "No privileged key reaches a client",
    desc: "The console refuses to start unless the key is positively identifiable as publishable, and CI greps the built bundle to prove no privileged key shipped.",
  },
]

const LIMITATIONS = [
  "A portfolio project. There is no customer deployment, no production user volume, and none is implied.",
  "The hosted project holds demo data only. Both demo accounts are published deliberately, so the security model can be pushed against rather than described.",
  "Offline photo capture is not implemented. Drafts and punch items work offline; attaching a photograph does not.",
  "Opened cold while offline, the history takes roughly thirty seconds to render — it waits for a profile lookup to fail. Latency, not data loss.",
  "iOS is unverified. The build passed once on a macOS runner and has not been re-run at the current head, so no iOS claim is made.",
  "Not published to any app store, and no store listing is claimed.",
  "Deployment of the console is manual. The Vercel account is not linked to the identity that authors the commits, so Git-triggered builds are off.",
]

export default function FieldProofPage() {
  const rows = evidenceFor("FieldProof")

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <CaseStudyHeader
        project="FieldProof"
        status="Portfolio project"
        title={
          <>
            Offline-capable field
            <br className="hidden md:block" /> inspection workflow
          </>
        }
        lede="An inspector authenticates, records findings and photographs on a site with no signal, and syncs when there is one. An administrator reviews submitted work from a hosted console and can write nothing at all."
      />

      {/* Try it — evidence you can open before reading anything */}
      <section className="mb-14 grid gap-4 md:grid-cols-2">
        <a
          href={LINKS.fieldproof.demo}
          className="rounded-sm border border-line bg-card p-5 transition-colors hover:border-fg"
        >
          <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-dim">
            Review console ↗
          </p>
          <p className="text-[14px] text-fg">Live, with published credentials</p>
          <p className="mt-1 text-[12px] leading-relaxed text-muted-fg">
            Sign in as the admin and as the inspector. The second one is refused
            — that refusal is the product.
          </p>
        </a>
        <a
          href={LINKS.fieldproof.release}
          className="rounded-sm border border-line bg-card p-5 transition-colors hover:border-fg"
        >
          <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-dim">
            Android build ↗
          </p>
          <p className="text-[14px] text-fg">v0.1.0-demo · sha256 published</p>
          <p className="mt-1 text-[12px] leading-relaxed text-muted-fg">
            Sideload it. Android will warn about an unknown developer, as it
            does for any self-signed build.
          </p>
        </a>
      </section>

      {/* 1. Problem */}
      <section className="mb-14">
        <h2 className="mb-4 font-serif text-2xl text-fg">1. Problem</h2>
        <div className="max-w-2xl space-y-3 text-[15px] leading-relaxed text-body">
          <p>
            Inspections happen where the connectivity is not. An inspector has
            to record structured findings and attach photographs on a site with
            no signal, and the record has to survive the walk back. Meanwhile
            the office needs submitted work to be searchable, reviewable and
            immutable once it has been handed in.
          </p>
          <p>
            The interesting part is not the forms. It is what happens at the
            boundaries: what an unsynced draft is allowed to claim, what a retry
            is allowed to create twice, and what one inspector is allowed to see
            of another&apos;s work.
          </p>
        </div>
      </section>

      {/* 2. Workflow */}
      <section className="mb-14">
        <h2 className="mb-6 font-serif text-2xl text-fg">2. Built workflow</h2>
        <div className="overflow-x-auto rounded-sm border border-line bg-card p-6">
          <ol className="flex min-w-max items-stretch">
            {WORKFLOW.map((s, i) => (
              <li key={s.step} className="flex items-center">
                <div className="flex flex-col px-4 py-1 text-center">
                  <span className="mb-1 font-mono text-[10px] uppercase tracking-widest text-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[13px] font-medium text-fg">
                    {s.step}
                  </span>
                  <span className="mt-0.5 text-[11px] text-dim">{s.sub}</span>
                </div>
                {i < WORKFLOW.length - 1 ? (
                  <span
                    aria-hidden
                    className="shrink-0 font-mono text-[18px] text-line"
                  >
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. Mobile */}
      <section className="mb-14">
        <h2 className="mb-2 font-serif text-2xl text-fg">3. Mobile</h2>
        <p className="mb-6 font-mono text-[12px] text-dim">
          Flutter · Android verified, iOS not claimed
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {MOBILE_SHOTS.map((s) => (
            <figure
              key={s.src}
              className="overflow-hidden rounded-sm border border-line bg-card"
            >
              <div className="relative aspect-[390/844] bg-muted">
                <Image
                  src={s.src}
                  alt={`FieldProof mobile — ${s.label}`}
                  fill
                  sizes="(max-width: 768px) 45vw, 16vw"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="border-t border-line px-2.5 py-2">
                <span className="block text-[11px] text-fg">{s.label}</span>
                <span className="block font-mono text-[10px] leading-tight text-dim">
                  {s.note}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 max-w-2xl text-[12px] leading-relaxed text-muted-fg">
          These are rendered from the real widget trees at 390×844, with the
          platform fonts registered — not mockups, and not photographs of a
          phone.{" "}
          <a
            href={LINKS.fieldproof.renderEvidence}
            className="text-fg underline underline-offset-4"
          >
            They are not a substitute for device QA
          </a>
          , which was done separately on two handsets.
        </p>
      </section>

      {/* 4. Admin */}
      <section className="mb-14">
        <h2 className="mb-2 font-serif text-2xl text-fg">4. Admin</h2>
        <p className="mb-6 font-mono text-[12px] text-dim">
          Next.js · deployed · read-only by policy
        </p>
        <figure className="mb-4 overflow-hidden rounded-sm border border-line bg-card">
          <Image
            src={ADMIN_LEAD.src}
            alt={`FieldProof admin console — ${ADMIN_LEAD.label}`}
            width={2560}
            height={2594}
            sizes="(max-width: 1024px) 100vw, 64rem"
            className="h-auto w-full"
          />
          <figcaption className="border-t border-line px-4 py-2.5">
            <span className="text-[12px] text-fg">{ADMIN_LEAD.label}</span>
            <span className="ml-2 font-mono text-[10px] text-dim">
              {ADMIN_LEAD.note}
            </span>
          </figcaption>
        </figure>

        <div className="grid gap-4 md:grid-cols-2">
          {ADMIN_SHOTS.map((s) => (
            <figure
              key={s.src}
              className="overflow-hidden rounded-sm border border-line bg-card"
            >
              <Image
                src={s.src}
                alt={`FieldProof admin console — ${s.label}`}
                width={2560}
                height={1800}
                sizes="(max-width: 768px) 100vw, 32rem"
                className="h-auto w-full"
              />
              <figcaption className="border-t border-line px-4 py-2.5">
                <span className="text-[12px] text-fg">{s.label}</span>
                <span className="ml-2 font-mono text-[10px] text-dim">
                  {s.note}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 max-w-2xl text-[12px] leading-relaxed text-muted-fg">
          Captured against the live demo project while signed in as the
          published reviewer, so these are a point-in-time snapshot of real data
          rather than a fixture.
        </p>
      </section>

      {/* 5. Offline correctness */}
      <section className="mb-14">
        <h2 className="mb-2 font-serif text-2xl text-fg">
          5. Offline correctness
        </h2>
        <p className="mb-6 font-mono text-[12px] text-dim">
          The chain as it actually stands, including the link that is missing
        </p>
        <div className="rounded-sm border border-line bg-card p-6">
          <ol className="space-y-3">
            {OFFLINE.map((s, i) => (
              <li key={s.stage} className="flex items-start gap-4">
                <span
                  aria-hidden
                  className="w-4 shrink-0 pt-1 text-center font-mono text-xs text-line"
                >
                  {i > 0 ? "↓" : ""}
                </span>
                <div className="grow">
                  <span className="text-[14px] text-body">{s.stage}</span>
                  <span className="mt-0.5 block text-[12px] leading-relaxed text-dim">
                    {s.note}
                  </span>
                </div>
                <StatusBadge status={s.status} />
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-4 max-w-2xl text-[12px] leading-relaxed text-muted-fg">
          Marked synced is a deletion, not a flag: the local record is removed
          in one place, after the server has been read back.{" "}
          <a
            href={LINKS.fieldproof.offlinePr}
            className="text-fg underline underline-offset-4"
          >
            The slice landed as a reviewed pull request ↗
          </a>
        </p>
      </section>

      {/* 6. Security */}
      <section className="mb-14">
        <h2 className="mb-2 font-serif text-2xl text-fg">
          6. Security and data boundary
        </h2>
        <p className="mb-6 font-mono text-[12px] text-dim">
          Enforced in the database, so removing the application gate leaks
          nothing
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {BOUNDARY.map((item) => (
            <div
              key={item.title}
              className="rounded-sm border border-line bg-card p-5"
            >
              <h3 className="mb-2 text-[13px] font-semibold text-fg">
                {item.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-muted-fg">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-2xl text-[12px] leading-relaxed text-muted-fg">
          The Flutter tests deliberately prove nothing about RLS — their fakes
          do not re-implement policy, because a fake that enforced it would be
          testing itself.{" "}
          <a
            href={LINKS.fieldproof.pgTap}
            className="text-fg underline underline-offset-4"
          >
            That is what the pgTAP suite is for ↗
          </a>
        </p>
      </section>

      {/* 7. Verification */}
      <section className="mb-14">
        <h2 className="mb-2 font-serif text-2xl text-fg">7. Verification</h2>
        <p className="mb-6 font-mono text-[12px] text-dim">
          Every row opens the artifact behind it, or says why it cannot
        </p>
        <EvidenceTable rows={rows} />
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
          href="/projects/one-frame"
          className="font-mono text-[12px] text-dim transition-colors hover:text-fg"
        >
          Next: One Frame →
        </Link>
      </div>
    </div>
  )
}
