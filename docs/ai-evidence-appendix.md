# AI Evidence Appendix

## AI-use record

| Field | Record |
|---|---|
| AI assistant | OpenAI Codex (GPT-5-based coding assistant) |
| Date used | 2026-11-05 |
| Tool role | Repository inspection, implementation planning, coding assistance, test design, and review support |
| Private data shared | None; only the supplied assignment brief and local Assignment 03 project were used |

## Selected prompts and outputs used

| Selected prompt | AI output used | Decision made |
|---|---|---|
| “Inspect the Assignment 03 project and map its files, acceptance criteria, existing tests, and maintainability risks before proposing changes.” | Repository map; four risks: no room model, mixed validation responsibilities, no implemented UI, and no catalog/filter regression tests. | Used the map and risks in `analysis-refactoring-report.md`; preserved the original source in `baseline/`. |
| “Propose a small prioritized plan to extend the room checker without breaking AC1-AC6. Do not rewrite unrelated features.” | Five-step plan: preserve baseline, add immutable catalog, separate rules/filtering, add UI, then test/document. | Implemented this sequence and kept scope fictional/offline with no login, database, API, or booking creation. |
| “Design a four-room catalog and filtering behavior for requested capacity and all required equipment, with room-specific bookings.” | Four fictional room records plus F1-F5 behavior and edge cases. | Implemented A101, B202, C303, and D404 in `src/roomData.js`, with independent bookings and a blocked room. |
| “Create executable regression and feature tests, including 120 vs 121 minutes, touching vs overlapping, exact vs insufficient capacity, and a selected-room integration check.” | Test matrix grouping AC1-AC5, F1-F5, boundaries, immutability, and integration behavior. | Implemented 21 Node.js tests in `tests/`; actual result is 21 passed, 0 failed. |
| “Produce the required README, brief analysis/refactoring report, quality comparison, AI evidence, and 200-300 word reflection.” | Deliverable outline and headings. | Produced all requested documents in `README.md` and `docs/`. |

## Concise context supplied to the AI

The assistant received the Assignment 03 Python `can_book` rule, its test file, the original AC1-AC6 criteria, and the Assignment 04 brief. The explicit constraint was to preserve the existing availability behavior while adding a four-room fictional catalog, filters, selected-room checking, module separation, executable tests, and evidence. No private credentials or external data were supplied.

## Problems found and decisions made by human review

| AI output or risk | Human review / change | Verification source |
|---|---|---|
| Suggested combining filtering and booking checks | Rejected. Filtering and availability were kept in separate modules so a chosen room's own bookings remain explicit. | `tests/integration.test.js` selected-room test |
| A time input design could hide `1440` | Used numeric minute inputs, preserving end-of-day `1440` and showing an HH:MM preview. | AC1 end-at-1440 test; UI labels |
| A bare boolean result would not provide AC6 feedback | Returned an availability flag plus an explanatory message from the rule layer. | Browser manual checks; `bookingRules.js` |
| A catalog could be mutated by filtering or checks | Frozen catalog data and added immutability tests. | `filtering.test.js`; `bookingRules.test.js` |

## Independent verification performed

- Compared the new features against the assignment PDF's F1-F5 and required deliverable list.
- Ran the final `npm test` command: 21 passed, 0 failed.
- Used the browser page to check a successful endpoint-touching request, a blocked selected room, all-required-equipment filtering, and the no-match empty state.
- Reviewed the final file structure to confirm that data, rule, filtering, service, and UI responsibilities are separate.
