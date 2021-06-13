require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors') //для запросов с браузера
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

app.use(errorHandler)

app.use(express.static(path.join(__dirname, './view/build')))

app.get('*', function(_, res) {
  res.sendFile(path.join(__dirname, './view/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

const startServer = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

const startClusterServer = () => {
  if (!cluster.isMaster) {
    return startServer()
  }

  logger.info(`Master ${process.pid} is running`)
  const numCPUs = os.cpus().length

  logger.info(`Forking ${numCPUs} clusters`)

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker) => {
    logger.info(`worker ${worker.process.pid} died`)
  })
}

if (config.nodeClusterEnabled) {
  startClusterServer()
} else {
  startServer()
}