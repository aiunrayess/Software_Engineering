/** Returns rooms that satisfy every active capacity and equipment requirement. */
export function filterRooms(rooms, { attendees = 1, equipment = [] } = {}) {
  // Explicit invalid counts must never produce a bookable room selection.
  if (!Number.isSafeInteger(attendees) || attendees < 1) return [];
  const requestedEquipment = new Set(equipment);
  return rooms.filter((room) =>
    room.capacity >= attendees &&
    [...requestedEquipment].every((item) => room.equipment.includes(item))
  );
}

export function findRoom(rooms, roomId) {
  return rooms.find((room) => room.id === roomId) ?? null;
}
