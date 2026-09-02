import type { Metadata } from "next"
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://huypkc.github.io"),
  title: {
    default: "Huy Tran — Product Engineer",
    template: "%s — Huy Tran",
  },
  description:
    "I build and finish web and mobile products, with evidence attached. Every claim on this site links to an inspectable artifact.",
  openGraph: {
    title: "Huy Tran — Product Engineer",
    description:
      "I build and finish web and mobile products, with evidence attached.",
    url: "https://huypkc.github.io",
    siteName: "Huy Tran",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // The font variables must sit on <html>, not <body>: Tailwind's @theme
    // computes --font-sans at :root, and a var() there that resolves to nothing
    // makes the whole declaration invalid, so the fonts silently never apply.
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-bg font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:border focus:border-line focus:bg-card focus:px-4 focus:py-2 focus:text-[13px]"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
