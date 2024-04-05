const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const path = require('path')

require('dotenv/config') // Loads environment variables from .env file


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Session middleware
const sessionOptions = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,  // change to false to prevent saving session until something is stored
    cookie: {
        secure: false, // or true if you're running over HTTPS
        maxAge: 60000 * 24, // set your desired max age
    }
};

app.use(session(sessionOptions))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

const corsOptions = {
    origin: process.env.ORIGIN, 
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

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../build')));

// The "catchall" handler: for any request that doesn't
// match one above or in the router, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// Server setup
const port = process.env.PORT || 10000
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})