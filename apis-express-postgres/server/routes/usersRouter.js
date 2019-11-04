const express = require('express')
const router = express.Router()

// pg-promise setup
const pgp = require('pg-promise')()
const connectionString = "postgres://localhost:5432/facebook_db"
const db = pgp(connectionString)

router.get('/all', async (req,res) => {
  try {
    let users = await db.any("SELECT * FROM users")
    res.json({
       payload: users,
       message: 'Retrieved all users'
    })
  } catch(error) {
    res.status(500)
    res.json({
        message: "Error. Something went wrong!"
    })
    console.log('Error:', error)
  }
})

router.post('/register', async (req,res) => {
  try {
    let insertQuery = `
    INSERT INTO users (firstname, lastname, age)
      VALUES ($1, $2, $3)
    `
    await db.none(insertQuery, [req.body.firstname, req.body.lastname, req.body.age])
    res.json({
      payload: req.body,
      message: 'User registered'
    })
  } catch (error) {
    res.json({
      message: 'There was an error registering your user'
    })
  }
})

module.exports = router
