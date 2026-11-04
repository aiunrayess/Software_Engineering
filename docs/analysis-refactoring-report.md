# Assignment 04 Analysis, Refactoring, and Quality Evidence

## 1. Baseline analysis and plan

### Repository map provided to the AI assistant

| Baseline area | Purpose | Evidence |
|---|---|---|
| `baseline/booking_v1.py` | Single pure `can_book` availability rule for one implicit room | Assignment 03 source, lines 24-57 |
| `baseline/test_booking_v1.py` | Python `unittest` regression suite for the rule | Assignment 03 source, lines 1-74 |
| `baseline/Assignment_03_Plan.md` | Original AC1-AC6 scope and assumptions | Assignment 03 planning document |

The context also stated that Assignment 04 must preserve AC1-AC6 while adding a four-room catalog, capacity/equipment filtering, selected-room availability, module separation, at least ten tests, and evidence of AI-assisted review.

### Maintainability risks identified before editing

1. **No room domain model:** `baseline/booking_v1.py:24` receives disconnected primitive arguments (`blocked`, `existing`) and cannot represent a room ID, capacity, equipment, or room-specific schedule. Extending it would create a long parameter list and fragile caller logic.
2. **One responsibility in one function:** `baseline/booking_v1.py:24-57` combines input checks, duration validation, blocked-state handling, overlap detection, and user-irrelevant boolean output. This prevents the UI from explaining why a request failed without duplicating rule logic.
3. **No implemented presentation layer:** the baseline package contains only Python logic/tests; the original plan names responsive UI feedback, but no browser UI source exists. Adding presentation code into the rule file would mix browser and domain responsibilities.
4. **No catalog/filter tests:** `baseline/test_booking_v1.py` verifies one room's time rules but cannot detect a filter that accidentally checks the wrong room's bookings.

### Prioritized improvement plan used

1. Preserve the original Python files unchanged in `baseline/` as before-state evidence.
2. Define one immutable fictional room catalog.
3. Extract pure availability and filtering modules, then join them only in a small service boundary.
4. Build a responsive interface that calls those modules and gives textual feedback.
5. Add regression and feature tests before documenting actual results.

## 2. Feature extension evidence

The final `src/roomData.js` contains four independent rooms (A101, B202, C303, D404). Each has all required fields and its own booking data. `src/filtering.js` implements F1 and F2. `src/bookingRules.js` rejects blocked rooms (F3) and checks only the `room.bookings` passed for the selected room. `src/app.js` provides an explicit empty state (F4) and reruns evaluation when a room card is chosen (F5). The browser presentation is responsive below 600px, covering the required 360px narrow-screen condition.

## 3. Before/after design

### Before (Assignment 03)

```text
caller / hypothetical UI
        |
        v
can_book(start, end, now, blocked, existing)
        |
        +-- validation, blocked rule, overlap rule, boolean result
```

### After (Assignment 04)

```text
roomData.js (immutable catalog) --> filtering.js ----> roomService.js <---- app.js / index.html
                                      |                    |
                                      |                    v
                                      +------------> bookingRules.js
                                                        (AC1-AC5)
styles.css --------------------------------------------------> app.js / index.html
```

### Design decisions

1. **Immutable catalog plus pure rule functions.** `ROOMS` is frozen and neither `filterRooms` nor `checkAvailability` changes a room or bookings. This makes AC5 simple to verify and avoids cross-check contamination.
2. **Service boundary instead of UI-owned rules.** `roomService.js` chooses the room and delegates to the availability rule. Consequently, the UI does not inspect booking arrays itself, and the integration test can prove the selected room's own schedule is used.
3. **Structured availability result.** The rule returns `{ available, message }` rather than a bare boolean. The boolean behavior is retained while one authoritative module supplies accessible, clear failure feedback required by AC6.

## 4. Automated testing evidence

Run `npm test`. The actual command, environment, and result are recorded in `test-results.txt`: 21 passed of 21, 0 failed. The suite includes AC1-AC5 regression checks, F1-F5 checks, the 120/121 boundary, endpoint touching versus overlap, exact versus insufficient capacity, immutability, and three service-level integration behaviors.

## 5. Quality comparison

| Measure | Original | Final | How measured |
|---|---:|---:|---|
| Automated tests passed / total | Baseline result record: 11/11 | 21/21 | Actual `npm test` result in `test-results.txt` |
| Duplicated logic locations removed | 0 | 0 | Baseline had one availability implementation, not duplicated logic; the final design keeps one rule implementation rather than inventing a removal metric |
| Modules/components and responsibilities | 1 rule module | 4 JS domain/app modules + HTML/CSS UI | File inspection: data, rules, filters, service, presentation are separated |
| Remaining limitation | Single-day, fixed-now fictional prototype | Same intentional limitation | The app has no database, live clock, authentication, or booking creation, as required by scope |

## AI suggestion reviewed and modified

One generated direction was to place capacity and equipment checks inside the availability function. It was rejected because filtering answers *which rooms to display*, while availability answers *whether one chosen room can host a time interval*. Combining them would make the original rule harder to reuse and would obscure F5. The final design keeps them separate and proves their connection with an integration test.
