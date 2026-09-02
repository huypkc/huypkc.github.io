export default function LimitationBlock({
  title = "Dependencies & limitations",
  note = "Stated here rather than left for a client to discover.",
  items,
}: {
  title?: string
  note?: string
  items: string[]
}) {
  return (
    <section className="mb-16">
      <h2 className="mb-2 font-serif text-2xl text-fg">{title}</h2>
      <p className="mb-5 font-mono text-[12px] text-dim">{note}</p>
      <div className="rounded-sm border border-line bg-muted p-6">
        <ul className="space-y-3">
          {items.map((l) => (
            <li key={l} className="flex items-start gap-3">
              <span className="mt-px shrink-0 pt-0.5 font-mono text-[10px] text-dim">
                —
              </span>
              <span className="text-[14px] leading-relaxed text-body">{l}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
