//
// This is only a SKELETON file for the 'Pop Count' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const eggCount = (displayValue: number): number => {
  let count = 0

  while (displayValue !== 0) {
    count += displayValue & 1
    displayValue >>= 1
  }

  return count
}
