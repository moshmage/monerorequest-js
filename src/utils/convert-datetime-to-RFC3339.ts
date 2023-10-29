/**
 * @returns {string} a string representation of the given date in UTC pex 2023-10-28T13:41:45.850Z
 */
export function convertDatetimeToRFC3339(date: Date|string): string {
  if (typeof date === "string")
    date = new Date(date);
  if (date.getTimezoneOffset() !== 0)
    date = new Date(date.toUTCString());

  return date.toISOString();
}