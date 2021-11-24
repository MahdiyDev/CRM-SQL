require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')

const express = require('express')
const app = express()

app.use(cors())
app.use(bodyParser.json())

// Import Routes
const usersRoute = require('../routes/users')
const groupsRoute = require('../routes/groups')
const courseRoute = require('../routes/course')
const teachersRoute = require('../routes/teachers')

// Routes
app.use('/users', usersRoute)
app.use('/groups', groupsRoute)
app.use('/course', courseRoute)
app.use('/teachers', teachersRoute)

app.listen(process.env.PORT, () => {
    console.log(`server running on http://${process.env.IPADRESS}:${process.env.PORT}`);
})
