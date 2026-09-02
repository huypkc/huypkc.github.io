import Link from "next/link"
import EvidenceChip from "./EvidenceChip"
import StatusBadge from "./StatusBadge"
import { chipsFor, type Project } from "@/data/portfolio"

export default function ProjectCard({
  project,
  highlight = false,
}: {
  project: Project
  highlight?: boolean
}) {
  const chips = chipsFor(project.name)

  return (
    <article
      className={`rounded-sm border bg-card p-7 transition-colors ${
        highlight ? "border-fg" : "border-line hover:border-dim"
      }`}
    >
      <div className="mb-5">
        <div className="mb-2 flex flex-wrap items-center gap-3">
          <h2 className="text-[18px] font-semibold text-fg">{project.name}</h2>
          <StatusBadge status={project.status} />
        </div>
        <p className="mb-3 max-w-2xl text-[14px] leading-relaxed text-body">
          {project.description}
        </p>
        <p className="mb-2 font-mono text-[11px] text-dim">
          Role: {project.role}
        </p>
        {project.stack.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-sm border border-line bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-fg"
              >
                {s}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col justify-between gap-4 border-t border-line pt-4 md:flex-row md:items-center">
        <div className="flex flex-wrap gap-1.5">
          {chips.length > 0 ? (
            chips.map((c) => <EvidenceChip key={c} kind={c} />)
          ) : (
            <span className="font-mono text-[11px] text-dim">
              No evidence available
            </span>
          )}
        </div>
        <Link
          href={project.href}
          aria-label={`Case study: ${project.name}`}
          className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[13px] font-medium text-fg transition-colors hover:text-muted-fg"
        >
          Case study →
        </Link>
      </div>
    </article>
  )
}
