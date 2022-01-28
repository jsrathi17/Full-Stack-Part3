const mongoose = require('mongoose')


const url = process.env.MONGODB_URI
console.log('Connecting to URL', url)

mongoose.connect(url)
  .then(result => {
    console.log('Connected to Mongodb Database')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const personSchema = new mongoose.Schema({
    name: {type: String, minLength: 3, required: true, unique: true},
    number: { type: String, minLength: 8, required: true}
  })




personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('persons', personSchema)