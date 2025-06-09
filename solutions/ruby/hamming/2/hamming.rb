module Hamming
  module_function

  def compute(left, right)
    raise ArgumentError, "#{left} and #{right} are not the same length" if left.length != right.length

    left.chars.zip(right.chars).count { |l, r| l != r }
  end
end
