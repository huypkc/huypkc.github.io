import StatusBadge from "./StatusBadge"
import type { EvidenceRecord } from "@/data/portfolio"

/**
 * The per-case-study evidence table. The claim leads; the number, if there is
 * one, is supporting detail underneath it.
 */
export default function EvidenceTable({ rows }: { rows: EvidenceRecord[] }) {
  return (
    <div className="overflow-x-auto rounded-sm border border-line bg-card">
      <table className="w-full min-w-[34rem] border-collapse">
        <caption className="sr-only">
          Evidence supporting each claim, with verification status and link.
        </caption>
        <thead>
          <tr className="border-b border-line bg-bg">
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
              className="w-[6.5rem] px-5 py-3 text-right font-mono text-[10px] uppercase tracking-widest text-dim"
            >
              Evidence
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={`${row.surface}-${row.kind}-${row.claim}`}
              className="border-b border-line last:border-0"
            >
              <td className="px-5 py-4 align-top">
                <div className="text-[13px] text-fg">{row.claim}</div>
                <div className="mt-1 text-[12px] leading-relaxed text-muted-fg">
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
                    className="font-mono text-[11px] text-muted-fg underline-offset-4 transition-colors hover:text-fg hover:underline"
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
          ))}
        </tbody>
      </table>
    </div>
  )
}
