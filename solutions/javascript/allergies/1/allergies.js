const ALLERGIES = {
  'eggs': 1,
  'peanuts': 2,
  'shellfish': 4,
  'strawberries': 8,
  'tomatoes': 16,
  'chocolate': 32,
  'pollen': 64,
  'cats': 128,
}

// Instead of using a map, an array with Math.pow(2, index - 1) could have been used but the `indexOf` is way slower
// than pre-calculating / storing these values.

export default class Allergies {
  constructor(score) {
    this.score = score;
  }

  allergicTo(allergy) {
    const mask = ALLERGIES[allergy]
    return (this.score & mask) === mask;
  }

  list() {
    return Object.keys(ALLERGIES).filter(value => this.allergicTo(value));
  }
}
