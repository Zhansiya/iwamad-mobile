export type CampusEvent = {
  id: number
  title: string
  date: string
  place: string
  seats: number
}

export const events: CampusEvent[] = [
  {
    id: 1,
    title: 'React Study Night',
    date: '2026-10-28',
    place: 'Room 302',
    seats: 20,
  },
  {
    id: 2,
    title: 'UI/UX Design Workshop',
    date: '2026-11-03',
    place: 'Design Lab',
    seats: 15,
  },
  {
    id: 3,
    title: 'Student Networking Evening',
    date: '2026-11-10',
    place: 'Main Hall',
    seats: 30,
  },
  {
    id: 4,
    title: 'TypeScript Mini Workshop',
    date: '2026-11-14',
    place: 'Room 205',
    seats: 2,
  },
]