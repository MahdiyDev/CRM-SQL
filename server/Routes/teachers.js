const pg = require('../Config/pg')
const express = require('express')
const route = express.Router()

route.get('/', async (req, res) => {
    try {
        const teachers = await pg(`
            select * from teachers
            inner join course
            on teachers.course_uid = course.course_uid
        `)

        res.json(teachers)
    } catch (e) {
        res.json(e)
    }
})

route.post('/', async (req, res) => {
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

route.delete('/', async (req, res) => {
    try {
        const { teacher_uid } = req.body
        const deleteTeacher = await pg(`
            delete from teachers where teacher_uid = $1 returning *
        `, teacher_uid)
        res.json(deleteTeacher)
    } catch (error) {
        res.json(error)
    }
})

module.exports = route;
