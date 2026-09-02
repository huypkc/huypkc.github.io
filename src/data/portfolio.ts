/**
 * Single source of truth for every public claim on this site.
 *
 * The rule this file exists to enforce: a claim appears in the interface only
 * if a record here carries it, and a record marked `Verified` must name an
 * inspectable artifact. The `Verified` variant of `EvidenceRecord` makes `href`
 * required, so "verified with no link" does not typecheck.
 *
 * Every URL below was resolved before being committed. Where a repository is
 * private, the unedited command output is committed under `public/evidence/`
 * and the record is `Partial` rather than `Verified` — a reader can see what
 * was printed but cannot re-run it.
 */

export const CONTACT = {
  email: "huy.pkc@gmail.com",
  github: "https://github.com/huypkc",
  githubLabel: "github.com/huypkc",
  linkedin: "https://www.linkedin.com/in/huypkc",
  linkedinLabel: "linkedin.com/in/huypkc",
} as const

const FP = "https://github.com/huyupwork-hub/upwork-system"
const FW = "https://github.com/huypkc/first-week"

export const LINKS = {
  fieldproof: {
    repo: FP,
    ciRun: `${FP}/actions/runs/33562736235`,
    ciMain: `${FP}/actions/runs/33559885278`,
    smokeRun: `${FP}/actions/runs/33569199420`,
    release: `${FP}/releases/tag/v0.1.0-demo`,
    demo: "https://upwork-system-thun-viet.vercel.app",
    acceptance: `${FP}/blob/main/docs/ACCEPTANCE.md`,
    demoDoc: `${FP}/blob/main/docs/DEMO.md`,
    dataModel: `${FP}/blob/main/docs/DATA_MODEL.md`,
    pgTap: `${FP}/tree/main/supabase/tests`,
    migrations: `${FP}/tree/main/supabase/migrations`,
    ciWorkflow: `${FP}/blob/main/.github/workflows/ci.yml`,
    smokeWorkflow: `${FP}/blob/main/.github/workflows/hosted-smoke.yml`,
    iosWorkflow: `${FP}/blob/main/.github/workflows/ios.yml`,
    renderEvidence: `${FP}/blob/main/docs/evidence/figma-parity/README.md`,
    goldens: `${FP}/tree/main/apps/mobile/tool/render/goldens`,
    offlinePr: `${FP}/pull/1`,
    parityPr: `${FP}/pull/3`,
  },
  oneFrame: {
    privacy: "https://github.com/thun-viet/one-frame-privacy",
    testRun: "/evidence/runs/one-frame-tests.txt",
    signingRun: "/evidence/runs/signing-refusal.txt",
    screens: "/img/one-frame/screens.jpg",
  },
  firstWeek: {
    repo: FW,
    commit: `${FW}/commit/3cba67474bcbc2e867e523b253f1175805fefa2c`,
    device: `${FW}/tree/main/evidence/device`,
    openapi: `${FW}/blob/main/openapi.yaml`,
    check: `${FW}/blob/main/tool/check.sh`,
    status: `${FW}/blob/main/STATUS.md`,
    audit: `${FW}/blob/main/data/PILOT-AUDIT.md`,
    dataRepo: "https://github.com/huypkc/first-week-data",
    contribRepo: "https://github.com/huypkc/first-week-contrib",
    testRun: "/evidence/runs/first-week.txt",
  },
} as const

/* ------------------------------------------------------------------ types */

export type EvidenceKind =
  | "CI"
  | "Tests"
  | "Source"
  | "Demo"
  | "Release"
  | "Device QA"
  | "Database"
  | "Security"
  | "Design"
  | "Reports"

/** Chip labels, keyed by the evidence kind they stand for. */
export const CHIP_LABEL: Record<EvidenceKind, string> = {
  CI: "CI",
  Tests: "TESTS",
  Source: "SOURCE",
  Demo: "LIVE DEMO",
  Release: "RELEASE",
  "Device QA": "DEVICE QA",
  Database: "DATABASE",
  Security: "SECURITY",
  Design: "DESIGN",
  Reports: "REPORT",
}

