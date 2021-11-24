const pg = require('../Config/pg')
const express = require('express')
const route = express.Router()

route.get('/', async (req, res) => {
    try {
        const groups = await pg(`select * from groups`)

        res.json(groups)
    } catch (e) {
        res.json(e)
    }
})

route.post('/', async (req, res) => {
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

module.exports = route;
