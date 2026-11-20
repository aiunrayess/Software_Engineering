<!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:d8bf679eeb3166c29acc28e92e14a1b2c825a687b16aa58cfe0fd71d3771a236 -->

# Acceptance criteria

Defined against preserved revision affcffb39d8cd24cad293a808fe9fd290e121c69 before source changes.

| ID | Guarantee | Evidence |
| --- | --- | --- |
| A1 | Whole minute times satisfy 0 <= start < end <=1440 and start >540; duration <=120; exactly 120 allowed. | bookingRules.test.js: AC1/AC2 boundaries |
| A2 | Blocked rooms and overlapping intervals rejected; touching endpoints allowed. | bookingRules.test.js AC3/AC4; integration tests |
| A3 | Capacity and every selected equipment item determine room matches; no-match feedback and selected-room schedules preserved. | filtering.test.js, integration.test.js; browser-checks.json |
| A4 | Checking/filtering never mutates catalog or bookings. | AC5 and filtering immutability tests |
| A5 | Clear Available/Unavailable feedback, immediate selection updates and usable 360px layout. | integration/F5, browser smoke and mobile.png |

Repair extensions: explicit zero/negative/fractional/non-finite/unsafe attendee values now return no matches with accessible feedback; omitted filter criteria still return the full catalog. This intentionally tightens previously unspecified invalid input behavior; baseline README describes capacity filtering but never promises accepting invalid counts. Time input now evaluates immediately; the Check button remains. Baseline Assignment 03 plan AC6 requires clear invalid-input feedback. No original booking rule changes.


<!-- /coderabbit-ai-generated:v1 -->