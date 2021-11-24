const pg = require('../Config/pg')
const express = require('express')
const route = express.Router()

route.get('/', async (req, res) => {
    try {
        const course = await pg ('select * from course')

        res.json(course)
    } catch (e) {
        res.json(e)
    }
})

route.post('/', async (req, res) => {
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

route.delete('/', async (req, res) => {
    try {
        const { course_uid } = req.body
        const deleteCourse = await pg(`
            delete from course where course_uid = $1 returning *
        `, course_uid)
        res.json(deleteCourse)
    } catch (error) {
        res.json(error)
    }
})

module.exports = route;
