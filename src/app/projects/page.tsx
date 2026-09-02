import type { Metadata } from "next"
import PageHeader from "@/components/PageHeader"
import ProjectCard from "@/components/ProjectCard"
import { PROJECTS } from "@/data/portfolio"

export const metadata: Metadata = {
  title: "Work",
  description:
    "Engineering case studies. Each carries a status label and evidence chips, shown only where the evidence exists.",
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHeader
        label="Case studies"
        title="Work"
        lede="Each project carries a status label and evidence chips. A chip appears only where a record with a real artifact stands behind it, so the shortest card is the honest one."
      />
      <div className="space-y-4">
        {PROJECTS.map((p) => (
          <ProjectCard
            key={p.slug}
            project={p}
            highlight={p.slug === "fieldproof"}
          />
        ))}
      </div>
    </div>
  )
}