export type VerificationStatus =
  | "Verified"
  | "Partial"
  | "Dependency"
  | "Historical"
  | "Unavailable"

export type ProjectStatus =
  | "Portfolio project"
  | "Prototype"
  | "Partial"
  | "Not published"
  | "Archived"
  | "Unverified"

type EvidenceBase = {
  /** Project the record belongs to. */
  project: string
  /** Surface or component within the project. */
  surface: string
  kind: EvidenceKind
  /** The claim this record is offered in support of. */
  claim: string
  /** How the claim was established, and at what cost. */
  detail: string
}

/**
 * `Verified` requires a link. Everything weaker may omit one — that is the
 * whole point of the weaker statuses.
 */
export type EvidenceRecord = EvidenceBase &
  (
    | { status: "Verified"; href: string }
    | {
        status: Exclude<VerificationStatus, "Verified">
        href?: string
      }
  )

/* -------------------------------------------------------------- evidence */

export const EVIDENCE: EvidenceRecord[] = [
  /* ---------------------------------------------------------- FieldProof */
  {
    project: "FieldProof",
    surface: "Mobile",
    kind: "Tests",
    claim: "Offline capture, sync, reporting and search behave as specified",
    detail: "Flutter unit and widget suite — 279 tests passed",
    status: "Verified",
    href: LINKS.fieldproof.ciRun,
  },
  {
    project: "FieldProof",
    surface: "Mobile",
    kind: "CI",
    claim: "Every push is gated on format, static analysis and the test suite",
    detail:
      "dart format --set-exit-if-changed, flutter analyze --fatal-infos, flutter test",
    status: "Verified",
    href: LINKS.fieldproof.ciWorkflow,
  },
  {
    project: "FieldProof",
    surface: "Database",
    kind: "Security",
    claim:
      "One inspector cannot read or mutate another's work at any level of the chain",
    detail:
      "pgTAP suite — 183 tests across 9 files, run three times per CI pass. Covers silent denials, not only raised errors",
    status: "Verified",
    href: LINKS.fieldproof.pgTap,
  },
  {
    project: "FieldProof",
    surface: "Database",
    kind: "Database",
    claim: "Migrations apply from an empty database to head",
    detail:
      "5 migrations applied unseeded, then re-applied seeded, against a real Postgres engine",
    status: "Verified",
    href: LINKS.fieldproof.migrations,
  },
  {
    project: "FieldProof",
    surface: "Backend",
    kind: "Demo",
    claim: "The security boundary holds against the real hosted project",
    detail:
      "Hosted Supabase smoke — 38 assertions through real Auth, real RLS and real Storage, not fakes",
    status: "Verified",
    href: LINKS.fieldproof.smokeRun,
  },
  {
    project: "FieldProof",
    surface: "Admin",
    kind: "Tests",
    claim: "The review console is read-only and scoped to submitted work",
    detail: "Vitest — 41 tests across 6 files, plus lint and tsc --noEmit",
    status: "Verified",
    href: LINKS.fieldproof.ciRun,
  },
  {
    project: "FieldProof",
    surface: "Admin",
    kind: "Demo",
    claim: "The review console is deployed and publicly reachable",
    detail:
      "Live deployment with demo credentials published deliberately, so the security model can be pushed against",
    status: "Verified",
    href: LINKS.fieldproof.demo,
  },
  {
    project: "FieldProof",
    surface: "Mobile",
    kind: "Release",
    claim: "An installable Android build exists and is downloadable",
    detail:
      "v0.1.0-demo — fieldproof-f12d71d.apk, sha256 published alongside the tag",
    status: "Verified",
    href: LINKS.fieldproof.release,
  },
  {
    project: "FieldProof",
    surface: "Mobile",
    kind: "Device QA",
    claim: "The offline workflow was walked end to end on real hardware",
    detail:
      "Two Android devices (SDK 30 and SDK 36) against the hosted project. The pass found a real defect — the app had no submit action at all",
    status: "Verified",
    href: LINKS.fieldproof.acceptance,
  },
  {
    project: "FieldProof",
    surface: "Mobile",
    kind: "Design",
    claim: "Sixteen screens were rendered from the real widget trees",
    detail:
      "390×844 @2x goldens with the platform fonts registered. Not a CI gate, and explicitly not a substitute for device QA",
    status: "Verified",
    href: LINKS.fieldproof.goldens,
  },
  {
    project: "FieldProof",
    surface: "Admin",
    kind: "Design",
    claim: "Console screens captured against live demo data",
    detail:
      "Headless Chrome, signed in as the published demo reviewer. A point-in-time snapshot, not a reproducible fixture",
    status: "Verified",
    href: LINKS.fieldproof.renderEvidence,
  },
  {
    project: "FieldProof",
    surface: "Repository",
    kind: "Source",
    claim: "The whole system is public and inspectable",
    detail:
      "Mobile, admin, migrations, RLS suite, CI and the acceptance record",
    status: "Verified",
    href: LINKS.fieldproof.repo,
  },
  {
    project: "FieldProof",
    surface: "Mobile",
    kind: "CI",
    claim: "iOS build verification",
    detail:
      "Passed once on a macOS runner at c796b6f. Moved to manual dispatch and not re-verified at HEAD, so iOS is not claimed",
    status: "Partial",
    href: LINKS.fieldproof.iosWorkflow,
  },
  {
    project: "FieldProof",
    surface: "Mobile",
    kind: "Tests",
    claim: "Offline photo capture",
    detail:
      "Not implemented. Drafts and punch items work offline; attaching a photo does not. Deferred as its own slice rather than quietly dropped",
    status: "Unavailable",
    href: LINKS.fieldproof.acceptance,
  },

  /* ----------------------------------------------------------- One Frame */
  {
    project: "One Frame",
    surface: "Mobile",
    kind: "Tests",
    claim: "The local-first data and backup paths hold",
    detail:
      "flutter test — 220 tests passed. The source repository is private, so the unedited output is committed here: readable, not re-runnable",
    status: "Partial",
    href: LINKS.oneFrame.testRun,
  },
  {
    project: "One Frame",
    surface: "Mobile",
    kind: "Release",
    claim: "A release build refuses to produce an unsigned artifact",
    detail:
      "flutter build apk --release fails by design when the signing key is absent. A green build here would mean signing had regressed to the debug key",
    status: "Partial",
    href: LINKS.oneFrame.signingRun,
  },
  {
    project: "One Frame",
    surface: "Mobile",
    kind: "CI",
    claim: "Quality workflow green on the default branch",
    detail:
      "Format, analyze, test and Android build. The repository is private, so the run itself is not publicly inspectable",
    status: "Partial",
  },
  {
    project: "One Frame",
    surface: "Mobile",
    kind: "Device QA",
    claim: "The app was run and photographed on an Android device",
    detail:
      "Three screens captured on hardware. Screenshots are the artifact; there is no public run to accompany them",
    status: "Partial",
    href: LINKS.oneFrame.screens,
  },
  {
    project: "One Frame",
    surface: "Product",
    kind: "Reports",
    claim: "The privacy position is published and checkable",
    detail: "Public repository holding the privacy policy",
    status: "Verified",
    href: LINKS.oneFrame.privacy,
  },
  {
    project: "One Frame",
    surface: "Repository",
    kind: "Source",
    claim: "Source code",
    detail: "Private repository. Access for review on request",
    status: "Unavailable",
  },
  {
    project: "One Frame",
    surface: "Distribution",
    kind: "Release",
    claim: "Play Store or App Store publication",
    detail:
      "Not published to any store, and no store listing is claimed. No GitHub release exists either",
    status: "Unavailable",
  },

  /* ---------------------------------------------------------- First Week */
  {
    project: "First Week",
    surface: "Repository",
    kind: "Source",
    claim: "The whole application is public and clonable",
    detail: "Flutter app, contract, fixtures, tooling and device evidence",
    status: "Verified",
    href: LINKS.firstWeek.repo,
  },
  {
    project: "First Week",
    surface: "App",
    kind: "Tests",
    claim: "The offline suite passes at the current head of the repository",
    detail:
      "flutter test --exclude-tags live at 3cba674 — 79 of 80 declared tests. The excluded one is tagged live and hits a real endpoint. Public, so it reproduces",
    status: "Verified",
    href: LINKS.firstWeek.commit,
  },
  {
    project: "First Week",
    surface: "App",
    kind: "Device QA",
    claim: "Rendered and driven by hand on an Android device",
    detail:
      "Redmi Note 10, release build, 14 captured screens. The pass caught a defect the green test suite had missed",
    status: "Verified",
    href: LINKS.firstWeek.device,
  },
  {
    project: "First Week",
    surface: "App",
    kind: "Design",
    claim: "The screen behaviour is written down as a contract first",
    detail:
      "openapi.yaml — 9 operations, each answering one thing a screen does. The in-process mock implements it",
    status: "Verified",
    href: LINKS.firstWeek.openapi,
  },
  {
    project: "First Week",
    surface: "Data",
    kind: "Reports",
    claim: "Data provenance is recorded rather than asserted",
    detail:
      "271 schools seeded from a public API; 160 have no region and the screen says so instead of guessing",
    status: "Verified",
    href: LINKS.firstWeek.audit,
  },
  {
    project: "First Week",
    surface: "App",
    kind: "CI",
    claim: "Continuous integration",
    detail:
      "There is none. The repository has no GitHub Actions workflow — the gates run locally through tool/check.sh, and no hosted run backs them",
    status: "Unavailable",
    href: LINKS.firstWeek.check,
  },

  /* -------------------------------------------------------------- Skillr */
  {
    project: "Skillr",
    surface: "—",
    kind: "Source",
    claim: "Nothing is claimed",
    detail:
      "No repository, deployment, build or written artifact for this project could be located. Rather than describe work that cannot be shown, the entry stands empty",
    status: "Unavailable",
  },
]

