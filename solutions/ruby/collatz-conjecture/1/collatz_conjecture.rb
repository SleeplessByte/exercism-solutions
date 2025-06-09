module CollatzConjecture
  module_function

  def steps(n, counter = 0)
    raise ArgumentError, 'n must be a positive integer' unless n > 0
    return counter if n == 1

    # This allows it to enable http://nithinbekal.com/posts/ruby-tco/. A ternary
    # would not.
    return steps(n / 2, counter + 1) if n.even?
    steps(n * 3 + 1, counter + 1)
  end
end
