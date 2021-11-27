const pg = require('../Config/pg')
const express = require('express')
const route = express.Router()

route.get('/', async (req, res) => {
    try {
        const teachers = await pg(`
            select * from teachers
            inner join courses
            on teachers.teacher_course_uid = courses.course_uid
        `)

        teachers.length ? res.json(teachers) : res.json({ message: "teachers not found" })
    } catch (e) {
        res.json(e)
    }
})

route.post('/', async (req, res) => {
    try {
        const { first_name, last_name, phone_number, teacher_course_uid } = req.body

        if ( first_name, last_name, phone_number, teacher_course_uid ) {
            const newTeacher = await pg(`
            insert into teachers(teacher_uid, first_name, last_name, phone_number, teacher_course_uid)
            values (uuid_generate_v4(), $1, $2, $3, $4) returning *
            `, first_name, last_name, phone_number, teacher_course_uid)

            res.json(newTeacher)
        } else {
            res.json({ message: "teacher not created" })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
})

route.delete('/', async (req, res) => {
    try {
        const { teacher_uid } = req.body
        if (teacher_uid) {
            const deleteTeacher = await pg(`
            delete from teachers where teacher_uid = $1 returning *
            `, teacher_uid)
            res.json(deleteTeacher)
        } else {
            res.json({ message: "teacher not deleted" })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
})

module.exports = route;
