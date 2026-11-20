<!-- coderabbit-ai-generated:v1 -->

# Assignment 05 — Repository audit and release report

Prepared with CodeRabbit Agent • 19 November 2026 • Repository: aiunrayess/Software_Engineering

## Executive summary
The existing Smart Campus availability checker is a small, non-sensitive software repository with working code and testable behavior. It uses only fictional fixtures. The assignment does not require replacing it. Two verified correctness defects were repaired: invalid attendee counts and stale results after time edits. A root agent instruction file, syntax gate and reproducible static export were added. There are no new runtime dependencies.

**Decision: CONDITIONAL for an educational demonstration.** The agent's checks pass. Independent student inspection, reproduction and approval are outstanding and cannot be represented as completed by an assistant. Production booking is outside scope: there is no persistence, concurrency protection, authentication or actual booking command.

## 1. Baseline and context (Task 01)
Baseline commit: `affcffb39d8cd24cad293a808fe9fd290e121c69`. Baseline source is preserved in the accompanying assignment-05-baseline.tar; Git history and baseline/ also remain intact. The final source snapshot is supplied in the submission ZIP and identified by submission-manifest.json content hashes. The baseline export was created with `git archive HEAD -o /home/vercel-sandbox/workspace/output/assignment-05-baseline.tar` before editing source.

Repository map: index.html loads src/app.js, which reads roomData.js and calls roomService.js. The service delegates to filtering.js and bookingRules.js. Tests cover these pure modules through Node's built-in runner. styles.css handles presentation; package.json defines commands. No npm runtime/development dependencies, package installation, lockfile, external APIs, environment variables, database or credentials are required. No lockfile is necessary for this dependency-free package. scripts/check.mjs and scripts/build.mjs are new final-version tooling.

Five preservation criteria are in acceptance-criteria.md: time bounds/duration, blocking/overlap, filtering/selected schedules, immutability, clear responsive feedback. They derive from the baseline plan, README and tests. Explicit invalid attendee inputs now have a narrower accepted domain; this is disclosed as an intentional repair of unspecified invalid-input behavior. Omitted filtering requirements preserve the full catalog.

### Baseline execution and weaknesses
Working directory for repository commands: repository root. Environment: Ubuntu 26.04.1, Node v24.21.0, npm 11.19.0, Python 3.14.4.

| Exact command | Actual result | Evidence |
| --- | --- | --- |
| npm test | Exit 0; 21 tests, 21 pass, 0 fail | evidence/baseline-tests.txt |
| npm run lint | Exit 1; Missing script: lint | evidence/baseline-lint.txt |
| npm run build | Exit 1; Missing script: build | evidence/baseline-build.txt |
| node --input-type=module (filter reproduction) | Exit 0; -1, 0, 1.5 each return four rooms; Infinity none | evidence/baseline-risks.txt |
| Chromium: fill #start with 630 after default load | Still Available despite overlapping Atlas | evidence/baseline-stale-result.png |

Three concrete baseline weaknesses are the invalid filter boundary (R1), stale UI result (R2) and absent agent instructions (R3). Missing lint/build commands add R4. Absence of a build is not intrinsically a defect for a static site; the missing repeatable export/check gate is the readiness concern. No baseline true type checker exists. Historical Assignment 04 logs were not substituted for this run's evidence.

## 2. Agent customization (Task 02)
Root AGENTS.md documents purpose, module boundaries, setup, conventions, commands, original invariants and tests. It prohibits secrets, production deployment, destructive actions, history rewriting, remote deletion and unreviewed dependency changes. Human review precedes merge/deployment. It was created during the run and explicitly read for subsequent work; automatic loading at turn start is not claimed. Instructions cannot enforce permissions by themselves.

## 3. Pattern decision (Task 03)
No new design pattern was warranted. Pure rules and filtering already sit behind a small service boundary; Strategy has no second policy and Adapter has no second provider. The permitted no-pattern decision avoids unnecessary structural change. See pattern-decision.md for alternatives and the unchanged before/after module graph. Correctness fixes reuse existing functions.

