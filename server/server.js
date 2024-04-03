const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')

require('dotenv/config') // Loads environment variables from .env file

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Session middleware
const sessionOptions = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000*24 }
}

app.use(session(sessionOptions))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true, 
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));

// Routes
app.use('/', router)

// Database connection
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(process.env.DB_URI, dbOptions)
    .then(() => console.log('DB Connected!'))
    .catch(err => console.log(err))

// Server setup
const port = process.env.PORT || 4000
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})