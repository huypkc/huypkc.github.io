import Link from "next/link"
import EvidenceChip from "./EvidenceChip"
import SectionLabel from "./SectionLabel"
import StatusBadge from "./StatusBadge"
import { chipsFor, type ProjectStatus } from "@/data/portfolio"

export default function CaseStudyHeader({
  project,
  title,
  lede,
  status,
}: {
  project: string
  title: React.ReactNode
  lede: React.ReactNode
  status: ProjectStatus
}) {
  const chips = chipsFor(project)

  return (
    <>
      <div className="mb-4">
        <Link
          href="/projects"
          className="font-mono text-[11px] tracking-wide text-dim transition-colors hover:text-fg"
        >
          ← Work
        </Link>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionLabel>Case study · {project}</SectionLabel>
          <h1 className="font-serif text-4xl leading-tight text-fg md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-fg">
            {lede}
          </p>
        </div>
        <StatusBadge status={status} />
      </div>

      {chips.length > 0 ? (
        <div className="mb-12 flex flex-wrap gap-2 border-b border-line pb-12">
          {chips.map((c) => (
            <EvidenceChip key={c} kind={c} />
          ))}
        </div>
      ) : (
        <div className="mb-12 border-b border-line pb-12">
          <p className="font-mono text-[11px] text-dim">
            No evidence chips — nothing has been verified for this entry.
          </p>
        </div>
      )}
    </>
  )
}
