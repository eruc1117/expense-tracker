const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const router = require('./routes/index')
const port = 3000

const handlebars = exphbs.create({
})
app.engine('.handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(express.static('public'))
app.use(router)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
});