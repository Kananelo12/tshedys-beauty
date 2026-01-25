import { addHours, addMinutes, format, getDay, isWithinInterval, parseISO, setHours, setMinutes, startOfDay } from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';

const TIMEZONE = 'Africa/Maseru'; // UTC+2

// Blocked periods per day (0=Sunday, 1=Monday, ..., 6=Saturday)
const BLOCKED_PERIODS = {
  1: [], // Monday: available all day
  2: [{ start: '07:00', end: '17:00' }], // Tuesday: 7am-5pm blocked
  3: [], // Wednesday: all
  4: [{ start: '00:00', end: '09:00' }], // Thursday: before 9am blocked
  5: [{ start: '11:00', end: '15:00' }], // Friday: 11am-3pm blocked
  6: [], // Saturday: all
  0: [], // Sunday: all
};

const WORKING_HOURS_START = 8; // 8am
const WORKING_HOURS_END = 20; // 8pm
const SLOT_INTERVAL = 30; // minutes

export function getAvailableSlots(date: string, serviceDuration: number, existingBookings: any[]): string[] {
  const day = getDay(parseISO(date)); // 0=Sun, 1=Mon, etc.
  const blocked = BLOCKED_PERIODS[day as keyof typeof BLOCKED_PERIODS] || [];

  const slots: string[] = [];
  const startTime = setMinutes(setHours(parseISO(date), WORKING_HOURS_START), 0);
  const endTime = setMinutes(setHours(parseISO(date), WORKING_HOURS_END), 0);

  let current = startTime;
  while (current < endTime) {
    const slotEnd = addMinutes(current, serviceDuration);
    if (slotEnd <= endTime && isSlotAvailable(current, slotEnd, blocked, existingBookings)) {
      slots.push(format(current, 'HH:mm'));
    }
    current = addMinutes(current, SLOT_INTERVAL);
  }

  return slots;
}

function isSlotAvailable(start: Date, end: Date, blocked: { start: string; end: string }[], bookings: any[]): boolean {
  // Check blocked periods
  for (const block of blocked) {
    const blockStart = setMinutes(setHours(start, parseInt(block.start.split(':')[0])), parseInt(block.start.split(':')[1]));
    const blockEnd = setMinutes(setHours(start, parseInt(block.end.split(':')[0])), parseInt(block.end.split(':')[1]));
    if (isWithinInterval(start, { start: blockStart, end: blockEnd }) || isWithinInterval(end, { start: blockStart, end: blockEnd })) {
      return false;
    }
  }

  // Check existing bookings (confirmed and pending)
  for (const booking of bookings) {
    if (booking.status === 'confirmed' || booking.status === 'pending') {
      const bookingStart = new Date(booking.startDateTime);
      const bookingEnd = new Date(booking.endDateTime);
      if (start < bookingEnd && end > bookingStart) {
        return false;
      }
    }
  }

  return true;
}

export function toUTC(date: string, time: string): Date {
  const local = parseISO(`${date}T${time}:00`);
  return fromZonedTime(local, TIMEZONE);
}

export function fromUTC(date: Date): { date: string; time: string } {
  const zoned = toZonedTime(date, TIMEZONE);
  return {
    date: format(zoned, 'yyyy-MM-dd'),
    time: format(zoned, 'HH:mm'),
  };
}