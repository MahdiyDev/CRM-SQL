const pg = require('../Config/pg')
const express = require('express')
const route = express.Router()

route.get('/', async (req, res) => {
    try {
        const course = await pg (`select * from course`)
        
        course.length ? res.json(course) : res.json({ message: "course not found" })
    } catch (e) {
        res.json(e)
    }
})

route.post('/', async (req, res) => {
    try {
        const { course_name, course_price } = req.body

        if (course_name && course_price) {
            const newCourse = await pg(`
            insert into course(course_uid, course_name, course_price)
            values (uuid_generate_v4(), $1, $2) returning *
            `, course_name, course_price)

            res.json(newCourse)
        } else {
            res.json({ message: "course not created" })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
})

route.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        if (id) {
            const deleteCourse = await pg(`
            delete from course where course_uid = $1 returning *
            `, id)
            res.json(deleteCourse)
        } else {
            res.json({ message: 'course not deleted' })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
})

module.exports = route;
