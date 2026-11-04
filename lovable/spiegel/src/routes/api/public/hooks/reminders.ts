// Daily licence reminders: sends one mail fourteen days before a licence ends.
// Called by a scheduled job (pg_cron + pg_net) with the reminder secret as bearer token.
// The schedule stays off until the mail service is configured in stage 5.
// To switch it on, run this SQL once (via the database tool), with the real values filled in:
//   select cron.schedule('licence-reminders-daily', '0 6 * * *', $$
//     select net.http_post(
//       url := 'https://project--1f1d2707-b98b-48de-8831-f1b78ea4bf6c.lovable.app/api/public/hooks/reminders',
//       headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer <REMINDER_SECRET>'),
//       body := '{}'::jsonb);
//   $$);
// The job only sends reminder mails for licences that are due; it is idempotent per licence.
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/public/hooks/reminders')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env['REMINDER_SECRET']
        if (!secret) {
          return Response.json({ error: 'not configured' }, { status: 503 })
        }
        const token = request.headers.get('authorization')?.replace('Bearer ', '')
        if (!token || token !== secret) {
          return Response.json({ error: 'Unauthorized' }, { status: 401 })
        }
        try {
          const { sendReminders } = await import('@/legacy/shop/reminders.mjs')
          const sent = await sendReminders()
          return Response.json({ success: true, sent })
        } catch (e) {
          console.error('reminders', e)
          return Response.json({ error: 'reminders failed' }, { status: 500 })
        }
      },
    },
  },
})
