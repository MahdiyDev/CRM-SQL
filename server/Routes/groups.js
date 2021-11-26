const pg = require('../Config/pg')
const express = require('express')
const route = express.Router()

route.get('/', async (req, res) => {
    try {
        const groups = await pg(`select * from groups`)

        groups.length ? res.json(groups) : res.json({ message: "groups not found" })
    } catch (e) {
        res.json(e)
    }
})

route.post('/', async (req, res) => {
    try {
        const { group_name, group_course_id, group_teacher_id } = req.body

        if ( group_name && group_course_id && group_teacher_id ) {
            const newGroup = await pg(`
            insert into groups(group_id, group_name, group_course_id, group_teacher_id)
            values (uuid_generate_v4(), $1, $2, $3)
            returning *
            `, group_name, group_course_id, group_teacher_id)

            res.json(newGroup)
        } else {
            res.json({ message: 'group not created' })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
})

module.exports = route;
