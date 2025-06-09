module Year
  module_function

  def leap?(n)
    n % 4 == 0 && (n % 100 != 0 || n % 400 == 0)
  end
end
