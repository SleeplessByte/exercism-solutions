/**
 * You can use the bigint type and BigInt global object to support numbers below
 * Number.MIN_SAFE_INTEGER and above NUMBER.MAX_SAFE_INTEGER.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
 */

/**
 * @param {number} n
 * @returns {BigInt}
 */
export const square = (n) => {
  if (n < 1 || n > 64) { throw new Error('square must be between 1 and 64'); }
  return 2n ** BigInt(n - 1);
};
/**
 * @returns {BigInt}
 */
export const total = () => 2n ** 64n - 1n;