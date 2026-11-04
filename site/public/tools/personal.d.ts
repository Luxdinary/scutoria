export interface Finding { start: number; end: number; kind: string; text: string }
export function detect(text: string): Finding[];
export function placeholderize(text: string, findings: Finding[], labels: Record<string, string>): string;