export default class Rational {
  private static from(numerator: number, denominator: number): Readonly<Rational> {
    // Secondary constructor only to aid with always calling reduce once
    return new Rational(numerator, denominator).reduce()
  }

  constructor(public readonly numerator: number, public readonly denominator: number) {
    // makes this final and readonly
    //
    // use (this.constructor === Rational) to freeze only if this was the
    // invoked constructor
    //
    Object.freeze(this)
  }

  public add(other: Readonly<Rational>): Readonly<Rational> {
    return Rational.from(
      this.numerator * other.denominator + this.denominator * other.numerator,
      this.denominator * other.denominator
    )
  }

  public sub(other: Readonly<Rational>): Readonly<Rational> {
    return Rational.from(
      this.numerator * other.denominator - this.denominator * other.numerator,
      this.denominator * other.denominator
    )
  }

  public mul(other: Readonly<Rational>): Readonly<Rational> {
    return Rational.from(
      this.numerator * other.numerator,
      this.denominator * other.denominator
    )
  }

  public div(other: Readonly<Rational>): Readonly<Rational> {
    return Rational.from(
      this.numerator * other.denominator,
      this.denominator * other.numerator
    )
  }

  public abs(): Readonly<Rational> {
    return Rational.from(
      Math.abs(this.numerator),
      Math.abs(this.denominator)
    )
  }

  public exprational(power: number): Readonly<Rational> {
    if (power >= 0) {
      return Rational.from(
        Math.pow(this.numerator, power),
        Math.pow(this.denominator, power)
      )
    }

    return Rational.from(
      Math.pow(this.denominator, Math.abs(power)),
      Math.pow(this.numerator, Math.abs(power))
    )
  }

  public expreal(base: number): number {
    // Unfortunately because of floating point math, the following won't work
    // return Math.pow(Math.pow(base, this.numerator), 1/this.denominator)

    return Math.pow(10, Math.log10(Math.pow(base, this.numerator)) / this.denominator)
  }

  public reduce(): Readonly<Rational> {
    const commonDivisor = this.gcd(this.numerator, this.denominator)

    let nextNumerator = this.numerator / commonDivisor
    let nextDenominator = this.denominator / commonDivisor

    // Moves the sign to the numerator if necessary
    if (nextDenominator < 0) {
      nextDenominator = -1 * nextDenominator
      nextNumerator = -1 * nextNumerator
    }

    return new Rational(
      nextNumerator,
      nextDenominator
    )
  }

  private gcd(a: number, b: number) {
    while (b !== 0) {
      const t = b
      b = a % b
      a = t
    }
    return a
}

}
