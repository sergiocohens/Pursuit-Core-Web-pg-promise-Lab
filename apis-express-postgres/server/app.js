const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.urlencoded({
  extended: false
}))
app.use(express.json())

const PORT = 3030


const usersRouter = require('./routes/usersRouter')
const postsRouter = require('./routes/postsRouter')
const likesRouter = require('./routes/likesRouter')


app.use('/users', usersRouter)
app.use('/posts', postsRouter)
app.use('/likes', likesRouter)

app.use('/', (req,res) => {
  res.send('Welcome to Facebook')
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
