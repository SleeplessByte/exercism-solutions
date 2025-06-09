// Package weather exposes functions to store the weather in a specific city and return a forecast message.
package weather

// CurrentCondition is the last forecasted condition.
var CurrentCondition string

// CurrentLocation is the last forecasted location.
var CurrentLocation string

// Forecast stores the given city and condition and returns a forecast message.
func Forecast(city, condition string) string {
	CurrentLocation, CurrentCondition = city, condition
	return CurrentLocation + " - current weather condition: " + CurrentCondition
}
