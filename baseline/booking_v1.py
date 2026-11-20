"""Room booking availability checker.

Pure function: can_book(start, end, now, blocked, existing) -> bool.

Contract:
    start, end, now : integer minutes after midnight.
    now             : valid, 0..1439 (caller guarantees this).
    blocked         : bool, True rejects all requests.
    existing        : list of (start, end) tuples; may be empty/unsorted.

Acceptance criteria:
    AC1  0 <= start < end <= 1440 and start > now.
    AC2  end - start <= 120 (120 allowed).
    AC3  blocked -> reject.
    AC4  reject overlap with any existing booking; touching endpoints
         (start == booked_end or end == booked_start) do NOT overlap.
    AC5  return True only when valid; never modify any input.

Input hardening (approved extension, does not change AC meaning):
    start/end that are bool, float, str, or None are treated as invalid
    and return False instead of raising. now and blocked are trusted per
    the contract; existing is assumed to be a list of tuples.
"""

def _valid_minute(value) -> bool:
    """True only for a genuine int in the minute domain (excludes bool)."""
    # bool is a subclass of int in Python, so reject it explicitly.
    if isinstance(value, bool):
        return False
    if not isinstance(value, int):
        return False
    return True

def can_book(start, end, now, blocked, existing) -> bool:
    """Return True iff the booking request satisfies AC1-AC4 and is not blocked.

    Does not mutate any input. See module docstring for the full contract.
    """
    # AC3: a blocked room rejects every request. Checked first because it is
    # cheap and independent of the time values.
    if blocked:
        return False

    # Input hardening for start/end: bool, float, str, None -> invalid.
    # `now` is contractually valid and trusted; we do not type-check it.
    if not _valid_minute(start) or not _valid_minute(end):
        return False

    # AC1: range and ordering, with start strictly after now.
    if not (0 <= start < end <= 1440):
        return False
    if not (start > now):
        return False

    # AC2: duration at most 120 minutes; exactly 120 is allowed.
    if (end - start) > 120:
        return False

    # AC4: reject overlap with any existing booking. Strict inequalities so
    # that intervals touching only at an endpoint are not treated as overlap.
    # We iterate `existing` as given; never sort or copy in a way that would
    # reflect mutation back to the caller (we don't mutate at all).
    for booked_start, booked_end in existing:
        if start < booked_end and booked_start < end:
            return False

    # AC5: all checks passed; request is valid and no input was modified.
    return True
