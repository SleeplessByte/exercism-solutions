//
// This is only a SKELETON file for the 'Collatz Conjecture' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
export const steps = (n) => {
  if (n < 1) {
    throw new Error('Only positive integers are allowed')
  }

  if (n === 1) {
    return 0
  }

  const next = n % 2 === 0
    ? n / 2
    : 3 * n + 1

  return 1 + steps(next)
}
