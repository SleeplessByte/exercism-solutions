const VALID = /[-X0-9]/

export const isValid = (value) => {
  const trimmed = [...value].filter((c) => VALID.test(c))

  // Contains invalid characters
  if (trimmed.length != value.length) {
    return false
  }

  const values = trimmed.filter(noSeparator).map(parse)

  // Expects 9 values plus a check digit
  if (values.length != 10) {
    return false
  }

  const result = values.reduce(accumulate, 0)

  // Check validity
  return result % 11 === 0
};

function noSeparator(digit) {
  return digit !== '-'
}

function parse(digit, index) {
  // If check digit, allow X
  if (digit === 'X' && index === 9) {
    return 10
  }

  return parseInt(digit, 10)
}

function accumulate(result, value, index) {
  const multiplier = 10 - index
  return result + value * multiplier
}