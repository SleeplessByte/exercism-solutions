/* eslint-disable linebreak-style */
export function compute(leftStrand, rightStrand) {
  const { length } = leftStrand;
  if (length !== rightStrand.length) {
    throw Error('strands must be of equal length');
  }

  let distance = 0;
  for (let i = 0; i < length; i++) {
    distance += leftStrand.charCodeAt(i) !== rightStrand.charCodeAt(i);
  }
  return distance;
}
