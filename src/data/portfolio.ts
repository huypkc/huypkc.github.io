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
      "pgTAP suite — 183 assertions across 9 files, run three times per CI pass. Covers silent denials, not only raised errors",
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
      "Hosted Supabase smoke — 38 tests through real Auth, real RLS and real Storage, not fakes",
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
      "openapi.yaml — 9 operations, each answering one thing a screen does, so a screen cannot ask for something the contract does not define",
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

/**
 * A project card reads in one order, and the order is the point:
 *
 *   outcome    what it is for, in a line a non-engineer finishes reading
 *   context    who has the problem, and what becomes possible
 *   guarantee  the architecture translated into a promise
 *   proof      the numbers, as supporting metadata rather than a headline
 *
 * A number never leads. Every `guarantee` below is narrow enough to be false
 * if the code changed, and every `proof` entry has a record in EVIDENCE.
 */
export type Project = {
  slug: string
  name: string
  /** Product outcome. The card's headline. No metric, no hedge. */
  outcome: string
  /** Who it is for, the problem, what becomes possible. One or two sentences. */
  description: string
  /** One sentence turning an architectural fact into an understandable promise. */
  guarantee: string
  role: string
  stack: string[]
  status: ProjectStatus
  /** Compact supporting proof. Short enough to sit on one wrapped row. */
  proof: string[]
  href: string
}

export const PROJECTS: Project[] = [
  {
    slug: "fieldproof",
    name: "FieldProof",
    outcome: "Field work that survives bad connectivity.",
    description:
      "Inspectors record findings on sites with no signal. The work syncs once a connection returns, freezes when it is handed in, and the office reviews it — photographs and all — from a hosted console.",
    guarantee:
      "Who owns a record, what the office may read, and the freeze on submitted work are all enforced by row-level policy in Postgres — not by the app, so they hold even when the app is bypassed.",
    role: "Solo engineer — mobile, database, admin, CI",
    stack: ["Flutter", "Supabase / Postgres", "Next.js", "GitHub Actions"],
    status: "Portfolio project",
    proof: [
      "Offline drafts",
      "279 mobile tests",
      "183 database assertions",
      "Live review console",
    ],
    href: "/projects/fieldproof",
  },
  {
    slug: "one-frame",
    name: "One Frame",
    outcome: "A journal that never leaves the phone.",
    description:
      "One photograph and one sentence a day, for someone who wants the habit without handing their life to a server. There is no account and no upload — and uninstalling loses it, which the app says on the first screen.",
    // Scoped to the release build on purpose: the debug and profile manifests
    // do declare INTERNET so the Flutter tooling can attach. Only the release
    // manifest omits it, and that is what the published policy claims too.
    guarantee:
      "Private by manifest, not by promise — the release build declares no INTERNET permission, so the app has no route off the device at all.",
    role: "Solo engineer — mobile, product, release",
    stack: ["Flutter", "SQLite", "GitHub Actions"],
    status: "Not published",
    proof: [
      "220 tests",
      "Release refuses an unsigned build",
      "Run on Android hardware",
      "Repository private",
    ],
    href: "/projects/one-frame",
  },
  {
    slug: "first-week",
    name: "First Week",
    outcome: "A checklist that will not invent a deadline.",
    description:
      "Vietnamese first-years piece their enrolment week together from school notices, group chats and the year above. First Week puts one cohort's steps in a single list and shows what stands behind each one — including the steps nobody has answered yet.",
    // Narrow on purpose: the constructor throws only for Trust.official with no
    // official source. Tasks at weaker trust levels may ship with none, and six
    // NTTU tasks do — so "no source at all" would be false.
    guarantee:
      "A step marked official cannot be constructed without the school's own page attached — the model throws, so a guess can never reach the screen wearing the school's authority.",
    role: "Solo engineer — contract, data, application",
    stack: ["Flutter", "OpenAPI", "Bundled + cached data"],
    status: "Portfolio project",
    proof: [
      "Public repository",
      "79 of 80 tests at HEAD",
      "14 screens on a real device",
      "No CI",
    ],
    href: "/projects/first-week",
  },
  {
    slug: "skillr",
    name: "Skillr",
    // No outcome and no guarantee: there is no artifact, so there is nothing to
    // headline. The card states the absence once, quietly, and the Evidence
    // index carries the full record — rather than making "no evidence" the
    // loudest thing in the grid.
    outcome: "",
    description:
      "Listed for inclusion in this portfolio. No repository, deployment, build or written artifact could be reached, so no scope, stack or contribution is described here.",
    guarantee: "",
    role: "Not established",
    stack: [],
    status: "Unverified",
    proof: [],
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
          "9-operation OpenAPI contract fixing what each screen may ask for",
          "271 schools seeded once from a public API and committed",
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
          "Frontend and product engineering inside teams with customers — FPT Software (2014), GO1 (2016), CyberLogitec (2018) and Positive Thinking Company / CBTW (2022–2025). TypeScript, React, Next.js and Angular on the web; Flutter and React Native on mobile.",
        what: [
          "Work with users behind it, under someone else's repository and release process",
          "Roles and dates are on the CV; no artifact from it is mine to publish",
        ],
        status: "Historical",
        href: null,
      },
    ],
  },
]
