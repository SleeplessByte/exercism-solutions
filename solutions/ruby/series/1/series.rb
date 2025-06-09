class Series
  def initialize(input)
    self.data = input
  end

  def slices(n)
    raise ArgumentError, "Can't create empty slices." if n <= 0
    raise ArgumentError, "Data is only #{data.length}; no slice can be of #{n} length" if n > data.length

    number_of_slices = data.length - n
    (0..number_of_slices).map { |start| data.slice(start, n) }
  end

  private

  attr_accessor :data
end
