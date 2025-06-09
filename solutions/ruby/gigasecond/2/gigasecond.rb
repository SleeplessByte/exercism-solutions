module Gigasecond
  module_function

  def from(date_of_birth)
    date_of_birth.to_time + GIGASECOND_IN_S
  end

  private

  GIGASECOND_IN_S = 10 ** 9
end
