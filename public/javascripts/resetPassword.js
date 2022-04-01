const verCode = document.querySelector('#verCode')
const check = document.querySelector('.check')

check.addEventListener('click', () => {
  if (verCode.value !== check.id) {
    event.preventDefault();
  }
})