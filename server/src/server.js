require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')

const express = require('express')
const app = express()

app.use(cors())
app.use(bodyParser.json())

// Import Routes
const usersRoute = require('../routes/Users')
const groupsRoute = require('../Routes/Groups')
const courseRoute = require('../Routes/Courses')
const teachersRoute = require('../routes/Teachers')

// Routes
app.use(usersRoute)
   .use(groupsRoute)
   .use(courseRoute)
   .use(teachersRoute)

app.listen(process.env.PORT, () => {
    console.log(`server running on http://${process.env.IPADRESS}:${process.env.PORT}`);
})
