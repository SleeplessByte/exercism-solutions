/* eslint-disable linebreak-style */
const SCORING = {
  a: 1,
  b: 3,
  c: 3,
  d: 2,
  e: 1,
  f: 4,
  g: 2,
  h: 4,
  i: 1,
  j: 8,
  k: 5,
  l: 1,
  m: 3,
  n: 1,
  o: 1,
  p: 3,
  q: 10,
  r: 1,
  s: 1,
  t: 1,
  u: 1,
  v: 4,
  w: 4,
  x: 8,
  y: 4,
  z: 10,
};

export function score(word) {
  const normalizedWord = word.toLowerCase();
  const { length } = normalizedWord;
  let sum = 0;

  for (let i = 0; i < length; i++) {
    sum += SCORING[normalizedWord[i]];
  }

  return sum;
}

// https://run.perf.zone/view/Summing-via-reduce-or-for-loop-1542915393081
// 25% slower
function reduceScore(word) {
  return [...word.toLowerCase()]
    .reduce((sum, letter) => sum + SCORING[letter], 0);
}
