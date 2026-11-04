// The four memo generators of E11, in the order they appear: NIS2, labelling under Article 50, sign-in security, where to start.
import { nis2 } from './nis2.mjs';
import { labelling } from './labelling.mjs';
import { login } from './login.mjs';
import { start } from './start.mjs';

export const MEMOS = [nis2, labelling, login, start];
export const memoById = (id) => MEMOS.find((m) => m.id === id) ?? null;
