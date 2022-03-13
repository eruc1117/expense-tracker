function changeDateFormat(rowDate) {
  let date = rowDate.toString().split(" ")
  date.splice(0, 1)
  date.splice(3, 6)
  date.reverse().pop()
  let month = (rowDate.getMonth() + 1) < 9 ? //月份需要補0的機會比較大，設定為true的條件
    `0${(rowDate.getMonth() + 1).toString()}` :
    `${(rowDate.getMonth() + 1).toString()}`
  date.splice(1, 0, month)
  return date
}

module.exports = {
  changeDateFormat
}