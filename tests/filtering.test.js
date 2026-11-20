import test from "node:test";
import assert from "node:assert/strict";
import { ROOMS } from "../src/roomData.js";
import { filterRooms } from "../src/filtering.js";

const ids = (criteria) => filterRooms(ROOMS, criteria).map((room) => room.id);

test("F1 includes a room at exact requested capacity", () => assert.deepEqual(ids({ attendees: 6 }), ["A101", "B202", "C303", "D404"]));
test("F1 excludes rooms with insufficient capacity", () => assert.deepEqual(ids({ attendees: 13 }), ["C303"]));
test("F2 requires every selected equipment item", () => assert.deepEqual(ids({ attendees: 1, equipment: ["Video conferencing", "Speakerphone"] }), ["B202"]));
test("F2 does not treat a partial equipment match as sufficient", () => assert.equal(ids({ attendees: 1, equipment: ["Video conferencing", "Recording camera"] }).length, 0));
test("F4 produces no matches for impossible requirements", () => assert.deepEqual(ids({ attendees: 31 }), []));
test("filtering does not mutate the room catalog", () => {
  const before = JSON.stringify(ROOMS);
  filterRooms(ROOMS, { attendees: 8, equipment: ["Display"] });
  assert.equal(JSON.stringify(ROOMS), before);
});


test("invalid attendee counts cannot select rooms", () => {
  for (const attendees of [0, -1, 1.5, NaN, Infinity, -Infinity, Number.MAX_SAFE_INTEGER + 1]) {
    assert.deepEqual(ids({ attendees }), [], `attendees=${attendees}`);
  }
});
test("omitted criteria still return the complete catalog", () => {
  assert.deepEqual(filterRooms(ROOMS), [...ROOMS]);
});
