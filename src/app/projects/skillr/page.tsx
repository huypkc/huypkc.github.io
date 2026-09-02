import type { Metadata } from "next"
import Link from "next/link"
import { BareProjectJsonLd } from "@/components/JsonLd"
import { metadataFor, routeFor } from "@/lib/seo"
import CaseStudyHeader from "@/components/CaseStudyHeader"
import EvidenceTable from "@/components/EvidenceTable"
import { CONTACT, evidenceFor } from "@/data/portfolio"

export const metadata: Metadata = metadataFor("/projects/skillr")

const SEARCHED = [
  "Public and private repositories across every account and organisation I hold",
  "Local working directories on the development machine",
  "Deployments, release tags and build artifacts",
  "The previous version of this profile, and its archived source",
]

export default function SkillrPage() {
  const rows = evidenceFor("Skillr")

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <BareProjectJsonLd
        name="Skillr"
        path="/projects/skillr"
        description={routeFor("/projects/skillr").description}
      />
      <CaseStudyHeader
        project="Skillr"
        status="Unverified"
        title="No evidence located"
        lede="This project was listed for inclusion in the portfolio. No repository, deployment, build or written artifact for it could be found, so there is no case study here — only this note explaining the absence."
      />

      <section className="mb-14">
        <div className="rounded-sm border border-line bg-muted p-6">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-dim">
            Why this page is empty
          </p>
          <p className="max-w-2xl text-[15px] leading-relaxed text-body">
            The rest of this site works one way: a claim appears only when
            something inspectable stands behind it. Writing a plausible summary
            here — a stack, a role, a list of contributions — would cost nothing
            and would be indistinguishable from the verified pages beside it.
            That is exactly what would make those pages worth less.
          </p>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-body">
            So the entry stays, and stays empty. An absence that is visible is
            more useful to a client than a description that cannot be checked.
          </p>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-2 font-serif text-2xl text-fg">Where I looked</h2>
        <p className="mb-6 font-mono text-[12px] text-dim">
          So that the absence is a finding, not an oversight
        </p>
        <ul className="grid gap-3 md:grid-cols-2">
          {SEARCHED.map((s) => (
            <li
              key={s}
              className="flex items-start gap-3 rounded-sm border border-line bg-card p-4"
            >
              <span
                aria-hidden
                className="mt-px shrink-0 pt-0.5 font-mono text-[10px] text-dim"
              >
                —
              </span>
              <span className="text-[13px] leading-relaxed text-body">{s}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-14">
        <h2 className="mb-6 font-serif text-2xl text-fg">Evidence available</h2>
        <EvidenceTable rows={rows} />
        <p className="mt-4 max-w-2xl text-[13px] leading-relaxed text-muted-fg">
          If an artifact exists that I could not reach — a private repository, a
          deployment, a design file, a written report —{" "}
          <a
            href={`mailto:${CONTACT.email}?subject=Skillr%20evidence`}
            className="text-fg underline underline-offset-4"
          >
            send it to me
          </a>{" "}
          and this page becomes a case study. Until then it does not.
        </p>
      </section>

      <div className="flex items-center justify-between border-t border-line pt-6">
        <Link
          href="/projects"
          className="font-mono text-[12px] text-dim transition-colors hover:text-fg"
        >
          ← All projects
        </Link>
        <Link
          href="/evidence"
          className="font-mono text-[12px] text-dim transition-colors hover:text-fg"
        >
          Evidence index →
        </Link>
      </div>
    </div>
  )
}
