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
        inner JOIN groups
        ON users.group_id = groups.group_id
        inner JOIN course
        ON groups.group_course_id = course.course_uid`)

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
            group_id
        } = req.body

        const newUser = await pg(`
            insert into users(users_uid, first_name, last_name, paid_price, phone_number, group_id)
            values (uuid_generate_v4(), $1, $2, $3, $4, $5)
            returning *
        `, first_name, last_name, paid_price, phone_number, group_id)

        res.json(newUser)
    } catch (error) {
        res.json(error)
    }
})

app.get('/groups', async (req, res) => {
    try {
        const groups = await pg(`select * from groups`)

        res.json(groups)
    } catch (e) {
        res.json(e)
    }
})

app.post('/groups', async (req, res) => {
    try {
        const { group_name, group_course_id, group_teacher_id } = req.body

        const newGroup = await pg(`
            insert into groups(group_id, group_name, group_course_id, group_teacher_id)
            values (uuid_generate_v4(), $1, $2, $3)
            returning *
        `, group_name, group_course_id, group_teacher_id)

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

app.get('/teachers', async (req, res) => {
    try {
        const teachers = await pg(`
                                    select * from teachers
                                    inner join course
                                    on teachers.course_uid = course.course_uid
                                    inner join groups
                                    on teachers.teacher_uid = groups.group_teacher_id
                                `)

        res.json(teachers)
    } catch (e) {
        res.json(e)
    }
})

app.post('/teachers', async (req, res) => {
    try {
        const { first_name, last_name, phone_number, course_uid } = req.body

        const newTeacher = await pg(`
            insert into teachers(teacher_uid, first_name, last_name, phone_number, course_uid)
            values (uuid_generate_v4(), $1, $2, $3, $4) returning *
        `, first_name, last_name, phone_number, course_uid)

        res.json(newTeacher)
    } catch (error) {
        res.json(error)
    }
})

app.delete('/deleteUser', async (req, res) => {
    try {
        const { users_uid } = req.body
        const deleteUser = await pg(`
            delete from users where users_uid = $1 returning *
        `, users_uid)
        res.json(deleteUser)
    } catch (error) {
        res.json(error)
    }
})

app.listen(process.env.PORT, () => {
    console.log(`server running on http://${process.env.IPADRESS}:${process.env.PORT}`);
})
