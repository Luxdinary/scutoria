export function sendReminders(origin?: string, days?: number): Promise<{ dryRun: boolean; due: number; sent: number }>;
