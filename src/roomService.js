import { checkAvailability } from "./bookingRules.js";
import { filterRooms, findRoom } from "./filtering.js";

/** Application boundary: combines catalog selection with the pure rule engine. */
export function getMatchingRooms(rooms, requirements) {
  return filterRooms(rooms, requirements);
}

export function checkSelectedRoom(rooms, roomId, request) {
  const room = findRoom(rooms, roomId);
  return checkAvailability({ ...request, room });
}
