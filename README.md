# Smart Campus Room Availability Checker - Assignment 04

This is the Assignment 04 extension of the Assignment 03 room-booking rule prototype. It is a self-contained, dependency-free browser application with Node.js automated tests. All rooms, bookings, and the current time are fictional.

## What is included

- A catalog of four rooms, each with an ID, name, capacity, equipment, blocked state, and independent bookings.
- Capacity and all-required-equipment filtering.
- An immediate room selector with a clear no-results state.
- Availability feedback for the selected room only, retaining AC1-AC5 from Assignment 03.
- Responsive layout down to a 360px viewport through the CSS media query at 600px.
- 21 executable automated tests, including regression, feature, boundary, immutability, and integration checks.

## Run the application

No package installation is required. From this folder, run either command below and open the shown localhost address in a browser:

```powershell
python -m http.server 8000
```

```powershell
npx serve .
```

Then open `http://localhost:8000`. Opening `index.html` directly also works in current browsers that permit local ES modules, but a local server is the more reliable option.

The fixed fictional current time is 540 minutes (09:00). Times are entered as whole minutes after midnight; `1440` represents 24:00.

## Run automated tests

Prerequisite: Node.js 18 or later (verified with Node.js 24.19.0).

```powershell
npm test
```

The recorded execution is in `docs/test-results.txt`.

## Quick manual demonstration

1. Leave the default request at 660-720 and select **Atlas Collaboration Room**. The result is **Available**: it touches, but does not overlap, Atlas's 600-660 booking.
2. Select **Delta Project Room**. The result immediately changes to **Unavailable** because that room is blocked.
3. Select **Video conferencing** and **Speakerphone**. Only Birch Seminar Room remains, proving all selected equipment is required.
4. Change attendees to `31`. The page displays the clear no-matching-rooms state.
5. For an overlap failure, select Birch, set start to `780`, end to `840`, then check. The result is **Unavailable** because this is Birch's booking interval.

## Project layout

```text
baseline/       Preserved Assignment 03 Python source and tests
src/            Final application modules (data, rules, filters, service, UI)
tests/          Node.js executable tests
docs/           Analysis report, AI-use appendix, reflection, and test record
index.html      Browser entry page
styles.css      Responsive presentation
```

## Submission contents

The final source is the root of this folder. The original Python baseline remains in `baseline/` for before/after evidence; it is not required to run the final browser application. See `docs/analysis-refactoring-report.md` for the evidence table and diagrams, `docs/ai-evidence-appendix.md` for the AI-use record, and `docs/ai-reflection.md` for the 200-300 word reflection.
