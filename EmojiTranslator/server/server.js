// TODO: import necessary modules
const express = require('express')
const path = require('path')
const routes = require('./routes')

const app = express()
const port = 3000

// TODO: define middleware
app.use(express.static('public'))

app.use('/', routes);

// TODO: define routes


// TODO: start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})







