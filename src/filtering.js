/** Returns rooms that satisfy every active capacity and equipment requirement. */
export function filterRooms(rooms, { attendees = 0, equipment = [] } = {}) {
  const requestedEquipment = new Set(equipment);
  return rooms.filter((room) =>
    room.capacity >= attendees &&
    [...requestedEquipment].every((item) => room.equipment.includes(item))
  );
}

export function findRoom(rooms, roomId) {
  return rooms.find((room) => room.id === roomId) ?? null;
}
