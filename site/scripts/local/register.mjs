// Local runner for the Lovable code (3 November 2026): registers the module hooks that swap the Worker-only
// runtime pieces (bundled files, Supabase database) for Node equivalents. Used only by `npm run local`.
import { register } from 'node:module';
register('./hooks.mjs', import.meta.url);
