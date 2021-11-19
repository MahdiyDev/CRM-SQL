require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const pg = require('../pg/pg')

const app = express()

app.use(require('cors')())
app.use(bodyParser.json())

app.get('/users', async (req, res) => {
    try {
        const users = await pg(`SELECT *
        FROM users
        inner JOIN course
        ON users.course_uid = course.course_uid
        left JOIN groups
        ON users.group_id = groups.group_id`)

        res.json(users)
    } catch (e) {
        res.json(e)
    }
})

app.post('/users', async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            paid_price,
            phone_number,
            group_id,
            course_uid
        } = req.body

        const newUser = await pg(`
            insert into users(users_uid, first_name, last_name, paid_price, phone_number, group_id, course_uid)
            values (uuid_generate_v4(), $1, $2, $3, $4, $5, $6)
            returning *
        `, first_name, last_name, paid_price, phone_number, group_id, course_uid)

        res.json(newUser)
    } catch (error) {
        res.json(error)
    }
})

app.get('/groups', async (req, res) => {
    try {
        const groups = await pg('select * from groups')

        res.json(groups)
    } catch (e) {
        res.json(e)
    }
})

app.post('/groups', async (req, res) => {
    try {
        const { group_name, group_course_id } = req.body

        const newGroup = await pg(`
            insert into groups(group_id, group_name, group_course_id)
            values (uuid_generate_v4(), $1, $2)
            returning *
        `, group_name, group_course_id)

        res.json(newGroup)
    } catch (error) {
        res.json(error)
    }
})

app.get('/course', async (req, res) => {
    try {
        const course = await pg ('select * from course')

        res.json(course)
    } catch (e) {
        res.json(e)
    }
})

app.post('/course', async (req, res) => {
    try {
        const { course_name, course_price } = req.body

        const newCourse = await pg(`
            insert into course(course_uid, course_name, course_price)
            values (uuid_generate_v4(), $1, $2) returning *
        `, course_name, course_price)

        res.json(newCourse)
    } catch (error) {
        res.json(error)
    }
})

app.delete('delete', (req, res) => {
    
})

app.listen(process.env.PORT, () => {
    console.log(`server running on http://${process.env.IPADRESS}:${process.env.PORT}`);
})
