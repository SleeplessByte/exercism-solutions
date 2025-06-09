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

/**
 * Normalizes a planet name to be capitalized and looks up the orbital period
 *
 * @param {string} planet the planet name
 * @return {number} the orbital period
 */
function getOrbitalPeriod(planet) {
  const [p, ...lanet] = planet
  const period = ORBITAL_PERIODS[[p.toUpperCase(), ...lanet].join('')]
  
  if (typeof period === 'undefined') {
    throw new Error('not a planet');
  }

  return period;
}

/**
 * Calculate the age on a planet given the age on earth
 *
 * @param {string} planet the planet name
 * @param {number} earthAgeInS the age on earth in seconds
 */
export function age(planet, earthAgeInS) {
  return Number(Number(earthAgeInS / EARTH_YEAR_IN_S / getOrbitalPeriod(planet)).toFixed(2))
}

/**
 * Earlier versions of this exercise did not pass in a planet name when calling
 * the function. Instead, the optimal solution had dynamic assignment.
 *
 * @example Older solution using dynamic assignment
 *
 * function makeSpaceAge(initial) {
 *   return Object.entries(ORBITAL_PERIODS)
 *     .reduce((result, [planet, period]) => ({
 *       ...result,
 *       [`on${planet}`]: function ageOnPlanet() {
 *         return +((this.seconds / EARTH_YEAR_IN_S / period).toFixed(2))
 *       }
 *     }), initial)
 * }
 *
 * export class SpaceAge {
 *   constructor(earthAgeInS) {
 *     this.seconds = earthAgeInS
 *     return makeSpaceAge({ seconds: earthAgeInS })
 *   }
 * }
 */
