# Project Plan: Room Booking Availability Checker

## Scope
Develop a single responsive frontend page for a single fictional room. 

The application allows users to input:
- Start time (in minutes after midnight)
- End time (in minutes after midnight)
- Current time (`now`, in minutes after midnight)
- Room status (a checkbox indicating if the room is blocked)

The interface evaluates inputs and displays either **Available** or **Unavailable**. 

### Out of Scope
- Creating or confirming actual bookings
- User authentication or login
- Backend server or database
- External APIs or payment integration

---

## Acceptance Criteria

| ID | Criteria |
| :--- | :--- |
| **AC1** | Times must be expressed as whole minutes past midnight, satisfying $0 \le \text{start} < \text{end} \le 1440$, where `start` must be strictly greater than `now` ($\text{start} > \text{now}$). |
| **AC2** | Booking duration ($\text{end} - \text{start}$) must be at most 120 minutes ($\text{duration} \le 120$). Exactly 120 minutes is permitted. |
| **AC3** | If the room is marked as blocked, any booking request must be rejected. |
| **AC4** | Requests overlapping with existing bookings must be rejected. Touching endpoints (e.g., existing ends at 660 and requested starts at 660) do not constitute an overlap. |
| **AC5** | The application must clearly display an **Available** or **Unavailable** result without mutating the existing bookings list. |
| **AC6** | Invalid inputs must produce clear, user-friendly feedback. The layout must remain fully functional and responsive on narrow screens down to 360px wide. |

---

## Function Contract

```python
can_book(start, end, now, blocked, existing) -> bool
```

### Parameters
- **`start`** (`int`): Requested start time in minutes after midnight.
- **`end`** (`int`): Requested end time in minutes after midnight.
- **`now`** (`int`): Current time in minutes after midnight ($0 \le \text{now} \le 1439$). Assumed valid.
- **`blocked`** (`bool`): `True` if the room is currently blocked, `False` otherwise.
- **`existing`** (`list` of `(start, end)` tuples): List of existing bookings. May be empty or unsorted.

### Return Value
- Returns `True` if all conditions **AC1–AC4** pass; otherwise returns `False`.

### Side Effects & Constraints
- Pure function with no side effects.
- Inputs must not be mutated under any circumstances.

---

## Initial Assumptions

- **A1:** `now` is always a valid integer between $0$ and $1439$ (per project brief).
- **A2:** Existing bookings in the system are well-formed ($\text{start} < \text{end}$, within $0..1440$).
- **A3:** Non-integer inputs (`floats`, `strings`, `None`, or `booleans` passed as times) are safely caught and return `False` rather than throwing uncaught exceptions.
- **A4:** Since $now \ge 0$ and $start > now$, a start time of `0` is inherently invalid.
- **A5:** Scope is constrained to a single room across a single 24-hour day.
- **A6:** To accommodate `1440` (midnight at end of day), input fields accept numeric minute values directly rather than standard `HH:MM` time pickers, with dynamic `HH:MM` visual previews rendered beside each field.

---

## Key Potential Failure Points

1. **Endpoint Overlap:** Using `<=` instead of `<` when checking bounds, causing adjacent/touching bookings to incorrectly fail.
2. **Start vs. Now Check:** Using `start < now` instead of `start <= now` to check invalid times, which would incorrectly allow `start == now`.
3. **120-Minute Boundary:** Using `> 120` or `>= 120` incorrectly, which might reject exact 120-minute bookings.
4. **Containment Overlap:** Naive checks that only verify if request endpoints fall within an existing booking, missing cases where a request completely envelops an existing booking (e.g., requested `590–670` over existing `600–660`).
5. **Mutation Risks:** In-place modifications like calling `existing.sort()` which mutate caller state.
6. **Day Boundary:** Improperly clamping upper bounds ($end < 1440$ instead of $end \le 1440$), incorrectly rejecting bookings ending at midnight (`1440`).
7. **UI Edge Cases:** Empty form fields evaluated as `0`, inability to input `1440`, or relying solely on color indicators without text labels for state results.

---

## Verification Plan

### Automated Testing
- Unit testing for the core `can_book` logic across all edge cases covering **AC1–AC4**.
- Verification that original data structures passed into `can_book` retain strict immutability.

### Manual Verification
- **UI & Layout:** Verify clear text states (Available/Unavailable) and error feedback messages on small mobile viewports (360px).
- **Network Isolation:** Confirm zero network traffic via browser DevTools.
- **State Integrity:** Ensure existing booking lists remain unaltered across repeated validation runs.