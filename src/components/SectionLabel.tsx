export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-dim">
      {children}
    </p>
  )
}
