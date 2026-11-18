export const workshopSchedule = {
  "more-than-human-xr": { time: "09:00–12:00", room: "Meeting Room 1" },
  "healing-renewal": { time: "09:00–12:00", room: "Meeting Room 2" },
  baticloud: { time: "14:00–17:00", room: "Meeting Room 1" },
  "sandbox-world-building": { time: "14:00–17:00", room: "Meeting Room 2" },
} as const;

export type WorkshopId = keyof typeof workshopSchedule;