/* -------------------------------------------------------------- projects */

export type Project = {
  slug: string
  name: string
  /** One sentence, product-level. */
  description: string
  role: string
  stack: string[]
  status: ProjectStatus
  /** Short evidence lines for the home-page snapshot. */
  snapshot: string[]
  /** Kinds shown as chips. Derived from EVIDENCE, never hand-listed. */
  href: string
}

export const PROJECTS: Project[] = [
  {
    slug: "fieldproof",
    name: "FieldProof",
    description:
      "An offline-capable field inspection workflow: capture findings and photographs on site without a network, sync once there is one, and review submitted work from a hosted console.",
    role: "Solo engineer — mobile, database, admin, CI",
    stack: ["Flutter", "Supabase / Postgres", "Next.js", "GitHub Actions"],
    status: "Portfolio project",
    snapshot: [
      "279 mobile tests, 41 admin tests",
      "Row Level Security proven by 183 database assertions",
      "38-assertion smoke against the real hosted project",
      "Installable Android build and a live review console",
    ],
    href: "/projects/fieldproof",
  },
  {
    slug: "one-frame",
    name: "One Frame",
    description:
      "A local-first Android journal: one photograph and one sentence a day, held on the device with no account and no server.",
    role: "Solo engineer — mobile, product, release",
    stack: ["Flutter", "SQLite", "GitHub Actions"],
    status: "Not published",
    snapshot: [
      "220 tests — output committed, repository private",
      "Release build refuses an unsigned artifact",
      "Run and photographed on Android hardware",
    ],
    href: "/projects/one-frame",
  },
  {
    slug: "first-week",
    name: "First Week",
    description:
      "An enrolment checklist for Vietnamese students, written by the cohort before them. Every task carries where its claim came from, and a checklist nobody has filled in yet says so.",
    role: "Solo engineer — contract, data, application",
    stack: ["Flutter", "OpenAPI", "Frozen fixtures"],
    status: "Portfolio project",
    snapshot: [
      "Public repository — the test command reproduces",
      "79 of 80 tests at the current head",
      "14 screens captured on a real device",
      "No CI — stated rather than implied",
    ],
    href: "/projects/first-week",
  },
  {
    slug: "skillr",
    name: "Skillr",
    description:
      "No inspectable artifact for this project could be located, so no scope, stack or contribution is described.",
    role: "Not established",
    stack: [],
    status: "Unverified",
    snapshot: ["No evidence located"],
    href: "/projects/skillr",
  },
]

