module ResistorColorDuo
  COLORS = %w(black brown red orange yellow green blue violet grey white)
      .each_with_index
      .to_h
      .freeze

  module_function

  def value(colors)
    colors
      .reverse
      .each_with_index
      .reduce(0) do |result, (color, index)|
        result + COLORS[color] * 10 ** index
      end

    ##
    # @example Using intermediary string
    #
    # colors.map(&COLORS.method(:fetch)).join.to_I
  end
end
