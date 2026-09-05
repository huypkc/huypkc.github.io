/**
 * CV content, kept as data so the page stays machine-readable and every claim
 * has one place to be checked.
 *
 * Sources, and the rule for each:
 *
 * - Employment, education, dates and skills come from the author's own CV
 *   (`huy-tran-cv.pdf`, archived on `origin/archive/portfolio-v1`). They are
 *   his statements about his own career and are carried across unchanged.
 *   Nothing was added to them, and no achievement was invented for an old role.
 * - Project evidence comes from EVIDENCE in `portfolio.ts`, which is verified
 *   against CI runs, release tags and repositories. A number appears here only
 *   if a record there carries it.
 * - The phone number on the private CV is deliberately absent: this page is
 *   crawlable, and `tool/redact-cv.py` exists in the archive precisely because
 *   an emailed CV and a public URL are not the same document.
 */

export const CV_PERSON = {
  /** The formal name as it appears on the CV; the site header uses "Huy Tran". */
  name: "Tran Quoc Huy",
  title: "Senior Frontend & Mobile Product Engineer",
  location: "Ho Chi Minh City, Vietnam",
  email: "huy.pkc@gmail.com",
  github: "https://github.com/huypkc",
  githubLabel: "github.com/huypkc",
  linkedin: "https://www.linkedin.com/in/huypkc",
  linkedinLabel: "linkedin.com/in/huypkc",
  site: "https://huypkc.github.io",
  siteLabel: "huypkc.github.io",
} as const

/**
 * Positioning, not an objective. Deliberately broad across web and mobile
 * rather than filed under frontend or backend alone.
 */
export const CV_SUMMARY =
  "Software engineer building production-oriented web and mobile products across the whole line — architecture, implementation, verification and release. Ten years of frontend and product engineering in teams with customers (2014–2025), using TypeScript, React, Next.js, Angular and React Native. Independent product work since 2025 is where the full line is visible and inspectable: Flutter mobile, Supabase/Postgres data boundaries, offline-correct workflows, automated test suites, CI gates and signed release builds, each with the artifact attached."

export type SkillGroup = { label: string; items: string[] }

/**
 * Plain text on purpose — no icons, no bars, no percentages. Categories match
 * the CV's own grouping so an ATS parser and a human read the same thing.
 */
export const CV_SKILLS: SkillGroup[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Dart", "SQL", "HTML", "CSS"],
  },
  {
    label: "Frontend",
    items: [
      "React",
      "Next.js",
      "Angular",
      "Tailwind CSS",
      "SCSS",
      "Micro-frontends",
      "Reusable component systems",
      "State management",
    ],
  },
  {
    label: "Mobile",
    items: [
      "Flutter",
      "React Native",
      "Expo",
      "Local-first architecture",
      "Offline sync",
      "Android / iOS delivery",
    ],
  },
  {
    label: "Backend & APIs",
    items: [
      "Node.js",
      "REST APIs",
      "OpenAPI",
      "Contract-first API design",
      "Firebase Cloud Functions",
    ],
  },
  {
    label: "Databases & platforms",
    items: [
      "PostgreSQL",
      "Supabase",
      "Row Level Security",
      "Firebase (Auth, Firestore, Storage, App Check)",
      "SQLite",
    ],
  },
  {
    label: "Testing",
    items: [
      "Unit and widget testing",
      "pgTAP database policy tests",
      "Playwright / E2E",
      "Hosted smoke tests",
      "Physical-device QA",
    ],
  },
  {
    label: "CI/CD & tooling",
    items: [
      "GitHub Actions",
      "Release signing",
      "Android release builds",
      "Git",
      "Docker",
      "Nx",
      "Vite",
      "Webpack",
    ],
  },
  {
    label: "Security",
    items: [
      "Authentication and authorization design",
      "WebAuthn concepts",
      "Default-deny data rules",
      "Dependency and supply-chain awareness",
    ],
  },
]

