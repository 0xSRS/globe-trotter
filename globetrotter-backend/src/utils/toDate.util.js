// Prisma's DateTime fields require a full ISO-8601 datetime string.
// express-validator's isISO8601() also accepts date-only strings like
// "2026-09-10", which Prisma then rejects with "premature end of input".
// This normalizes any accepted date/datetime input into a real JS Date.
function toDate(value) {
  if (value === undefined || value === null || value === '') return value;
  if (value instanceof Date) return value;
  return new Date(value);
}

module.exports = toDate;