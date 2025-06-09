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

function makeSpaceAge(initial) {
  return Object.entries(ORBITAL_PERIODS)
    .reduce((result, [planet, period]) => ({
      ...result,
      [`on${planet}`]: function ageOnPlanet() {
        return +((this.seconds / EARTH_YEAR_IN_S / period).toFixed(2))
      }
    }), initial)
}

export class SpaceAge {
  constructor(earthAgeInS) {
    this.seconds = earthAgeInS
    return makeSpaceAge({ seconds: earthAgeInS })
  }
}
