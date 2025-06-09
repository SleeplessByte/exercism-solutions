module PhoneNumber
  module_function

  def clean(input)
    input.gsub(/\D/, '')
         .sub(/\A1/, '')
         .scan(/\A(?:[2-9]\d\d){2}\d{4}\z/)
         .first
  end
end
