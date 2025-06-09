// @ts-check

export class GradeSchool {

  constructor() {
    this._roster = {}
  }

  roster() {
    return Object.keys(this._roster).reduce((result, grade) => {
      return { ...result, [grade]: this.grade(grade) }
    }, {})
  }

  add(student, grade) {
    const gradeStudents = (this._roster[grade] || []).concat(student)
    this._roster[grade] = gradeStudents
  }

  grade(grade) {
    const gradeStudents = (this._roster[grade] || [])
    return gradeStudents.sort().slice()
  }
}
