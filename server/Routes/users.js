const pg = require('../Config/pg')
const express = require('express')
const route = express.Router()

route.get('/', async (req, res) => {
    try {
        const users = await pg(`SELECT *
        FROM users
        inner JOIN groups
        ON users.users_group_id = groups.group_id
        inner JOIN courses
        ON groups.group_course_id = courses.course_uid`)
        
        users.length ? res.json(users) : res.json({ message: "user not found" })
    } catch (e) {
        res.json({ message: e.message })
    }
})

route.post('/', async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            paid_price,
            phone_number,
            users_group_id
        } = req.body
        if (first_name && last_name && phone_number && users_group_id) {
            const newUser = await pg(`
            insert into users(users_uid, first_name, last_name, paid_price, phone_number, users_group_id)
            values (uuid_generate_v4(), $1, $2, $3, $4, $5)
            returning *
            `, first_name, last_name, paid_price, phone_number, users_group_id)
            res.json(newUser)
        }
        else {
            res.json({ message: "user not created" })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
})

route.put('/', async (req, res) => {
    try {
        const {
            users_uid,
            first_name,
            last_name,
            paid_price,
            phone_number,
            users_group_id
        } = req.body

        const updatedUser = await pg(`
            update users
            set first_name = $1, last_name = $2, paid_price = $3, phone_number = $4, users_group_id = $5
            where users_uid = $6 
            returning *
        `, first_name, last_name, paid_price, phone_number, users_group_id, users_uid)

        res.json(updatedUser)
    } catch (error) {
        res.json({ message: 'user not Updated' })
    }
})

route.delete('/', async (req, res) => {
    try {
        const { users_uid } = req.body
        if (users_uid) {
            const deleteUser = await pg(`
            delete from users where users_uid = $1 returning *
            `, users_uid)
            res.json(deleteUser)
        }
        else {
            res.json({ message: "user not deleted" })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
})

module.exports = route;
