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



module.exports = router
