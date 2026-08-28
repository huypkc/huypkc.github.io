# UIT K2026 — pilot data audit

Revision **1**, `uit-k2026`, audited 2026-08-28.

Every task below answers the question *"why is this in the UIT K2026
checklist?"* with either a real question asked in the group `UIT Khóa 2026
(K21)` or a notice UIT itself published. Nothing is here because freshmen
usually need it.

## Included — 6 tasks

| taskId | title | why it exists | trust | official source | still unknown |
|---|---|---|---|---|---|
| `uit-k2026-chup-hinh-profile` | Chụp hình profile tân sinh viên đúng lịch của ngành | Phòng CTSV published a per-major photo schedule for khóa 2026 | OFFICIAL | `ctsv.uit.edu.vn` — Lịch trình chi tiết … Khóa 2026 | The page writes `25/8 – 28/8` with **no year**, and its own date stamp reads `20/08/2025` on a khóa-2026 article. No year recorded. |
| `uit-k2026-shcd-diemdanh` | Điểm danh Sinh hoạt công dân bằng tài khoản email trường | Two different K2026 students hit the check-in mechanism and could not complete it; a third said you must be signed into Google with the school mail first | COMMUNITY_VERIFIED (×2) | `ctsv.uit.edu.vn` — for the venue only (Hội trường A, Lầu 3 Toà nhà A) | No official page found describes the SHCD attendance mechanism at all — form, closing QR, or when the form closes. The steps are how students described it. |
| `uit-k2026-shcd-thieu-diemdanh` | Nếu bạn có dự SHCD nhưng không điểm danh được | The exact question two students asked, still unanswered | **NEEDS_OFFICIAL_SOURCE** | `ctsv.uit.edu.vn` — for the published contact address only | Whether CTSV accepts evidence to restore attendance, any deadline for sending it, and what missing SHCD attendance actually costs. A student asked that last one in the group and nobody answered. |
| `uit-k2026-nhan-the-sv` | Nhận thẻ sinh viên, giấy báo nhập học và quà | Phòng CTSV published the distribution notice for khóa 2026 | OFFICIAL | `ctsv.uit.edu.vn` — Thông báo về việc phát Thẻ sinh viên … khóa 2026 | The notice is dated 24/08/2026 but gives the window as **`25/08/2024 – 28/08/2024`**. Almost certainly a year typo. Recorded verbatim; not corrected to 2026, and no machine deadline set. |
| `uit-k2026-anh-the-sv` | Kiểm tra ảnh sẽ dùng cho thẻ sinh viên | A K2026 student asked whether the card uses the THPT exam photo or the one uploaded to the school site, and whether it can be changed | **NEEDS_OFFICIAL_SOURCE** | three UIT pages attached as context — none answers it | Which photo ends up on the card, and whether it can be changed. The card notice does not say; the schedule page has a photo session but does not link it to the card. |
| `uit-k2026-thi-xeplop-tienganh` | Thi xếp lớp tiếng Anh đầu vào | The Trung tâm Ngoại ngữ's own page posted about it in the group, and the school publishes the procedure | OFFICIAL | `celuit.edu.vn` — hướng dẫn đề thi mẫu; `forum.uit.edu.vn` — staff answers for 2026; `ctsv.uit.edu.vn` — the SHCD clash rule | No date, time or room found for the 2026 sitting. Exemption depends on certificate score and programme, but no page publishes the conversion table. |

Three tasks are OFFICIAL, one is COMMUNITY_VERIFIED, two are
NEEDS_OFFICIAL_SOURCE. **`datedCount` is 0** — not one confirmed deadline is
claimed, so the app tells students the checklist is young before they rely
on it.

## Official sources found

| id | url | publisher | read |
|---|---|---|---|
| `src-ctsv-lichtrinh` | `ctsv.uit.edu.vn/bai-viet/lich-trinh-chi-tiet-danh-cho-tan-sinh-vien-khoa-2026` | Phòng Công tác Sinh viên | 2026-08-28 |
| `src-ctsv-thesv` | `ctsv.uit.edu.vn/bai-viet/thong-bao-ve-viec-phat-sinh-vien-giay-bao-nhap-hoc-va-qua-tang-cho-sinh-vien-khoa-2026` | Phòng Công tác Sinh viên | 2026-08-28 |
| `src-ctsv-lienhe` | `ctsv.uit.edu.vn/` | Phòng Công tác Sinh viên | 2026-08-28 |
| `src-cfl-huongdan-av` | `celuit.edu.vn/huongdan-av` | Trung tâm Ngoại ngữ | 2026-08-28 |
| `src-forum-av-2026` | `forum.uit.edu.vn/t/ki-thi-tieng-anh-dau-vao-2026/162229` | Diễn đàn UIT (staff answers) | 2026-08-28 |

No SEO blog, aggregator or student site is cited. `forum.uit.edu.vn` is the
school's own forum and the answers used are a staff member's, but its source
note says plainly that this is a staff reply, not a numbered notice.

## Rejected — and why

| candidate | seen in | why it is not in the checklist |
|---|---|---|
| "Kiểm tra size áo, đổi với bạn cùng khóa" | a student asking to swap an M for an L | A trade post is not a question about a procedure, and no official page found says a shirt is issued or can be exchanged. Encoding it would be "sounds useful for freshmen". |
| "Dán ảnh khác lên thẻ sinh viên" | a reply under the student-card question | A joke. Encoding a joke as procedure is exactly the failure this pilot is testing against. The observation records *that the replies were jokes*, so the gap stays visible. |
| "Cập nhật dữ liệu sinh viên năm 2026" | two CTSV notices | Official and recent, but nothing shows it is a khóa-2026 freshman step rather than an all-student one, and the notices were not read. Not added on a guess. |
| Everything else in the capture | group feed | Chat sidebar, ads and social chatter. No procedural content. |

## Privacy

No name, avatar, profile link or user id from the capture appears anywhere in
`data/`. Observations carry only `kind`, `group`, `observedAt` and a neutral
`summary`. `ChecklistCodec` throws `SchemaViolation` on a personal key rather
than stripping it, and `tool/check-data.py` fails the same way, so this cannot
be reintroduced quietly. Community advice reproduced as a `tip` is attributed
to *"Một bạn trong nhóm K2026"* and to nobody in particular.

## What would move a task up

`uit-k2026-shcd-thieu-diemdanh` and `uit-k2026-anh-the-sv` become
COMMUNITY_VERIFIED or OFFICIAL the moment somebody submits an official source
through **Đóng góp**. That submission is a proposal — it does not touch this
file. A reviewer merges it, `revision` goes to 2, and every installed plan
picks it up through **Kiểm tra cập nhật** with completions, notes and
reminders intact. That loop is the thing this pilot exists to test.
