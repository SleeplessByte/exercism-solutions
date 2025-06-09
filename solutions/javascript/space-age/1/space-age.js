const EARTH_YEAR_IN_S = 31557600
const ORBITAL_PERIODS = {
  Earth: 1,
  Mercury: 0.2408467,
  Venus: 0.61519726,
  Mars: 1.8808158,
  Jupiter: 11.862615,
  Saturn: 29.447498,
  Uranus: 84.016846,
  Neptune: 164.79132
}

export class SpaceAge {
  constructor(earthAgeInS) {
    this.seconds = earthAgeInS
  }

  ageOn(planet) {
    const age = this.seconds / EARTH_YEAR_IN_S / ORBITAL_PERIODS[planet]
    return Math.round(age * 100) / 100
  }
}


Object.keys(ORBITAL_PERIODS).forEach((planet) => {
  SpaceAge.prototype[`on${planet}`] = function ageOnPlanet() {
    return this.ageOn(planet)
  }
})

/**
 * Alternative way of doing it is returning an object from the constructor
 * @example
 *
 * export class SpaceAge {
 *   constructor(earthAgeInS) {
 *     this.seconds = earthAgeInS
 *     return makeSpaceAge({ seconds: earthAgeInS })
 *   }
 * }
 *
 * function makeSpaceAge(initial) {
 *   return Object.keys(ORBITAL_PERIODS)
 *     .reduce((result, planet) => ({
 *       ...result,
 *       [`on${planet}`]: function ageOnPlanet() {
 *         const age = this.seconds / EARTH_YEAR_IN_S / ORBITAL_PERIODS[planet]
 *         return Math.round(age * 100) / 100
 *       }
 *     }), initial)
 * }
 */
