export default function transform(legacyScores) {
  const scores = {};
  Object.keys(legacyScores)
    .forEach((points) => {
      legacyScores[points].forEach((letter) => {
        scores[letter.toLowerCase()] = +points;
      });
    });
  return scores;
}
