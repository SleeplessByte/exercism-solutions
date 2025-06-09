export const COLORS = [
  "black",
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "violet",
  "grey",
  "white"
]

export function value(colors) {
  return colors
    .reverse()
    .reduce(
      (result, color, digit) => result + COLORS.indexOf(color) * (10 ** digit),
      0
    )
}
