const pg = require('../Config/pg')
const express = require('express')
const route = express.Router()

route.get('/', async (req, res) => {
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

route.post('/', async (req, res) => {
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

route.delete('/', async (req, res) => {
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

module.exports = route;
