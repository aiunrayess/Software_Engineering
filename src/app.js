import { EQUIPMENT_OPTIONS, ROOMS } from "./roomData.js";
import { getMatchingRooms, checkSelectedRoom } from "./roomService.js";

const NOW = 540; // Fixed fictional current time: 09:00.
let selectedRoomId = "A101";

const byId = (id) => document.getElementById(id);
const requirements = () => ({
  attendees: Number(byId("attendees").value),
  equipment: [...document.querySelectorAll("input[name='equipment']:checked")].map((input) => input.value)
});
const minuteValue = (id) => {
  const value = byId(id).value.trim();
  return value === "" ? Number.NaN : Number(value);
};

function timeLabel(minutes) {
  if (!Number.isInteger(minutes) || minutes < 0 || minutes > 1440) return "Invalid minute value";
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

function updateTimePreviews() {
  byId("start-preview").textContent = timeLabel(minuteValue("start"));
  byId("end-preview").textContent = timeLabel(minuteValue("end"));
}

function setResult({ available, message }, style = available ? "available" : "unavailable") {
  const result = byId("result");
  result.className = `result ${style}`;
  result.innerHTML = `<strong>${available ? "Available" : "Unavailable"}</strong><span>${message}</span>`;
}

function renderRooms() {
  const rooms = getMatchingRooms(ROOMS, requirements());
  const list = byId("room-list");
  if (rooms.length === 0) {
    selectedRoomId = null;
    list.innerHTML = `<div class="empty-state"><strong>No rooms match these requirements.</strong><span>Try fewer attendees or remove equipment filters.</span></div>`;
    setResult({ available: false, message: "There is no matching room to check." }, "neutral");
    return;
  }
  if (!rooms.some((room) => room.id === selectedRoomId)) selectedRoomId = rooms[0].id;
  list.innerHTML = rooms.map((room) => `<button class="room-card ${room.id === selectedRoomId ? "selected" : ""}" data-room-id="${room.id}" type="button" aria-pressed="${room.id === selectedRoomId}">
    <span class="room-title">${room.name}</span><span class="room-id">${room.id}</span>
    <span>${room.capacity} attendees${room.blocked ? " - Blocked" : ""}</span>
    <span class="equipment">${room.equipment.join(" · ")}</span>
  </button>`).join("");
  list.querySelectorAll("[data-room-id]").forEach((card) => card.addEventListener("click", () => {
    selectedRoomId = card.dataset.roomId;
    renderRooms();
    evaluate(); // F5: a selection immediately refreshes the displayed result.
  }));
}

function evaluate() {
  updateTimePreviews();
  if (!selectedRoomId) return;
  setResult(checkSelectedRoom(ROOMS, selectedRoomId, {
    start: minuteValue("start"), end: minuteValue("end"), now: NOW
  }));
}

function renderEquipmentFilters() {
  byId("equipment-filters").innerHTML = EQUIPMENT_OPTIONS.map((item) =>
    `<label><input type="checkbox" name="equipment" value="${item}"> ${item}</label>`
  ).join("");
}

renderEquipmentFilters();
byId("now").textContent = timeLabel(NOW);
byId("check").addEventListener("click", evaluate);
byId("attendees").addEventListener("input", () => { renderRooms(); evaluate(); });
document.querySelectorAll("input[name='equipment']").forEach((input) => input.addEventListener("change", () => { renderRooms(); evaluate(); }));
byId("start").addEventListener("input", updateTimePreviews);
byId("end").addEventListener("input", updateTimePreviews);
renderRooms();
evaluate();
