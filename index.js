import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import router from './config/router.js'

import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Node setup
const app = express()

// Start server
const startServer =  async () => {
  try {
    await mongoose.connect(process.env.dbURI)
    console.log('👋🏽 Database has connected successfully')

    // Middleware
    app.use(express.json())

    // Router middleware
    app.use('/api', router)

    // ** New lines **
    app.use(express.static(path.join(__dirname, 'client', 'build')))
  
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })

    // Log every request
    app.use((req, _res, next) => {
      console.log(`🚨 Request received: ${req.method} - ${req.url}`)
      next()
    })

    // Catcher
    app.use((_req, res) => {
      return res.status(404).json({ message: 'Path not found' })
    })

    const server = app.listen(process.env.PORT, () => console.log(`🚀 Server up and running on port ${process.env.PORT}`))
    server.timeout = 10000    // 10sec server timeout
  } catch (err) {
    console.log('🚨 Alert - cannot connect')
    console.log(err)
  }
}

startServer()