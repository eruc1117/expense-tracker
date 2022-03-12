const amount = document.querySelectorAll('.amount')

let all = document.querySelector('.all')
let totalAmount = Number(all.textContent)
amount.forEach(element => {
  totalAmount += Number(element.textContent)
})

all.innerHTML = totalAmount
