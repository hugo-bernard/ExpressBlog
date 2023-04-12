require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const routes = require('./routes/routes');
const cors = require("cors")

// Connect mongoose to mongodb
mongoose.connect(mongoString), {useNewUrlParser: true, useUnifiedTopology: true};
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();

// Init cors in app
app.use(cors())

// Create express application
app.use(express.json());

// Set port on which server will listen
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})

server.setTimeout(120000)

// Set route of api call
app.use('/api', routes)