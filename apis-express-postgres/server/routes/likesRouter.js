const express = require('express')
const router = express.Router()

// pg-promise setup
const pgp = require('pg-promise')()
const connectionString = "postgres://localhost:5432/facebook_db"
const db = pgp(connectionString)

router.get('/:post_id', async (req,res) => {
  let postId = req.params.post_id
  try {
    let number = await db.any(`SELECT COUNT(post_id) FROM likes JOIN posts ON likes.post_id = posts.id WHERE likes.post_id = ${postId}`)
    res.json({
      payload: number,
      message: 'Retrieved likes'
    })
  } catch(error) {
    res.status(500)
    res.json({
        message: 'There was an error.'
    })
    console.log('Error:', error)
  }
})

router.get('/liked/:liked_id', async (req,res) => {
  let likedId = req.params.liked_id
  try {
    let users = await db.any(`SELECT DISTINCT firstname, lastname, age FROM users JOIN posts ON users.id = posts.poster_id JOIN likes ON users.id = likes.liker_id WHERE likes.post_id = ${likedId}`)
    res.json({
      payload: users,
      message: 'Retrieved users'
    })
  } catch(error) {
    res.status(500)
    res.json({
        message: 'There was an error.'
    })
    console.log('Error:', error)
  }
})

router.get('/num/:number', async (req,res) => {
  let num = req.params.number
  try {
    let posts = await db.any(`SELECT posts.id, posts.body, COUNT(posts.id) AS likes FROM posts JOIN likes ON posts.id = likes.post_id GROUP BY posts.id HAVING COUNT(posts.id) = ${num}`)
    res.json({
      payload: posts,
      message: 'Retrieved users'
    })
  } catch(error) {
    res.status(500)
    res.json({
        message: 'There was an error.'
    })
    console.log('Error:', error)
  }
})

module.exports = router
