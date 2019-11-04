const express = require('express')
const router = express.Router()

// pg-promise setup
const pgp = require('pg-promise')()
const connectionString = "postgres://localhost:5432/facebook_db"
const db = pgp(connectionString)

router.get('/all', async (req,res) => {
  try {
    let posts = await db.any("SELECT * FROM posts")
    res.json({
       payload: posts,
       message: 'Retrieved all posts'
    })
  } catch(error) {
    res.status(500)
    res.json({
        message: "Error. Something went wrong!"
    })
    console.log('Error:', error)
  }
})

router.get('/:poster_id', async (req,res) => {
  let posterId = req.params.poster_id
  try {
    let posts = await db.any(`SELECT * FROM posts WHERE poster_id = ${posterId}`)
    res.json({
      payload: posts,
      message: 'Retrieved posts'
    })
  } catch(error) {
    res.status(500)
    res.json({
        message: 'There was an error.'
    })
    console.log('Error:', error)
  }
})

router.post('/register', async (req,res) => {
  try {
    let insertQuery = `
    INSERT INTO posts (poster_id, body)
      VALUES ($1, $2)
    `
    await db.none(insertQuery, [req.body.posterId, req.body.body])
    res.json({
      payload: req.body,
      message: 'Post registered'
    })
  } catch (error) {
    res.json({
      message: 'There was an error registering your post'
    })
  }
})

module.exports = router
