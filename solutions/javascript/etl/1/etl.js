export default function transform(legacyScores) {
  const scores = {};
  Object.entries(legacyScores).forEach(([points, letters]) => {
    letters.forEach((letter) => { scores[letter.toLowerCase()] = +points; });
  });
  return scores;
}
