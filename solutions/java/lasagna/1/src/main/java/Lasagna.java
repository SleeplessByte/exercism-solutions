public class Lasagna {
    static final int MINUTES_PER_LAYER = 2;

    public int expectedMinutesInOven() {
        return 40;
    }

    public int remainingMinutesInOven(int actual) {
        return this.expectedMinutesInOven() - actual;
    }

    public int preparationTimeInMinutes(int layers) {
        return layers * MINUTES_PER_LAYER;
    }

    public int totalTimeInMinutes(int layers, int actual) {
        return this.preparationTimeInMinutes(layers) + actual;
    }
}
