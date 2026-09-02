import SectionLabel from "./SectionLabel"

export default function PageHeader({
  label,
  title,
  lede,
}: {
  label: string
  title: React.ReactNode
  lede?: React.ReactNode
}) {
  return (
    <div className="mb-12">
      <SectionLabel>{label}</SectionLabel>
      <h1 className="font-serif text-4xl leading-tight text-fg md:text-5xl">
        {title}
      </h1>
      {lede ? (
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-fg">
          {lede}
        </p>
      ) : null}
    </div>
  )
}
