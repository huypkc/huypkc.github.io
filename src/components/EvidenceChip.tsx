import { CHIP_LABEL, type EvidenceKind } from "@/data/portfolio"

export default function EvidenceChip({ kind }: { kind: EvidenceKind }) {
  return (
    <span className="inline-flex items-center whitespace-nowrap rounded-sm border border-line bg-card px-2 py-0.5 font-mono text-[10px] font-medium tracking-widest text-muted-fg">
      {CHIP_LABEL[kind]}
    </span>
  )
}
