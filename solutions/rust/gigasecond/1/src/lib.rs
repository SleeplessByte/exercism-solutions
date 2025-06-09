extern crate chrono;
use chrono::{DateTime, Utc, Duration};

// Returns a Utc DateTime one billion seconds after start.
pub fn after(start: DateTime<Utc>) -> DateTime<Utc> {
    let billion = i64::pow(10, 9);
    let billion_seconds = Duration::seconds(billion);

    // If tests were to request overflow checking, use
    //
    //   fn checked_add_signed(self, rhs: OldDuration) -> Option<DateTime<Tz>>
    return start + billion_seconds;
}