## 4. Read-only risk review (Task 04)
Before application edits, the assistant proposed seven candidates spanning correctness, agent operations, reproducibility, security, dependency and maintainability. The proposal artifact is evidence/ai-readonly-proposals.txt. Source inspection and reproductions confirmed R1–R4. R5 is plausible only under a future untrusted catalog; no current exploit is asserted. R6's vulnerable-npm-dependency claim and R7's mandatory-pattern claim are unsupported by the present manifest/architecture. The author and verifier were the same assistant; independent human verification remains a submission gate.

## 5. Risk register and ranking (Task 05)
The complete machine-readable register is risk-register.csv. Each row records cause/event/consequence, component/evidence, classification, likelihood and impact, owner, mitigation, verification and residual risk. Scores are ordinal judgment, not statistical measurements: likelihood 1 = low/exposure-limited, 2 = credible under ordinary changes, 3 = directly repeatable user input; impact 1 = minor, 2 = confusing operation/rework, 3 = materially wrong availability or uncontrolled operations. Score = likelihood × impact.

| ID | Classification | Before L×I | After L×I | Disposition |
| --- | --- | --- | --- | --- |
| R2 | Confirmed correctness | 3×3=9 | 1×3=3 | First corrective priority; immediate time reevaluation |
| R1 | Confirmed correctness | 3×2=6 | 1×2=2 | Second priority; validation and accessible message |
| R3 | Confirmed agent operations | 2×3=6 | 1×3=3 | Instructions added; human enforcement remains |
| R4 | Confirmed reproducibility | 2×2=4 | 1×2=2 | Syntax/build gates added; true lint/types absent |
| R5 | Plausible security | 1×3=3 | 1×3=3 | No untrusted catalog allowed |
| R6 | Unsupported dependency | 1×1=1 | 1×1=1 | Rejected; runtime security not independently audited |
| R7 | Unsupported maintainability | 1×1=1 | 1×1=1 | No new pattern justified |

R1 wins the tie with R3 because it directly affects the current interface; R3 is also addressed by mandatory assignment documentation. Post-change likelihoods reflect reduced exposure, not proof of impossibility. Impacts remain unchanged.

## 6. Agent-readiness audit (Task 06)
**Level 2 — Documented.** Baseline was Level 1. Level 3 is deliberately withheld pending independent approval and repeatable browser automation integrated into CI.

| Area | Evidence / assessment | Remaining evidence or control |
| --- | --- | --- |
| Readable structure | Five small ES modules; explicit service boundary | UI still uses manual templates |
| README accuracy | Current run, verify and export commands; legacy docs labeled historical | Student reproduce from fresh export |
| Reproducibility | No npm dependencies; observed tool versions; static build | No runtime version manager pin; Node >=18 is compatibility declaration, only v24.21.0 tested |
| Tests | 23 pass including 21 preserved tests; 10 Chromium smoke assertions | Browser suite requires task runner and is not npm/CI integrated |
| Lint/types | All 10 source/test/script JS files pass node --check | True linter and static type checker absent, not claimed |
| Build | dist/ exports app assets; HTTP smoke succeeds | No production hosting/header audit |
| Logging | Test/build logs retained; no booking/customer data logs | No production telemetry required for local demo |
| Security | Fictional literal data, no APIs/secrets/dependencies | innerHTML requires reassessment before external data; Python server development only |
| Agent permissions | Root scope, safe commands, forbidden actions and review gates | Instructions are advisory; human approval outstanding |

## 7. Mitigation and verification (Task 07)
### M1 / R1 — Validate attendee domain
Before: `room.capacity >= attendees` accepted negative, zero and fractional counts. After: filtering rejects non-positive/non-safe integers; app.js adds aria-invalid and an associated error. Two appended tests cover invalid classes and omitted defaults; no existing assertion was weakened. Reviewed diff: evidence/mitigation.diff. Compatibility: explicit invalid callers now get []; valid calls and omitted criteria retain behavior. Residual: this is a local checker, not an authoritative server reservation boundary.

