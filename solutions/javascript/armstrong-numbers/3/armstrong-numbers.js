//
// This is only a SKELETON file for the 'Armstrong numbers' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export function isArmstrongNumber(input) {
  const digits = [...input.toString(10)].map(BigInt)
  const n = BigInt(digits.length)
  
  return BigInt(input) === digits.reduce((result, digit) => result + digit ** n, BigInt(0))
};
