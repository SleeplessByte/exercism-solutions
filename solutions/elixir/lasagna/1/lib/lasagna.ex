defmodule Lasagna do
  def expected_minutes_in_oven do
    40
  end

  def remaining_minutes_in_oven(time) do
    Lasagna.expected_minutes_in_oven - time
  end

  def preparation_time_in_minutes(layers) do
    layers * 2
  end

  def total_time_in_minutes(layers, time) do
    Lasagna.preparation_time_in_minutes(layers) + time
  end

  def alarm do
    "Ding!"
  end
end
