const config = require('./utils/config') // Täällä määritellään ympäristö muuttujat
const express = require('express') // Tässä otetaan käyttöön express
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleWare = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(() => {
    logger.error('error connection to MongoDB:', error.message)
  })

mongoose.set('useFindAndModify', false)

app.use(cors())
app.use(express.json())
app.use(middleWare.requestLogger)

app.use('/api/blogs/', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleWare.unknownEndpoint)
app.use(middleWare.errorHandler)

module.exports = app