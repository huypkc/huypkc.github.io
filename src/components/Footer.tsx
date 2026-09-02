import Link from "next/link"
import { CONTACT } from "@/data/portfolio"

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-6 py-8 md:flex-row md:items-center">
        <p className="font-serif text-[14px] text-fg">Huy Tran</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link
            href="/contact"
            className="font-mono text-[12px] text-muted-fg transition-colors hover:text-fg"
          >
            Contact
          </Link>
          <a
            href={CONTACT.github}
            className="font-mono text-[12px] text-muted-fg transition-colors hover:text-fg"
          >
            GitHub ↗
          </a>
          <a
            href={CONTACT.linkedin}
            className="font-mono text-[12px] text-muted-fg transition-colors hover:text-fg"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
