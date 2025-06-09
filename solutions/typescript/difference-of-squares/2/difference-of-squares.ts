export default class Squares {
  constructor(private size: number) {
    this.size = size
  }

  get squareOfSum() {
    const sum = (1 + this.size) * this.size / 2
    return sum * sum
  }

  get sumOfSquares(): number {
    // https://trans4mind.com/personal_development/mathematics/series/sumNaturalSquares.htm
    return (this.size * (this.size + 1) * (2 * this.size + 1) / 6)
  }

  get difference() {
    return Math.abs(this.squareOfSum - this.sumOfSquares)
  }
}
