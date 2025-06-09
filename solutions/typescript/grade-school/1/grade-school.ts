type StudentRoster<T> = Map<T, string[]>

export default class GradeSchool {

  private roster: StudentRoster<number> = new Map()

  studentRoster(): StudentRoster<string> {
    const result: StudentRoster<string> = new Map()
    const grades = this.roster.keys()
    for (const grade of grades) {
      result.set(grade.toString(), this.studentsInGrade(grade))
    }
    return result
  }

  addStudent(student: string, grade: number) {
    const gradeStudents = (this.roster.get(grade) || []).concat(student)
    this.roster.set(grade, gradeStudents)
  }

  studentsInGrade(grade: number): string[] {
    const gradeStudents = (this.roster.get(grade) || [])
    return gradeStudents.sort().slice()
  }
}
