const { users, newUser, updateUser, deleteUser } = require('./model')

const GET = async (req, res) => {
    try {
        (await users()).length ? res.json(await users()) : res.json({ message: "user not found" })
    } catch (e) {
        res.json({ message: e.message })
    }
}

const POST = async (req, res) => {
    try {
        const {
            first_name, last_name,
            phone_number, users_group_id
        } = req.body
        if (first_name && last_name && phone_number && users_group_id) {
            res.json(await newUser(req.body))
        }
        else {
            res.json({ message: "user not created" })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

const UPDATE = async (req, res) => {
    try {
        const {
            first_name, last_name, 
            phone_number, users_group_id
        } = req.body
        if (first_name && last_name && phone_number && users_group_id) {
            res.json(await updateUser(req.body))
        }
        else {
            res.json({ message: "user not Updated" })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

const DELETE = async (req, res) => {
    try {
        const { users_uid } = req.body
        if (users_uid) {
            res.json(await deleteUser(users_uid))
        }
        else {
            res.json({ message: "user not deleted" })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = {
    GET,
    POST,
    UPDATE,
    DELETE
};
