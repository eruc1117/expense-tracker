const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const router = require('./routes/index')
const usePassport = require('./config/passport')
const session = require('express-session')
const path = require('path')
const sassMiddleware = require('node-sass-middleware')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3000
require('./config/mongoose')

const handlebars = exphbs.create({
})
if (PORT === 3000) {
  app.engine('.handlebars', handlebars.engine)
  app.set('view engine', 'handlebars')
  app.set('views', './views')
} else {
  app.engine('.handlebars', handlebars.engine)
  app.set('view engine', 'handlebars')
  app.set('views', '/app/views')
}

app.use(
  sassMiddleware({
    src: path.join(__dirname, 'scss'),
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed',
  })
)
app.use(express.static('public'))
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.msg = ``
  res.locals.msg = req.session.messages// passport.js 中done(null, false, { message: 'That email is not registered!' })的message回傳
  next()
})
app.use(router)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
});