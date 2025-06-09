const OPERATIONS = ['wink', 'double blink', 'close your eyes', 'jump']

export function secretHandshake(sekret) {
  if (!(typeof sekret === 'number')) {
    throw new Error('Handshake must be a number')
  }

  const bits = sekret.toString(2).split('').reverse()
  const shake = OPERATIONS.filter((_, i) => bits[i] === '1')

  return bits[4] === '1' ? shake.reverse() : shake
}