export type CvProject = {
  name: string
  /** What it is, in one line a recruiter finishes reading. */
  kind: string
  stack: string
  /** What was built. */
  built: string
  /** The engineering decision worth asking about in an interview. */
  decision: string
  /**
   * Weakest verification status among the EVIDENCE records this paragraph
   * rests on, so the label matches the site's own vocabulary rather than
   * calling a private repository's output "verified".
   */
  evidenceStatus: "Verified" | "Partial" | "Unavailable"
  /** Every number here maps to a record in EVIDENCE. */
  evidence: string
  /** Where a reader can go and check. */
  links: { label: string; href: string }[]
  /** Internal case study, when one exists. */
  caseStudy?: string
}

/**
 * Ordered by how much of the claim a reader can independently open, not by how
 * recent the work is. FieldProof is first because all of it is public.
 */
export const CV_PROJECTS: CvProject[] = [
  {
    name: "FieldProof",
    kind: "Offline-capable field inspection workflow",
    stack: "Flutter · Supabase / Postgres · Next.js · GitHub Actions",
    built:
      "A field inspection system built end to end: a Flutter app where inspectors record findings on sites with no signal, a Supabase/Postgres backend, and a Next.js review console where the office reads submitted work.",
    decision:
      "Ownership, the read-only office view and the freeze on submitted work are enforced by row-level policy in Postgres rather than by the client, so removing the app's own gate leaks nothing. Offline drafts sync through an upsert on a device-generated key, so a retry cannot create a second row.",
    evidence:
      "279 Flutter tests and 41 admin tests green in CI; 183 pgTAP assertions covering silent authorization denials, run three times per CI pass; a 38-test smoke against the real hosted project through real Auth, RLS and Storage; a downloadable Android build with its sha256 published; and the offline workflow walked on two Android devices.",
    links: [
      { label: "Source", href: "https://github.com/huyupwork-hub/upwork-system" },
      { label: "Live console", href: "https://upwork-system-thun-viet.vercel.app" },
      {
        label: "Android build",
        href: "https://github.com/huyupwork-hub/upwork-system/releases/tag/v0.1.0-demo.2",
      },
    ],
    evidenceStatus: "Verified",
    caseStudy: "/projects/fieldproof",
  },
  {
    name: "First Week",
    kind: "Contract-first enrolment checklist for Vietnamese students",
    stack: "Flutter · OpenAPI · bundled and cached data",
    built:
      "A Flutter app giving one student cohort a single enrolment checklist where every step shows what stands behind it — the school's own notice, a confirmation from the cohort, or one senior's tip.",
    decision:
      "Provenance is a constructor requirement: a step marked official cannot be built without the school's own page attached, so a guess cannot reach the screen wearing the school's authority. A 9-operation OpenAPI contract fixes what each screen may ask for, and checklist data ships bundled and refreshes from a public repository — a refresh that fails keeps the data it had and says so, rather than presenting stale content as fresh.",
    evidence:
      "Public repository, so the test command reproduces: 79 of 80 tests pass at the current head, the excluded one being tagged live. 14 screens captured on a physical device, a pass that caught a counting defect the green suite had missed. No CI — stated rather than implied.",
    links: [
      { label: "Source", href: "https://github.com/huypkc/first-week" },
      {
        label: "Device evidence",
        href: "https://github.com/huypkc/first-week/tree/main/evidence/device",
      },
    ],
    evidenceStatus: "Verified",
    caseStudy: "/projects/first-week",
  },
  {
    name: "One Frame / Dấu Ngày",
    kind: "Local-first Android journal",
    stack: "Flutter · SQLite",
    built:
      "A journaling product built around one photograph and one sentence a day, with timeline, calendar, search and an optional reminder, designed to stay useful with no account and no server.",
    decision:
      "Private by manifest rather than by policy: the release build declares no INTERNET permission, so the app has no route off the device. The consequence is stated to the user on the first screen — uninstalling loses the data — and encrypted export through the system share sheet is the answer to it.",
    evidence:
      "220 tests pass; the release build refuses to produce an unsigned artifact by design, so a regression to the debug key fails loudly. Verified on Android hardware. The repository is private, so the unedited command output is published rather than the run itself, and no store publication is claimed.",
    links: [
      {
        label: "Test output",
        href: "https://huypkc.github.io/evidence/runs/one-frame-tests.txt",
      },
      { label: "Privacy policy", href: "https://github.com/thun-viet/one-frame-privacy" },
    ],
    evidenceStatus: "Partial",
    caseStudy: "/projects/one-frame",
  },
  {
    name: "ThunViet V2",
    kind: "Production-oriented system rewrite",
    stack: "Next.js · TypeScript · OpenAPI",
    built:
      "A rewrite with explicit frontend, backend and shared boundaries and reusable contracts, plus the release and verification workflow around it.",
    decision:
      "The OpenAPI contract is the specification, the generated types and the runtime validator at once, so an endpoint that drifts from it fails a gate instead of production.",
    // No counts: the repository is private and no artifact is hosted here, so
    // there is nothing a reader could open to check a number.
    evidence:
      "Private repository. No inspectable artifact is published, so no test counts or CI results are claimed here; source access for review on request.",
    evidenceStatus: "Unavailable",
    links: [],
  },
]

