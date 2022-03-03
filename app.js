const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000

const handlebars = exphbs.create({
})
app.engine('.handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { cssStyle: "http://localhost:3000/stylesheets/index.css" })
})

app.get('/edit', (req, res) => {
  res.render('edit', { cssStyle: "http://localhost:3000/stylesheets/edit.css" })
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
});