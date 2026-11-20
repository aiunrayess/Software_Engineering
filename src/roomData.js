/** Fictional Smart Campus catalog. Booking data is intentionally immutable. */
function freezeRoom(room) {
  Object.freeze(room.equipment);
  room.bookings.forEach(Object.freeze);
  Object.freeze(room.bookings);
  return Object.freeze(room);
}

export const ROOMS = Object.freeze([
  freezeRoom({
    id: "A101",
    name: "Atlas Collaboration Room",
    capacity: 6,
    equipment: ["Display", "Whiteboard", "Video conferencing"],
    blocked: false,
    bookings: Object.freeze([{ start: 600, end: 660 }])
  }),
  freezeRoom({
    id: "B202",
    name: "Birch Seminar Room",
    capacity: 12,
    equipment: ["Display", "Whiteboard", "Video conferencing", "Speakerphone"],
    blocked: false,
    bookings: Object.freeze([{ start: 780, end: 840 }])
  }),
  freezeRoom({
    id: "C303",
    name: "Cedar Lecture Studio",
    capacity: 30,
    equipment: ["Display", "Whiteboard", "Recording camera", "Speakerphone"],
    blocked: false,
    bookings: Object.freeze([{ start: 570, end: 630 }])
  }),
  freezeRoom({
    id: "D404",
    name: "Delta Project Room",
    capacity: 8,
    equipment: ["Display", "Whiteboard"],
    blocked: true,
    bookings: Object.freeze([{ start: 900, end: 960 }])
  })
]);

export const EQUIPMENT_OPTIONS = Object.freeze([
  "Display", "Whiteboard", "Video conferencing", "Speakerphone", "Recording camera"
]);
