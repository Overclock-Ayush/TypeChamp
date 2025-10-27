const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scoreSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  score:{
    type:Array
  }
 
})

module.exports = Score = mongoose.model('Score', scoreSchema)
