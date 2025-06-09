export default function calculatePrimeFactors(n: number, divisor: number = 2): number[] {
  for (let i = divisor; i <= n; i++) {
    if (n % i === 0) {
      return [i, ...calculatePrimeFactors(n / i, i)]
    }
  }

  return []
}
