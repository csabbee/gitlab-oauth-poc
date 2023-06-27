import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import path from 'path'

const app = express()

const PORT = process.env.PORT || 80

app.get('/', (req, res) => {
  const indexFilePath = path(__dirname, '/index.html')
  res.sendFile(indexFilePath)
})

app.listen(PORT, () => {
  console.log(`App running on: ${PORT}`)
})
