import test from "node:test";
import assert from "node:assert/strict";
import { ROOMS } from "../src/roomData.js";
import { getMatchingRooms, checkSelectedRoom } from "../src/roomService.js";

test("integration: filtered selection checks the selected room's own bookings", () => {
  const rooms = getMatchingRooms(ROOMS, { attendees: 12, equipment: ["Video conferencing", "Speakerphone"] });
  assert.deepEqual(rooms.map((room) => room.id), ["B202"]);
  const result = checkSelectedRoom(ROOMS, "B202", { start: 780, end: 840, now: 540 });
  assert.equal(result.available, false);
  assert.match(result.message, /overlaps/i);
});

test("integration/F3: a selected blocked room is unavailable", () => {
  const result = checkSelectedRoom(ROOMS, "D404", { start: 660, end: 720, now: 540 });
  assert.equal(result.available, false);
  assert.match(result.message, /blocked/i);
});

test("integration/F5: changing the selected room changes the result", () => {
  const a101 = checkSelectedRoom(ROOMS, "A101", { start: 600, end: 660, now: 540 });
  const b202 = checkSelectedRoom(ROOMS, "B202", { start: 600, end: 660, now: 540 });
  assert.equal(a101.available, false);
  assert.equal(b202.available, true);
});
