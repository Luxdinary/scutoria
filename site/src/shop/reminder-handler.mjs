import { timingSafeEqual } from 'node:crypto';
import { verifyReminderToken } from '../db.mjs';
import { sendReminders } from './reminders.mjs';
export async function reminderRequest(request, managedSecret = '') {
  const header = request.headers.get('authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token || token.length > 256) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const a = new TextEncoder().encode(token), b = new TextEncoder().encode(managedSecret);
  const managed = b.length > 0 && a.length === b.length && timingSafeEqual(a, b);
  if (!managed && !(await verifyReminderToken(token))) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  try { return Response.json({ success: true, ...await sendReminders() }); }
  catch { console.error('reminders failed'); return Response.json({ error: 'reminders failed' }, { status: 500 }); }
}