// SQLite reference database (the old db.mjs) wrapped so that every function returns a promise, as the Supabase version does.
// Plus stubs for the functions that only exist on Lovable Cloud. Local preview only; never deployed.
import * as old from './db-sqlite.mjs';

export const SESSION_DAYS = old.SESSION_DAYS;
export const addMemoContact = async (...a) => old.addMemoContact(...a);
export const addToWaitlist = async (...a) => old.addToWaitlist(...a);
export const attachRun = async (...a) => old.attachRun(...a);
export const consumeToken = async (...a) => old.consumeToken(...a);
export const countHit = async (...a) => old.countHit(...a);
export const countLicences = async (...a) => old.countLicences(...a);
export const countMemoContacts = async (...a) => old.countMemoContacts(...a);
export const createLicence = async (...a) => old.createLicence(...a);
export const createRun = async (...a) => old.createRun(...a);
export const createSession = async (...a) => old.createSession(...a);
export const createToken = async (...a) => old.createToken(...a);
export const db = old.db;
export const deleteSession = async (...a) => old.deleteSession(...a);
export const findOrCreateCustomer = async (...a) => old.findOrCreateCustomer(...a);
export const freezeRun = async (...a) => old.freezeRun(...a);
export const getCustomer = async (...a) => old.getCustomer(...a);
export const getCustomerByEmail = async (...a) => old.getCustomerByEmail(...a);
export const getRun = async (...a) => old.getRun(...a);
export const getSession = async (...a) => old.getSession(...a);
export const hasLicence = async (...a) => old.hasLicence(...a);
export const hitsSince = async (...a) => old.hitsSince(...a);
export const lastMailTo = async (...a) => old.lastMailTo(...a);
export const licenceBySession = async (...a) => old.licenceBySession(...a);
export const licencesDueForReminder = async (...a) => old.licencesDueForReminder(...a);
export const licencesOf = async (...a) => old.licencesOf(...a);
export const listRuns = async (...a) => old.listRuns(...a);
export const listVersions = async (...a) => old.listVersions(...a);
export const markReminder = async (...a) => old.markReminder(...a);
export const newId = old.newId;
export const normaliseEmail = old.normaliseEmail;
export const recordStripeEvent = async (...a) => old.recordStripeEvent(...a);
export const saveMail = async (...a) => old.saveMail(...a);
export const saveRun = async (...a) => old.saveRun(...a);
export const setStripeCustomer = async (...a) => old.setStripeCustomer(...a);

// Lovable-only functions:
const tests = new Map();
export const rateAllow = async () => true;
export const withdrawalRateAllow = async () => true;
export const saveTestCheckout = async (id, data) => { tests.set(id, data); };
export const getTestCheckout = async (id) => tests.get(id) ?? null;
export const forgetStripeEvent = async () => {};
export const claimReminder = async () => false;
export const verifyReminderToken = async () => false;
