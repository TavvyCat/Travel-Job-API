const express = require('express')
const passport = require('passport')

const Job = require('./../models/job')

const { handle404, requireOwnership } = require('../../lib/custom_errors')

// this is middleware that will remove blank fields from `req.body`, e.g.
// { job: { title: '', text: 'foo' } } -> { job: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

router.route('/jobs')
  // INDEX
  .get((req, res, next) => {
    Job.find()
      .populate('owner')
      .then(jobs => jobs.map(job => job.toObject()))
      .then(jobs => res.status(200).json({ jobs: jobs }))
      .catch(next)
  })
  // CREATE
  .post(requireToken, (req, res, next) => {
    const job = req.body.job
    job.owner = req.user.id
  
    Job.create(job)
      .then(job => res.status(201).json({ job: job.toObject() }))
      .catch(next)
  })

router.route('/jobs/:id')
  // SHOW
  .get(requireToken, (req, res, next) => {
    // req.params.id will be set based on the `:id` in the route
    Job.findById(req.params.id)
      .then(handle404)
      .populate('owner')
      // if `findById` is succesful, respond with 200 and "job" JSON
      .then(job => res.status(200).json({ job: job.toObject() }))
      // if an error occurs, pass it to the handler
      .catch(next)
  })
  // UPDATE
  .patch(requireToken, removeBlanks, (req, res, next) => {
    // if the client attempts to change the `owner` property by including a new
    // owner, prevent that by deleting that key/value pair
    delete req.body.job.owner
  
    Job.findById(req.params.id)
      .then(handle404)
      .then(job => {
        // pass the `req` object and the Mongoose record to `requireOwnership`
        // it will throw an error if the current user isn't the owner
        requireOwnership(req, job)
  
        // pass the result of Mongoose's `.update` to the next `.then`
        return job.updateOne(req.body.job)
      })
      // if that succeeded, return 204 and no JSON
      .then(() => res.sendStatus(204))
      // if an error occurs, pass it to the handler
      .catch(next)
  })
  // DESTROY
  .delete(requireToken, (req, res, next) => {
    Job.findById(req.params.id)
      .then(handle404)
      .then(job => {
        // throw an error if current user doesn't own `job`
        requireOwnership(req, job)
        // delete the job ONLY IF the above didn't throw
        job.deleteOne()
      })
      // send back 204 and no content if the deletion succeeded
      .then(() => res.sendStatus(204))
      // if an error occurs, pass it to the handler
      .catch(next)
  })

module.exports = router
