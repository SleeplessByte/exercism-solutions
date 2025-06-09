export default class Clock {
  private readonly midnightDiffInMin: number

  private static readonly MINS_PER_HOUR = 60
  private static readonly HOURS_PER_DAY = 24
  private static readonly MINS_PER_DAY  = Clock.MINS_PER_HOUR * Clock.HOURS_PER_DAY

  constructor(hours: number, minutes: number = 0) {
    const totalMinutes = (hours * 60 + minutes)

    // This trick add exactly enough times MINS_PER_DAY so that the totalMinutes
    // number is a positive number. This is because the % is the remainder and
    // not the modulo (and thus doesn't handle negative numbers as expected).
    // In the tests you can see this as "xxx rolls over".'
    //
    // Another way of writing this is: Math.floor(((a % b) + b) % b)
    //
    this.midnightDiffInMin = (totalMinutes + Math.max(0, Math.ceil(-1 * totalMinutes / Clock.MINS_PER_DAY) * Clock.MINS_PER_DAY)) % Clock.MINS_PER_DAY
  }

  get hour() {
    return Math.floor(this.midnightDiffInMin / Clock.MINS_PER_HOUR) % Clock.HOURS_PER_DAY
  }

  get minute() {
    return this.midnightDiffInMin % Clock.MINS_PER_HOUR
  }

  equals(clock: Clock): boolean {
    return clock.hour === this.hour && clock.minute === this.minute
  }

  toString(): string {
    return `${('00' + this.hour).slice(-2)}:${('00' + this.minute).slice(-2)}`
  }

  plus(minutes: number): Clock {
    return new Clock(this.hour, this.minute + minutes)
  }

  minus(minutes: number): Clock {
    return new Clock(this.hour, this.minute - minutes)
  }
}
