import type { Metadata } from "next"
import PageHeader from "@/components/PageHeader"
import ProjectCard from "@/components/ProjectCard"
import { PROJECTS } from "@/data/portfolio"
import { ProjectsJsonLd } from "@/components/JsonLd"
import { metadataFor } from "@/lib/seo"

export const metadata: Metadata = metadataFor("/projects")

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <ProjectsJsonLd
        items={PROJECTS.map((p) => ({ name: p.name, path: p.href }))}
      />
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