/* ------------------------------------------------------------- selectors */

export function evidenceFor(project: string): EvidenceRecord[] {
  return EVIDENCE.filter((e) => e.project === project)
}

/**
 * Chips for a project: the distinct evidence kinds it has at least one
 * `Verified` or `Partial` record for. A kind that only ever appears as
 * `Unavailable` earns no chip — that is the "never show a chip unless the
 * evidence exists" rule, enforced rather than remembered.
 */
export function chipsFor(project: string): EvidenceKind[] {
  const kinds = new Set<EvidenceKind>()
  for (const e of evidenceFor(project)) {
    if (e.status === "Verified" || e.status === "Partial") kinds.add(e.kind)
  }
  return (Object.keys(CHIP_LABEL) as EvidenceKind[]).filter((k) =>
    kinds.has(k),
  )
}

export function projectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

/* -------------------------------------------------------------- timeline */

export type TimelineEntry = {
  project: string
  description: string
  what: string[]
  status: VerificationStatus
  href: string | null
  /**
   * ISO year-months, present only when the repository history evidences them.
   * The visible label is derived from these, so the text a reader sees and the
   * datetime a machine reads cannot disagree.
   */
  from?: string
  to?: string
}

export type TimelineYear = { year: string; items: TimelineEntry[] }

export const TIMELINE: TimelineYear[] = [
  {
    year: "2026",
    items: [
      {
        project: "FieldProof",
        from: "2026-08",
        to: "2026-09",
        description:
          "Built from an empty repository to a system with an installable build, a live review console and an acceptance record that names the evidence behind every criterion.",
        what: [
          "Offline draft capture with idempotent sync",
          "Row Level Security enforced and forced, proven by pgTAP",
          "Next.js review console, read-only by policy",
          "Hosted smoke against the real Supabase project",
          "Real-device QA that found a missing submit action",
        ],
        status: "Verified",
        href: "/projects/fieldproof",
      },
      {
        project: "First Week",
        from: "2026-08",
        description:
          "A contract-first Flutter app whose product argument is that a checklist nobody has filled in must look empty rather than plausible.",
        what: [
          "9-operation OpenAPI contract, implemented by an in-process mock",
          "271 schools seeded from a public API and frozen offline",
          "Two deliberately unequal pilot checklists",
          "Device pass that caught a defect the tests missed",
        ],
        status: "Verified",
        href: "/projects/first-week",
      },
      {
        project: "One Frame",
        from: "2026-08",
        description:
          "A local-first Android journal taken to a signed release build and device validation, then deliberately not published.",
        what: [
          "One entry per calendar day, enforced by the database key",
          "Encrypted export and import through the share sheet",
          "Release build gated on the signing key being present",
        ],
        status: "Partial",
        href: "/projects/one-frame",
      },
    ],
  },
  {
    year: "Before 2026",
    items: [
      {
        project: "Employment",
        description:
          "Frontend and product engineering inside teams with customers — FPT Software, GO1, CyberLogitec and CBTW APAC. TypeScript, React, Next.js and Angular on the web; Flutter and React Native on mobile.",
        what: [
          "Work with users behind it, under someone else's repository and release process",
          "No artifact from it is mine to publish, so none is offered here",
        ],
        status: "Historical",
        href: null,
      },
    ],
  },
]
