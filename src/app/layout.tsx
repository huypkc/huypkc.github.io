import type { Metadata } from "next"
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import { metadataFor, SITE, url } from "@/lib/seo"
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

// The homepage row also supplies the site-wide defaults, so a route that adds
// no metadata of its own still inherits a coherent card rather than an empty one.
const home = metadataFor("/")

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: {
    default: "Huy Tran — Product Engineer",
    template: `%s — ${SITE.name}`,
  },
  description: home.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: url("/") }],
  creator: SITE.name,
  alternates: { canonical: url("/") },
  openGraph: home.openGraph,
  twitter: home.twitter,
  // Committed PNGs under /icons rather than generated routes: GitHub Pages
  // needs the file extension to serve the right content type.
  icons: {
    icon: [
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
