
export const randomShipRegistryNumber = () => `NCC-${Math.floor(Math.random() * 9000 + 1000)}`

export const randomStardate = () => Math.random() * 1000 + 41000;

const PLANET_CLASSES = "DHJKLMNRTY"
export const randomPlanetClass = () => PLANET_CLASSES[Math.floor(Math.random() * PLANET_CLASSES.length)];
