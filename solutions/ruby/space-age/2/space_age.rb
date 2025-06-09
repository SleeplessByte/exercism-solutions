class SpaceAge

  SECONDS_PER_EARTH_YEAR = 31557600

  ORBITAL_PERIODS = {
    'earth': 1,
    'mercury': 0.2408467,
    'venus': 0.61519726,
    'mars': 1.8808158,
    'jupiter': 11.862615,
    'saturn': 29.447498,
    'uranus': 84.016846,
    'neptune': 164.79132
  }.freeze

  def initialize(seconds_on_earth)
    self.age_on_earth = seconds_on_earth.to_f / SECONDS_PER_EARTH_YEAR
  end

  ORBITAL_PERIODS.each do |planet, period|
    define_method("on_#{planet}") do
      (age_on_earth / period).round(2)
    end
  end

  private

  attr_accessor :age_on_earth
end
