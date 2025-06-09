module PhoneNumber
  module_function

  def clean(input)
    Array(input.gsub(/[^0-9]/, '').scan(/\A1?((?:[2-9][0-9]{2}){2}[0-9]{4})\z/).first).first
  end
end
