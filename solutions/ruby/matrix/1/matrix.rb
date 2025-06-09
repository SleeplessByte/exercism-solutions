class Matrix

  attr_reader :rows, :columns

  def initialize(input)
    self.rows = input.split("\n").map { |row_string| row_string.split(' ').map(&:to_i) }
    self.columns = rows.transpose
  end

  private

  attr_writer :rows, :columns
end
