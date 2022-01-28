require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const persons = require('./models/person')
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

let PERSON = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]



const generateId = () => {
  const maxId = Math.floor(Math.random()* (10000 - 4) + 4)
  return maxId + 1
}

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Phonebook App!</h1>')
})

  app.get('/api/info', (request, response) => {
    response.send('<h1>Phone book has people</h1>')
  })

  app.get('/api/persons', (request, response) => {
    persons.find({}).then(people => {
      response.json(people)})
    })
  

  app.get('/api/persons/:id', (request, response) => {
    persons.findById(request.params.id).then(person => {
      if(person){
        response.json(person)
      }else{
        response.status(404).end()
      }
    })
  })

 

  app.delete('/api/persons/:id', (request, response) => {
    persons.findById(request.params.id)
    .then(person => {
      person.remove()
        .then(deletedPerson => {
          console.log('Deleted: ' + deletedPerson)
          response.status(204).end()
        })
  })
  })
  


  app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name)  {
      return response.status(400).json({ 
        error: 'name is missing' 
      })
    }
     else if (!body.number) {
        return response.status(400).json({ 
          error: 'number is missing' 
        })}

    const person = new persons({
      name: body.name,
      number: body.number,
      id: generateId(),
    })
    person.save().then(savedPerson=> {response.json(savedPerson)})
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

