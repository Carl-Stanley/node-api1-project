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
      res.status(500).json({ message: "error retrieving users" })
    })
})

 
server.get('/api/users/:id', (req, res) => {
  const userId = req.params.id
  
  users.findById(userId)

  .then(result => {
      res.status(200).json(result)
    })

    .catch(error => {
      res.status(500).json({ error: "That user does not exist." })
    })
})

 
server.post('/api/users', (req, res) => {

    const userInfo = req.body

    users.insert(userInfo)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      res.status(500).json({ error: "Error adding user" })
    })
})

 
server.delete('/api/users/:id', (req, res) => {

    const userId = req.params.id
  users.remove(userId)
    .then(user => {
      if (user) {

        res.status(200).json({ message: "Deleted user." })
      } else {

        res.status(404).json({ message: "User Not Found" })
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Remove Failed" })
    })
})

 
server.put('/api/users/:id', (req, res) => {

    const { id } = req.params

  const changes = req.body

  users.update(id, changes)
    .then(updated => {
      if (!changes.name) {
        res.status(400).json({ errorMessage: "Name and bio for the user required." })
      } else if (!changes.bio) {
        res.status(400).json({ errorMessage: "Name and bio for the user required." })
      } else if (updated) {
        res.status(200).json(updated)
      } else {
        res.status(404).json({ message: "User does not exist" })
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Could not update user info."})
    })
})



const port = 3001;
server.listen(port, () => console.log('\n Server Running \n'))