/// <reference path="./global.d.ts" />
// @ts-check

export function cookingStatus(remainingTime) {
  if (remainingTime === 0) {
    return 'Lasagna is done.';
  }

  if (!remainingTime) {
    return 'You forgot to set the timer.';
  }

  return 'Not done, please wait.';
}

export function preparationTime(layers, averagePreparationTime = 2) {
  return layers.length * averagePreparationTime;
}

export function quantities(layers) {
  return {
    noodles: layers.filter((layer) => layer === 'noodles').length * 50,
    sauce: layers.filter((layer) => layer === 'sauce').length * 0.2,
  }
}

export function addSecretIngredient(friendsList, myList) {
  const secretIngredient = friendsList[friendsList.length - 1]
  myList.push(secretIngredient)
}

export function scaleRecipe(recipe, portions) {
  const scaled = { ...recipe }
  const factor = portions / 2

  for (let ingredient in scaled) {
    scaled[ingredient] *= factor
  }

  return scaled
}
