module ResistorColorDuo
  COLORS = %w[
    black
    brown
    red
    orange
    yellow
    green
    blue
    violet
    grey
    white
  ].each_with_index.to_h.freeze

  module_function

  def value(colors)
    colors[..1].map(&COLORS.method(:fetch)).join.to_i
  end
end
