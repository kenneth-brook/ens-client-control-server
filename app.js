const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 33333

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/client-control-host/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/client-control-host/clients', db.getClients)
app.get('/client-control-host/clients/:id', db.getClientsById)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})