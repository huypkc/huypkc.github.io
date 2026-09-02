import type { ProjectStatus, VerificationStatus } from "@/data/portfolio"

type Status = VerificationStatus | ProjectStatus

/**
 * Deliberately not a green/red scale. Only `Verified` gets the solid fill;
 * everything else reads as a qualification, not a failure.
 */
const styles: Record<Status, string> = {
  Verified: "bg-fg text-white",
  Partial: "border border-fg text-fg",
  Dependency: "border border-line bg-muted text-muted-fg",
  Historical: "border border-line text-dim",
  Unavailable: "border border-line text-dim",
  "Portfolio project": "border border-line bg-muted text-muted-fg",
  Prototype: "border border-line bg-muted text-muted-fg",
  "Not published": "border border-line text-dim",
  Archived: "border border-line text-dim",
  Unverified: "border border-line text-dim",
}

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-sm px-2 py-0.5 font-mono text-[10px] font-medium tracking-wider ${styles[status]}`}
    >
      {status.toUpperCase()}
    </span>
  )
}
