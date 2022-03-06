const res = require('express/lib/response')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/userModel')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(new LocalStrategy({ usernameField: 'name' },
    async function (name, password, done) {
      const user = await User.findOne({ name })
      try {
        if (!user) {
          return done(null, false)
        }
        if (user.password !== password) {
          return done(null, false)
        }
        return done(null, user)
      } catch (err) { done(err, false) }
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