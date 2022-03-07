const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const router = require('./routes/index')
const usePassport = require('./config/passport')
const session = require('express-session')
const port = 3000

require('./config/mongoose')

const handlebars = exphbs.create({
})
app.engine('.handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(express.static('public'))
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true }))
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
app.use(router)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
});