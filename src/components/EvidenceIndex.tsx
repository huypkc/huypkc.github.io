"use client"

import { useMemo, useState } from "react"
import StatusBadge from "./StatusBadge"
import {
  CHIP_LABEL,
  EVIDENCE,
  type EvidenceKind,
  type EvidenceRecord,
} from "@/data/portfolio"

const FILTERS: (EvidenceKind | "All")[] = [
  "All",
  ...(Object.keys(CHIP_LABEL) as EvidenceKind[]),
]

function Row({ row }: { row: EvidenceRecord }) {
  return (
    <tr className="border-b border-line transition-colors last:border-0 hover:bg-bg">
      <td className="px-5 py-4 align-top">
        <div className="text-[13px] font-medium text-fg">{row.project}</div>
        <div className="font-mono text-[10px] text-dim">{row.surface}</div>
      </td>
      <td className="px-5 py-4 align-top max-md:hidden">
        <span className="whitespace-nowrap rounded-sm border border-line bg-muted px-2 py-0.5 font-mono text-[10px] tracking-wider text-muted-fg">
          {row.kind.toUpperCase()}
        </span>
      </td>
      <td className="px-5 py-4 align-top">
        <div className="text-[13px] leading-snug text-fg">{row.claim}</div>
        <div className="mt-1 max-w-md text-[12px] leading-relaxed text-muted-fg">
          {row.detail}
        </div>
      </td>
      <td className="px-5 py-4 align-top">
        <StatusBadge status={row.status} />
      </td>
      <td className="px-5 py-4 text-right align-top">
        {row.href ? (
          <a
            href={row.href}
            // "Open" repeated down the column is not a usable link name.
            aria-label={`Open ${row.project} evidence: ${row.claim}`}
            className="whitespace-nowrap font-mono text-[11px] text-muted-fg underline-offset-4 transition-colors hover:text-fg hover:underline"
          >
            Open ↗
          </a>
        ) : (
          <span
            className="font-mono text-[11px] text-line"
            title="No inspectable artifact"
          >
            —
          </span>
        )}
      </td>
    </tr>
  )
}

export default function EvidenceIndex() {
  const [active, setActive] = useState<EvidenceKind | "All">("All")

  const rows = useMemo(
    () =>
      active === "All" ? EVIDENCE : EVIDENCE.filter((e) => e.kind === active),
    [active],
  )

  const verified = rows.filter((r) => r.status === "Verified").length

  return (
    <>
      <div
        role="group"
        aria-label="Filter evidence by type"
        className="mb-8 flex flex-wrap gap-2 border-b border-line pb-8"
      >
        {FILTERS.map((f) => {
          const on = active === f
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              aria-pressed={on}
              className={`rounded-sm px-3 py-1.5 font-mono text-[11px] tracking-wider transition-colors ${
                on
                  ? "bg-fg text-white"
                  : "border border-line bg-card text-muted-fg hover:border-fg hover:text-fg"
              }`}
            >
              {f.toUpperCase()}
            </button>
          )
        })}
      </div>

      <p aria-live="polite" className="mb-4 font-mono text-[11px] text-dim">
        {rows.length} record{rows.length === 1 ? "" : "s"} · {verified} verified
        {active !== "All" ? ` · ${active}` : ""}
      </p>

      {rows.length === 0 ? (
        <div className="rounded-sm border border-line bg-card px-5 py-10 text-center">
          <p className="text-[13px] text-muted-fg">
            No evidence of this type exists yet.
          </p>
          <p className="mt-1 font-mono text-[11px] text-dim">
            The filter is empty rather than padded.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-sm border border-line bg-card">
          <table className="w-full min-w-[44rem] border-collapse">
            <caption className="sr-only">
              Every evidence record across all projects, with verification
              status and a link to the artifact where one exists.
            </caption>
            <thead>
              <tr className="border-b border-line bg-bg">
                <th
                  scope="col"
                  className="w-[9rem] px-5 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-dim"
                >
                  Project
                </th>
                <th
                  scope="col"
                  className="w-[7rem] px-5 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-dim max-md:hidden"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-dim"
                >
                  Claim supported
                </th>
                <th
                  scope="col"
                  className="w-[8.5rem] px-5 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-dim"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="w-[6rem] px-5 py-3 text-right font-mono text-[10px] uppercase tracking-widest text-dim"
                >
                  Evidence
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <Row key={`${row.project}-${row.surface}-${row.kind}-${row.claim}`} row={row} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
