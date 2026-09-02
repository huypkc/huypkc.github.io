import { CONTACT } from "@/data/portfolio"
import { KNOWS_ABOUT, SITE, url } from "@/lib/seo"

/** Profile links that are real and were checked. Used for sameAs. */
const SAME_AS = [CONTACT.github, CONTACT.linkedin]

/**
 * Structured data is held to the same rule as the rest of the site: every
 * field below is something a reader can see on the page it is attached to.
 *
 * Deliberately absent, because the site does not claim them: employer names
 * with dates, education, awards, ratings, offers, download counts, clients,
 * production usage, and any date this repository cannot evidence.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Json = Record<string, any>

function Script({ id, data }: { id: string; data: Json }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // JSON.stringify escapes nothing dangerous here — every value is a
      // literal from this repository, never user input — but `<` is escaped
      // anyway so the block cannot break out of the script element.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}

const PERSON_ID = `${SITE.origin}/#person`
const SITE_ID = `${SITE.origin}/#website`

export const person: Json = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE.name,
  url: url("/"),
  jobTitle: SITE.jobTitle,
  description:
    "Builds and finishes web and mobile products, with evidence attached.",
  email: `mailto:${CONTACT.email}`,
  sameAs: SAME_AS,
  knowsAbout: KNOWS_ABOUT,
}

/** Homepage: a profile page whose subject is the person, plus the site itself. */
export function HomeJsonLd() {
  return (
    <Script
      id="ld-home"
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": SITE_ID,
            url: url("/"),
            name: SITE.name,
            inLanguage: "en",
            publisher: { "@id": PERSON_ID },
          },
          {
            "@type": "ProfilePage",
            "@id": `${url("/")}#profilepage`,
            url: url("/"),
            name: `${SITE.name} — ${SITE.jobTitle}`,
            isPartOf: { "@id": SITE_ID },
            inLanguage: "en",
            mainEntity: { "@id": PERSON_ID },
          },
          person,
        ],
      }}
    />
  )
}

/** Work index: a collection listing the case studies, in page order. */
export function ProjectsJsonLd({
  items,
}: {
  items: { name: string; path: string }[]
}) {
  return (
    <Script
      id="ld-projects"
      data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${url("/projects")}#collection`,
        url: url("/projects"),
        name: "Work",
        isPartOf: { "@id": SITE_ID },
        inLanguage: "en",
        about: { "@id": PERSON_ID },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: items.length,
          itemListElement: items.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: p.name,
            url: url(p.path),
          })),
        },
      }}
    />
  )
}

function breadcrumb(name: string, path: string): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: url("/") },
      { "@type": "ListItem", position: 2, name: "Work", item: url("/projects") },
      { "@type": "ListItem", position: 3, name, item: url(path) },
    ],
  }
}

/**
 * Case study for a piece of software that demonstrably exists. `codeRepository`
 * and `downloadUrl` are only ever passed for artifacts that resolve publicly.
 */
export function ProjectJsonLd({
  name,
  path,
  description,
  operatingSystem,
  applicationCategory,
  codeRepository,
  downloadUrl,
  programmingLanguage,
}: {
  name: string
  path: string
  description: string
  operatingSystem?: string
  applicationCategory?: string
  codeRepository?: string
  downloadUrl?: string
  programmingLanguage?: string[]
}) {
  const app: Json = {
    "@type": "SoftwareApplication",
    "@id": `${url(path)}#software`,
    name,
    url: url(path),
    description,
    author: { "@id": PERSON_ID },
    inLanguage: "en",
  }
  if (applicationCategory) app.applicationCategory = applicationCategory
  if (operatingSystem) app.operatingSystem = operatingSystem
  if (programmingLanguage) app.programmingLanguage = programmingLanguage
  if (codeRepository) app.codeRepository = codeRepository
  if (downloadUrl) app.downloadUrl = downloadUrl

  return (
    <Script
      id="ld-project"
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": `${url(path)}#webpage`,
            url: url(path),
            name,
            description,
            isPartOf: { "@id": SITE_ID },
            inLanguage: "en",
            about: { "@id": `${url(path)}#software` },
            breadcrumb: breadcrumb(name, path),
          },
          app,
        ],
      }}
    />
  )
}

/**
 * A page that describes work but has no artifact to point at. It gets a
 * breadcrumb and nothing else — no CreativeWork, because nothing is claimed.
 */
export function BareProjectJsonLd({
  name,
  path,
  description,
}: {
  name: string
  path: string
  description: string
}) {
  return (
    <Script
      id="ld-project"
      data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${url(path)}#webpage`,
        url: url(path),
        name,
        description,
        isPartOf: { "@id": SITE_ID },
        inLanguage: "en",
        breadcrumb: breadcrumb(name, path),
      }}
    />
  )
}

/** Evidence, Timeline and Contact: a plain page attached to the person. */
export function PageJsonLd({
  id,
  name,
  path,
  description,
}: {
  id: string
  name: string
  path: string
  description: string
}) {
  return (
    <Script
      id={`ld-${id}`}
      data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${url(path)}#webpage`,
        url: url(path),
        name,
        description,
        isPartOf: { "@id": SITE_ID },
        inLanguage: "en",
        about: { "@id": PERSON_ID },
      }}
    />
  )
}
