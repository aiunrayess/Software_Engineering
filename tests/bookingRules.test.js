import test from "node:test";
import assert from "node:assert/strict";
import { checkAvailability, intervalsOverlap } from "../src/bookingRules.js";

const room = Object.freeze({ id: "T1", name: "Test Room", blocked: false, bookings: Object.freeze([{ start: 600, end: 660 }]) });
const request = (overrides = {}) => ({ start: 660, end: 720, now: 540, room, ...overrides });

test("AC1 rejects start at the current time", () => assert.equal(checkAvailability(request({ start: 540, end: 600 })).available, false));
test("AC1 accepts an end at 1440", () => assert.equal(checkAvailability(request({ start: 1320, end: 1440, now: 1000 })).available, true));
test("AC1 rejects reversed and non-whole-minute times", () => {
  assert.equal(checkAvailability(request({ start: 700, end: 650 })).available, false);
  assert.equal(checkAvailability(request({ start: 660.5 })).available, false);
});
test("AC2 accepts exactly 120 minutes", () => assert.equal(checkAvailability(request({ start: 720, end: 840 })).available, true));
test("AC2 rejects 121 minutes", () => assert.equal(checkAvailability(request({ start: 720, end: 841 })).available, false));
test("AC3 rejects a blocked room", () => assert.equal(checkAvailability(request({ room: { ...room, blocked: true } })).available, false));
test("AC4 allows a request touching the end of a booking", () => assert.equal(checkAvailability(request()).available, true));
test("AC4 allows a request touching the start of a booking", () => assert.equal(checkAvailability(request({ start: 570, end: 600 })).available, true));
test("AC4 rejects an overlap", () => assert.equal(checkAvailability(request({ start: 630, end: 690 })).available, false));
test("AC4 rejects a request containing an existing booking", () => assert.equal(checkAvailability(request({ start: 590, end: 670 })).available, false));
test("overlap helper treats endpoint touching as non-overlapping", () => assert.equal(intervalsOverlap(660, 720, 600, 660), false));
test("AC5 leaves booking data unchanged", () => {
  const before = JSON.stringify(room.bookings);
  checkAvailability(request({ start: 630, end: 690 }));
  assert.equal(JSON.stringify(room.bookings), before);
});
