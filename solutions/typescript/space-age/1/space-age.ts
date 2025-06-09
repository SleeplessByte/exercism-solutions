const EARTH_YEAR_IN_S = 31557600

const ORBITAL_PERIODS = {
  onEarth: 1,
  onMercury: 0.2408467,
  onVenus: 0.61519726,
  onMars: 1.8808158,
  onJupiter: 11.862615,
  onSaturn: 29.447498,
  onUranus: 84.016846,
  onNeptune: 164.79132
}

type AgeOnPlanetFn = () => number

// This makes a mapping of each key in our periods map (onEarth, onXXX) and
// sets its value to a function that returns the known seconds in the age of
// that planet.
//
interface ISpaceAge extends Record<keyof typeof ORBITAL_PERIODS, AgeOnPlanetFn> {
  seconds: number
}

// This mimics a class SpaceAge, but its constructor actually returns the mapped
// type ISpaceAge listed above.
//
interface SpaceAge {
  new(number: number): ISpaceAge
}

// At any point in the iteration, the only thing we know about result is that it has seconds
type ISpaceAgeConstruction =  Partial<ISpaceAge> & Pick<ISpaceAge, 'seconds'>

const SpaceAge = function(number: number): ISpaceAge {
  return Object.entries(ORBITAL_PERIODS)
    .reduce((result: ISpaceAgeConstruction, [name, period]) => ({
        ...result,
        [name]: function ageOnPlanet() {
          return +((this.seconds / EARTH_YEAR_IN_S / period).toFixed(2))
        }
      }),
      { seconds: number }
    ) as ISpaceAge

// A function may not be called as a class by default in TypeScript. This double
// cast makes it anything followed by a class. In later version of TS casting to
// unknown is prefered over this cast to any.
//
} as any as SpaceAge

export default SpaceAge
