// The interest rate for the provided balance.
double interest_rate(double balance) {
    if (balance < 0) {
        return 3.213;
    } else if (balance < 1000) {
        return 0.5;
    } else if (balance < 5000) {
        return 1.621;
    } else {
        return 2.475;
    }
}

// The yearly interest for the provided balance.
double yearly_interest(double balance) {
    return balance * interest_rate(balance) / 100.0;
}

// The annual balance update, taking into account the interest rate.
double annual_balance_update(double balance) {
    return balance + yearly_interest(balance);
}

// The minimum number of years required to reach the desired balance.
int years_until_desired_balance(double balance, double target_balance) {
    int years{0};

    while(balance < target_balance) {
        balance = annual_balance_update(balance);
        years += 1;
    }
    
    return years;
}