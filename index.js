/// implement your API here
const express = require('express')

const users = require('./data/db')

const server = express()

server.use(express.json())


 
server.get('/api/users', (req, res) => {
  users.find()
    .then(users => {

        res.status(200).json(users)
    })

    .catch(error => {
      res.status(500).json({ message: "error getting list of users" })
    })
})

 
server.get('/api/users/:id', (req, res) => {
  const userId = req.params.id
  
  users.findById(userId)

  .then(result => {
      res.status(200).json(result)
    })

    .catch(error => {
      res.status(500).json({ error: "The users information could not be retrieved." })
    })
})

 
server.post('/api/users', (req, res) => {

    const userInfo = req.body

    users.insert(userInfo)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      res.status(500).json({ error: "There was an error while saving the user to the database" })
    })
})

 
server.delete('/api/users/:id', (req, res) => {

    const userId = req.params.id
  users.remove(userId)
    .then(user => {
      if (user) {

        res.status(200).json({ message: "Successfully deleted the user." })
      } else {

        res.status(404).json({ message: "The user with the specified ID does not exist." })
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The user could not be removed" })
    })
})

 
server.put('/api/users/:id', (req, res) => {

    const { id } = req.params

  const changes = req.body

  users.update(id, changes)
    .then(updated => {
      if (!changes.name) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
      } else if (!changes.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
      } else if (updated) {
        res.status(200).json(updated)
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist" })
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The user information could not be modified."})
    })
})



const port = 3001;
server.listen(port, () => console.log('\n server is running \n'))