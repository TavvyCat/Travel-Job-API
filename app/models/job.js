const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
  occupation: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  pay: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // applied: [mongoose.Schema.Types.ObjectId]
}, {
  timestamps: true
})

module.exports = mongoose.model('Job', jobSchema)
