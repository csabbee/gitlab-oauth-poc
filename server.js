import * as dotenv from 'dotenv'
dotenv.config()
import { fileURLToPath } from 'url'
import express from 'express'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const PORT = process.env.PORT || 80

app.get('/', (req, res) => {
  const indexFilePath = path.join(__dirname, '/index.html')
  res.sendFile(indexFilePath)
})

app.listen(PORT, () => {
  console.log(`App running on: ${PORT}`)
})
