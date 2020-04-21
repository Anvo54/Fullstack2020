const mongoose = require('mongoose')

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

if (process.argv.length < 3){
  console.log(`
  
  Usage:

  Parameter1: password
  Parameter2: Name to add
  Parameter3: Number to add
  
  Example: node mongo.js thepassword John 050354`)
  process.exit(1)
}
const url = `mongodb+srv://react_user:${password}@cluster0-lcxsx.mongodb.net/persons?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Persons', personSchema)

if (process.argv.length === 3){
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}
else {
  const person = new Person({
    name: newName,
    number: newNumber
  })

  person.save().then(response => {
    console.log('Person saved!')
    mongoose.connection.close()
  })
}