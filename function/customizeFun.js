function changeDateFormat(rowDate) {
  let date = rowDate.toString().split(" ")
  date.splice(0, 1)
  date.splice(3, 6)
  date.reverse().pop()
  let month = `0${(rowDate.getMonth() + 1).toString()}`
  date.splice(1, 0, month)
  return date
}

module.exports = {
  changeDateFormat
}