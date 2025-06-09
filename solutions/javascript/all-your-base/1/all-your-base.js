// @ts-check

/**
 * @param {number[]} digits
 * @param {number} base
 * @throws {Error} if input has leading zeros, is empty or has negative digits
 */
function assertDigits(digits, base) {
  if (
    digits.length === 0
    || (digits[0] === 0 && digits.length !== 1)
    || digits.some(d => d < 0 || d >= base)
  ) {
    throw new Error('Input has wrong format')
  }
}

/**
 * @param {number} base
 * @param {string} name
 */
function assertBase(base, name) {
  if (base <= 1 || Math.floor(base) !== base) {
    throw new Error(`Wrong ${name} base`)
  }

}

/**
 * @param {number[]} digits
 * @param {number} base
 * @param {number} nextBase
 */
export function convert(digits, base, nextBase) {
  assertBase(base, 'input')
  assertBase(nextBase, 'output')
  assertDigits(digits, base)

  let valueBase10 = digits
    .reverse()
    .reduce((result, digit, position) => result + digit * (base ** (position)))

  if (valueBase10 === 0) {
    return [0]
  }

  const result = []
  while(valueBase10 > 0) {
    result.push(valueBase10 % nextBase)
    valueBase10 = Math.floor(valueBase10 / nextBase)
  }

  return result.reverse()
}
