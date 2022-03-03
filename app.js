const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000

const handlebars = exphbs.create({
})
app.engine('.handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
});