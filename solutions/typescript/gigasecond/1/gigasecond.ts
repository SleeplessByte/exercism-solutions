const GIGASECOND_IN_MS = Math.pow(10, 9) * 1000
export default class Gigasecond {
  private futureDate: Date

  constructor(date: Date) {
    this.futureDate = new Date(date.getTime() + GIGASECOND_IN_MS)
  }

  date() {
    return this.futureDate
  }
}
