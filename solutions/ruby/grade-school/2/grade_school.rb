class School
  def initialize
    @archive = {}
  end

  def add(name, grade)
    @archive[grade] ||= []
    @archive[grade].push(name).sort!
  end

  def students(grade)
    Array(@archive[grade])
  end

  def students_by_grade
    @archive.sort_by { |grade, _| grade }
            .map { |grade, students| { grade: grade, students: students } }
  end
end
