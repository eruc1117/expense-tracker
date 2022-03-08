const res = require('express/lib/response')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(new LocalStrategy({ usernameField: 'name' },
    async function (name, password, done) {
      try {
        const user = await User.findOne({ name })
        if (!user) {
          return done(null, false)
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
          return done(null, false)
        }
        return done(null, user)
      } catch (err) {
        console.log(err)
        done(err, false)
      }
    }))
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((_id, done) => {
    User.findOne({ id: _id })
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}