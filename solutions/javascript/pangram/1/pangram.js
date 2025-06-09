// @ts-check enable

const ALPHABET = 'qwertyuiopasdfghjklzxcvbnm'.split('')

/**
 * Checks if input is a pangram
 *
 * @param {Readonly<string>} input
 * @returns {boolean} true if it is, false otherwise
 */
export function isPangram(input) {
  const normalised = input.toLowerCase()
  return ALPHABET.every((letter) => normalised.includes(letter))
}
