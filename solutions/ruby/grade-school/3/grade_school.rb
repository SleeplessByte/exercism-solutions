class School
  def initialize
    @archive = Hash.new { [] }
  end

  def add(name, grade)
    @archive[grade] <<= name
  end

  def students(grade)
    @archive[grade].sort!
  end

  def students_by_grade
    # @archive.sort_by { |grade, _| grade }
    @archive.keys.sort.map do |grade, students|
      { grade: grade, students: students(grade) }
    end
  end
end
