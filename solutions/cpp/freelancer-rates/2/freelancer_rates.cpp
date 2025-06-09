#include <cmath>

// The daily rate given an hourly rate.
double daily_rate(double hourly_rate) {
    return hourly_rate * 8.0;
}

// The price after a discount.
double apply_discount(double before_discount, double discount) {
    return before_discount * (1.0 - discount / 100.0);
}

// The monthly rate, given an hourly rate and a discount.
// The returned monthly rate is rounded up to the nearest integer.
int monthly_rate(double hourly_rate, double discount) {
    return std::ceil(apply_discount(22.0 * daily_rate(hourly_rate), discount));
}

// The number of workdays given a budget, hourly rate, and discount.
// The returned number of days is rounded down (take the floor) to
// the next integer.
int days_in_budget(int budget, double hourly_rate, double discount) {
    return budget / apply_discount(daily_rate(hourly_rate), discount);
}