/**
 * The CV's current role. It heads the Selected projects section rather than
 * the employment list, because that is where the CV itself files it and where
 * the work it refers to is shown.
 */
export const CV_CURRENT = {
  label: "Independent · Product projects",
  title: "Senior Product Engineer",
  period: "2025 – Present",
  from: "2025",
} as const

export type CvRole = {
  company: string
  title: string
  period: string
  /** ISO dates for the machine-readable <time> elements. */
  from: string
  to: string
  points: string[]
}

/**
 * Carried across from the CV unchanged. Factual responsibility and technology
 * descriptions only — no achievement was invented, and no metric was attached
 * to a role whose work cannot be inspected.
 */
export const CV_EXPERIENCE: CvRole[] = [
  {
    company: "Positive Thinking Company (CBTW)",
    title: "Frontend Developer",
    period: "Jun 2022 – Jan 2025",
    from: "2022-06",
    to: "2025-01",
    points: [
      "Built React and TypeScript product features across internal operations and video-streaming platforms, working with product and cross-functional teams.",
      "Contributed to frontend modernization: micro-frontend architecture, Next.js and Nx adoption, reusable UI and performance work.",
      "Built React Native and Expo mobile flows including REST integration, authentication, payments, push notifications and Android/iOS delivery.",
      "Reviewed code and mentored junior developers.",
    ],
  },
  {
    company: "CyberLogitec",
    title: "Frontend Developer",
    period: "May 2018 – Jun 2022",
    from: "2018-05",
    to: "2022-06",
    points: [
      "Designed React-based frontend solutions for logistics and shipping systems, and helped migrate legacy areas toward a modern frontend architecture.",
      "Delivered master-data and contract workflows, and real-time ship and cargo route visualization used for operational decisions.",
      "Mentored junior developers and contributed to maintainability and frontend engineering practices.",
    ],
  },
  {
    company: "GO1",
    title: "Frontend Developer",
    period: "2016 – Jan 2018",
    from: "2016",
    to: "2018-01",
    points: [
      "Built online-education platform features with AngularJS and TypeScript-era tooling, responsive marketing pages and D3/SVG client prototypes.",
      "Worked in Scrum: estimated backlog items, clarified requirements, implemented features, refactored and reviewed.",
    ],
  },
  {
    company: "FPT Software",
    title: "Frontend Developer / Fresher",
    period: "2014 – 2016",
    from: "2014",
    to: "2016",
    points: [
      "Built HTML, CSS, JavaScript and SVG education content, and converted legacy Flash learning material to the web.",
      "Maintained frontend code and fixed defects for a movie-streaming platform.",
    ],
  },
]

export const CV_EDUCATION = {
  institution: "University of Science, Ho Chi Minh City",
  degree: "Bachelor's Degree",
  field: "Faculty of Electronics and Telecommunications",
  period: "2010 – 2014",
  from: "2010",
  to: "2014",
} as const
