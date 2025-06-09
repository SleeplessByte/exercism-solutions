//
// This is only a SKELETON file for the 'Armstrong numbers' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const validate = (input) => {
  const digits = [...input.toString(10)].map(Number)
  const n = digits.length
  return input === digits.reduce((result, digit) => result + digit ** n, 0)
};
