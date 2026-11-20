<!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:2ade5d9357b4ec1f33dc162bb0d08fd79f479b9ea3f2717bd813692f674c7294 -->

# Smart Campus — Assignment 05

A dependency-free, fictional room availability checker, audited for agent readiness and software risk governance. It filters four rooms by capacity and equipment and checks each room's own schedule. It does not save or create bookings. Current time is fixed at 09:00 (540 minutes); time inputs are integer minutes after midnight, up to 1440.

## Run

Use Node.js 18+ (verified 24.21.0), npm (verified 11.19.0) and Python 3 for serving. No dependency installation is needed.

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Open http://localhost:8000. In the hosted task Preview the registered service binds 0.0.0.0 so the preview proxy can reach it. The Python server is for development only.

```sh
npm run verify
```

Runs syntax checking, 23 tests, then builds the static site into dist/. To serve the build: `python -m http.server 8001 --bind 127.0.0.1 --directory dist`. There is no bundler, true linter, type checker or production backend. Syntax checks do not replace those tools.

## Demonstrate

1. Defaults 660–720: Atlas is Available (touches its 600–660 booking).
2. Change start to 630: immediately Unavailable due to overlap.
3. Set attendees to 0 or 1.5: input error, no selectable rooms. Restore 1.
4. Select Delta: blocked. Select Video conferencing and Speakerphone: only Birch matches.
5. Set attendees to 31: clear no-match state. Test at 360px wide.

## Repository map

| Path | Role |
| --- | --- |
| index.html / styles.css | Entry page and responsive styles |
| src/app.js | DOM rendering, selection and events |
| src/roomData.js | Immutable fictional fixtures |
| src/filtering.js | Capacity, equipment and attendee-domain rules |
| src/bookingRules.js | Time, block and overlap rules |
| src/roomService.js | Pure orchestration boundary |
| tests/ | Node unit and integration tests |
| scripts/ | Syntax verification and static build |
| AGENTS.md | Agent boundaries and review gates |
| docs/assignment-05/ | Current report, risks, decisions and evidence |
| baseline/ and other docs/ files | Preserved historical Assignments 03/04 material |

## Assignment submission

Start with [the audit report](docs/assignment-05/audit-report.md), [acceptance criteria](docs/assignment-05/acceptance-criteria.md), [risk register](docs/assignment-05/risk-register.csv), and [AI evidence](docs/assignment-05/ai-evidence-appendix.md). The pattern decision, background safeguards, and 200–300 word draft reflection are alongside them. Historical README.docx and other Assignment 04 documents are retained as baseline evidence; use the Assignment 05 report for current status.

Baseline: affcffb39d8cd24cad293a808fe9fd290e121c69. Final source is this tree; source export and baseline export accompany the submission bundle. Decision: CONDITIONAL for an educational demo pending student inspection/approval. Not approved for production booking. See report for controls and residual risks.


<!-- /coderabbit-ai-generated:v1 -->