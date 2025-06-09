function parse(digit) {
  return parseInt(digit, 10)
}

function makeDoubler(length) {
  return function doubler(digit, index) {
    if ((index + length) % 2 === 0) {
      return digit * 2;
    }
  
    return digit
  }
}

function wrap(digit) {
  return digit > 9 ? digit - 9 : digit
}

function sum(result, digit) {
  return result + digit
}


export const valid = (value) => {
  const digits = [...value].filter((d) => d !== ' ');
  const length = digits.length
  const doubler = makeDoubler(length)
  
  const result = digits
    // convert to integers
    .map(parse)
    
    // double the second digits, starting from right
    .map(doubler)
    
    // limit to digits less than 10
    .map(wrap)
    
    // sum all digits
    .reduce(sum, 0);

  return length > 1 && result % 10 === 0;
};
