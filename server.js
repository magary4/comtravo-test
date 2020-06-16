require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', require('./src/functions/flights.facade'))

app.listen(port, () => console.log(`API listening at http://localhost:${port}`))