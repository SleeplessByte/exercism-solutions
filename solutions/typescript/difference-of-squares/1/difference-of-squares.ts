export default class Squares {
  constructor(private size: number) {
    this.size = size
  }

  get squareOfSum() {
    const sum = (1 + this.size) * this.size / 2
    return sum * sum
  }

  get sumOfSquares(): number {
    if (this.size === 1) {
      return 1
    }

    const square = this.size * this.size
    return square + new Squares(this.size -1).sumOfSquares
  }

  get difference() {
    return Math.abs(this.squareOfSum - this.sumOfSquares)
  }
}
