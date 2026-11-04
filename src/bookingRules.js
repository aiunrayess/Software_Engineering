/** Booking rules retained from Assignment 03 (AC1-AC5). */
export function isWholeMinute(value) {
  return Number.isInteger(value) && !Number.isNaN(value);
}

export function intervalsOverlap(start, end, bookedStart, bookedEnd) {
  // Strict comparisons mean endpoint-touching intervals are allowed.
  return start < bookedEnd && bookedStart < end;
}

export function checkAvailability({ start, end, now, room }) {
  if (!room) return { available: false, message: "Select a room before checking availability." };
  if (room.blocked) return { available: false, message: `${room.name} is blocked and cannot be booked.` };
  if (!isWholeMinute(start) || !isWholeMinute(end)) {
    return { available: false, message: "Start and end must be whole minutes after midnight." };
  }
  if (!(0 <= start && start < end && end <= 1440)) {
    return { available: false, message: "Use times from 0 to 1440, with the end after the start." };
  }
  if (start <= now) {
    return { available: false, message: "The start time must be later than the fixed current time." };
  }
  if (end - start > 120) {
    return { available: false, message: "A booking may last at most 120 minutes." };
  }
  if (room.bookings.some(({ start: bookedStart, end: bookedEnd }) =>
    intervalsOverlap(start, end, bookedStart, bookedEnd))) {
    return { available: false, message: "This request overlaps an existing booking." };
  }
  return { available: true, message: `${room.name} is available for this time.` };
}
