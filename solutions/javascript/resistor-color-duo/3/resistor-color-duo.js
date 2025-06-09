export function decodedValue([first, second]) {
  return colorCode(first) * 10 + colorCode(second)
}

/**
 * This is your code from the first resistor color exercise.
 */
const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]
const colorCode = (color) => COLORS.indexOf(color)