// @ts-check

const GIGASECOND_IN_MS = (10 ** 9) * 1000

/**
 * Adds a gigasecond (10^9) to the input {date}
 *
 * @export
 * @param {Date} date
 * @returns {Date} the date + 10^9 seconds
 */
export function gigasecond(date) {
  return new Date(date.getTime() + GIGASECOND_IN_MS)
}
