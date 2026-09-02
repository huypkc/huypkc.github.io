import type { Metadata } from "next"
import EvidenceIndex from "@/components/EvidenceIndex"
import PageHeader from "@/components/PageHeader"

export const metadata: Metadata = {
  title: "Evidence",
  description:
    "Every evidence record across all projects, with verification status and a link to the artifact where one exists.",
}

export default function EvidencePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHeader
        label="Evidence index"
        title="Evidence"
        lede="Every claim this site makes, with the artifact behind it. Not everything here is verified — that is the point of publishing the index rather than a summary."
      />
      <EvidenceIndex />

      <div className="mt-8 border-t border-line pt-6">
        <p className="max-w-3xl font-mono text-[11px] leading-relaxed text-dim">
          <span className="text-fg">VERIFIED</span> — a linked artifact anyone
          can open ·{" "}
          <span className="text-fg">PARTIAL</span> — evidence exists but cannot
          be independently re-run ·{" "}
          <span className="text-muted-fg">DEPENDENCY</span> — blocked by
          something outside this work ·{" "}
          <span className="text-dim">HISTORICAL</span> — happened, no artifact
          of mine to publish ·{" "}
          <span className="text-dim">UNAVAILABLE</span> — nothing to show, and
          nothing claimed
        </p>
        <p className="mt-4 max-w-3xl text-[13px] leading-relaxed text-muted-fg">
          A test count is not the accomplishment. The claim is the
          accomplishment; the count is how far it was pushed before it was
          believed.
        </p>
      </div>
    </div>
  )
}