### M2 / R2 — Refresh results on time input
Before: start/end listeners only called updateTimePreviews. After: both call existing evaluate(), which refreshes previews and checks the selected room. Check button and room selection remain available. Browser changed start to 630 and observed overlap rejection without clicking Check; restoring 660 became Available. Residual: browser coverage is Chromium only, and the fixture current time is intentionally fixed.

### Final observed checks
| Command / operation | Actual result |
| --- | --- |
| npm run verify | Exit 0; syntax 10 files; tests 23 pass / 0 fail; build succeeds |
| git diff --check | Exit 0; no whitespace errors |
| curl -I http://localhost:8000 | Exit 0; HTTP 200 |
| coderabbit-agent-browser reload then eval of evidence/browser-smoke.js | Exit 0; 10 assertions pass |
| set viewport 360 800; evaluate width versus scrollWidth | Exit 0; width 360, scrollWidth 345; no horizontal overflow |
| coderabbit-agent-browser errors | Exit 0; no page errors reported |

Evidence: final-checks.txt, browser-checks.json, mobile.png and final-desktop.png. Browser execution uses the cloud Chromium attached to task Preview. Replay in a task with its preview registered: `coderabbit-agent-browser open http://localhost:8000`, then `coderabbit-agent-browser eval "$(cat docs/assignment-05/evidence/browser-smoke.js)"`. This shell substitution reads the local authored test script. Plain npm tests need no browser tooling. Standard manual reproduction steps are in README.

Not executed: true lint/type analysis (not configured), other browsers, production deployment, penetration test, runtime CVE audit, independent human checks. Build is a copy/export, not compilation. The exported application was separately smoke checked over HTTP as recorded in packaging-validation.txt.

## 8. Background agent safeguards (Task 08)
background-agent-safeguards.md defines a hypothetical isolated branch/worktree, exact allowed files/commands, 20-minute limit, forbidden operations, required diff/test/build/risk artifacts, stop conditions, review gate and normal revert rollback. No background agent or paid access was used.

## 9. Release decision (Task 09)
**CONDITIONAL: educational local demonstration only.** All five preservation criteria have relevant passing evidence and both top risks have verified mitigations. No unacceptable confirmed defect remains for the bounded fictional demonstration. Residual conditions and owners:

- Student maintainer must inspect source, patch, claims and report, reproduce key tests and approve before submission/merge. Approval has not occurred in this record.
- Future data integration owner must replace/review HTML rendering before allowing untrusted catalog content.
- Student maintainer must keep deployment outside scope until real scheduling, security, persistence and concurrent-booking requirements are separately designed and tested.
- Student maintainer should automate browser regression and add true lint/CI gates before calling the repository Level 3 Agent-ready.

If a preservation criterion fails, withhold release, retain the evidence, repair on an isolated branch, and rerun affected gates. The preserved baseline export supports rollback comparison. Do not erase shared history.

## 10. AI reflection and evidence (Task 10)
See ai-reflection.md for the 200–300 word draft and ai-evidence-appendix.md for tool/date/context, prompt summaries, outputs used, challenged claims and verification sources. Student review must adapt the draft to personal checks actually performed. No exact underlying model identifier or human action was invented.

## Submission checklist and provenance
- Source and baseline export, README and AGENTS.md: supplied.
- Five acceptance criteria, actual baseline/final logs and screenshots: supplied.
- Seven classified risks across six categories, owners/residuals and two mitigation records: supplied.
- Readiness level, no-pattern rationale, safeguards, conditional release and reflection: supplied.
- Independent student review and final approval: outstanding human action.

The assignment PDF requires email submission with subject `Software Engineering - Assignment #05 - Your Surname & Name` to kibo.kz.contact.01@gmail.com, and specifies November 23, 2026 at 23:59:59 (timezone not stated). Do not cc the instructor address (PDF pages 35–38). This task prepares files only; no email was sent. Add your actual name to the email subject and verify final submission formatting against the original PDF.

Prepared by CodeRabbit Agent; machine-generated documentation is marked. PDF/DOCX metadata also identifies AI assistance. Baseline historical documents remain unchanged and are not current execution evidence.
