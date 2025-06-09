/* eslint-disable no-bitwise */
const OPERATIONS = ['wink', 'double blink', 'close your eyes', 'jump']

export function commands (sekret) {
  if (!(typeof sekret === 'number')) {
    throw new Error('Handshake must be a number')
  }

  /**
   * @example Using a bit string
   *
   * const bits = sekret.toString(2).split('').reverse()
   * const shake = OPERATIONS.filter((_, i) => bits[i] === '1')
   * return bits[4] === '1' ? shake.reverse() : shake
   */

  const shake = OPERATIONS.filter((_, i) => sekret & (1 << i))
  return sekret & 16 ? shake.reverse() : shake
}
