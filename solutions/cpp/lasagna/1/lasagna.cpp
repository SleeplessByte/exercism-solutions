/* The amount in minutes that the lasagna should stay in the oven. */
int ovenTime() {
    return 40;
}

/* The remaining minutes based on the actual minutes already in the oven. */
int remainingOvenTime(int actualMinutesInOven) {
    return ovenTime() - actualMinutesInOven;
}

/* An estimate of the preparation time based on the number of layers and 
  the necessary time per layer. */
int preparationTime(int numberOfLayers) {
    return numberOfLayers * 2;
}

/* The total time spent to create and bake the lasagna so far. */
int elapsedTime(int numberOfLayers, int actualMinutesInOven) {
    return preparationTime(numberOfLayers) + actualMinutesInOven;
}