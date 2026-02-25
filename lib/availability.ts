/* eslint-disable @typescript-eslint/no-explicit-any */
import { addMinutes, format, getDay, isWithinInterval, parseISO, setHours, setMinutes } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const TIMEZONE = 'Africa/Maseru'; // UTC+2

// Blocked periods per day (0=Sunday, 1=Monday, ..., 6=Saturday)
const BLOCKED_PERIODS = {
  1: [], // Monday: available all day
  2: [{ start: '00:00', end: '23:59' }], // Tuesday: fully unavailable (in class all day)
  3: [], // Wednesday: all day
  4: [{ start: '00:00', end: '09:00' }], // Thursday: before 9am blocked
  5: [{ start: '00:00', end: '15:00' }], // Friday: 11am-3pm blocked (in class)
  6: [], // Saturday: all
  0: [], // Sunday: all
};

const WORKING_HOURS_START = 9; // 9am
const WORKING_HOURS_END = 19; // 7pm
const SLOT_INTERVAL = 30; // minutes

export function getAvailableSlots(date: string, existingBookings: any[]): string[] {
  const day = getDay(parseISO(date)); // 0=Sun, 1=Mon, etc.
  const blocked = BLOCKED_PERIODS[day as keyof typeof BLOCKED_PERIODS] || [];

  const slots: string[] = [];
  const startTime = setMinutes(setHours(parseISO(date), WORKING_HOURS_START), 0);
  const endTime = setMinutes(setHours(parseISO(date), WORKING_HOURS_END), 0);

  let current = startTime;
  while (current < endTime) {
    if (isSlotFree(current, blocked, existingBookings)) {
      slots.push(format(current, 'HH:mm'));
    }
    current = addMinutes(current, SLOT_INTERVAL);
  }

  return slots;
}

function isSlotFree(start: Date, blocked: { start: string; end: string }[], bookings: any[]): boolean {
  // Check blocked periods
  for (const block of blocked) {
    const blockStart = setMinutes(setHours(start, parseInt(block.start.split(':')[0])), parseInt(block.start.split(':')[1]));
    const blockEnd = setMinutes(setHours(start, parseInt(block.end.split(':')[0])), parseInt(block.end.split(':')[1]));
    if (isWithinInterval(start, { start: blockStart, end: blockEnd })) {
      return false;
    }
  }

  // Check existing bookings (confirmed and pending) — block the exact booked slot
  for (const booking of bookings) {
    if (booking.status === 'confirmed' || booking.status === 'pending') {
      const bookingStart = new Date(booking.startDateTime);
      if (format(start, 'HH:mm') === format(bookingStart, 'HH:mm')) {
        return false;
      }
    }
  }

  return true;
}

export function toUTC(date: string, time: string): Date {
  // Parse the date and time components
  const [hours, minutes] = time.split(':').map(Number);
  const [year, month, day] = date.split('-').map(Number);
  
  // Create UTC date by subtracting Lesotho timezone offset (UTC+2)
  // Local time in Maseru minus 2 hours = UTC time
  const utcDate = new Date(Date.UTC(year, month - 1, day, hours - 2, minutes));
  return utcDate;
}

export function fromUTC(date: Date): { date: string; time: string } {
  const zoned = toZonedTime(date, TIMEZONE);
  return {
    date: format(zoned, 'yyyy-MM-dd'),
    time: format(zoned, 'HH:mm'),
  };
}