const path = require('path')
const express = require('express')

const app = express()

app.use(express.json({ limit: '50mb' }))

app.use(express.static(path.join(__dirname, '../dist')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(3001, () => {
  console.log('Server is now listening at 3001')
})

module.exports = app
