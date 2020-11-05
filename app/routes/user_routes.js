const express = require('express')
const crypto = require('crypto')
const passport = require('passport')
const bcrypt = require('bcrypt')

const User = require('../models/user')
const { BadParamsError, BadCredentialsError } = require('../../lib/custom_errors')
const removeBlanks = require('../../lib/remove_blank_fields')

const bcryptSaltRounds = 10

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// SIGN UP
router.post('/sign-up', (req, res, next) => {
  Promise.resolve(req.body.user)
    .then(user => {
      if (!user ||
          !user.password ||
          user.password !== user.password_confirmation) {
        throw new BadParamsError()
      }
    })
    // generate a hashed password
    .then(() => bcrypt.hash(req.body.user.password, bcryptSaltRounds))
    .then(hash => {
      const user = req.body.user

      return {
        email: user.email,
        hashedPassword: hash,
        name: user.name,
        phone: user.phone,
        type: user.type,
        occupation: user.occupation
      }
    })
    .then(user => User.create(user))
    
    .then(user => res.status(201).json({ user }))
    .catch(next)
})

// SIGN IN
router.post('/sign-in', (req, res, next) => {
  const pw = req.body.credentials.password
  let user

  // find a user based on the email that was passed
  User.findOne({ email: req.body.credentials.email })
    .then(record => {
      if (!record) {
        throw new BadCredentialsError()
      }

      user = record
      // hashes passed password and compares to hashed password
      return bcrypt.compare(pw, user.hashedPassword)
    })
    .then(correctPassword => {
      if (correctPassword) {
        const token = crypto.randomBytes(16).toString('hex')

        user.token = token

        return user.save()
      } else {
        throw new BadCredentialsError()
      }
    })
    .then(user => res.status(201).json({ user }))
    .catch(next)
})

// CHANGE PASSWORD
router.patch('/change-password', requireToken, (req, res, next) => {
  let user
  // `req.user` will be determined by requireToken
  User.findById(req.user.id)
    .then(record => { user = record })
    // check that the old password is correct
    .then(() => bcrypt.compare(req.body.passwords.old, user.hashedPassword))
    .then(correctPassword => {
      // throw an error if the new password is missing, an empty string, or the old password was wrong
      if (!req.body.passwords.new || !correctPassword) {
        throw new BadParamsError()
      }
    })
    // hash the new password 
    .then(() => bcrypt.hash(req.body.passwords.new, bcryptSaltRounds))
    .then(hash => {
      // set and save the new hashed password in the DB
      user.hashedPassword = hash
      return user.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// 
router.delete('/sign-out', requireToken, (req, res, next) => {
  // create a new random token for the user, invalidating the current one
  req.user.token = crypto.randomBytes(16)
  req.user.save()
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.get('/users', (req, res, next) => {
  User.find()
    .then(users => {

      res.json({ users })
    })
    .catch(next)
})

module.exports = router
