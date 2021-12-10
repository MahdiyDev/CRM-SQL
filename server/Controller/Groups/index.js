const { groups, newGroup } = require("./model")

const GET = async (req, res) => {
    try {
        (await groups()).length ? res.json(await groups()) : res.json({ message: "groups not found" })
    } catch (e) {
        res.json(e)
    }
}

const POST = async (req, res) => {
    try {
        const { group_name, group_course_id, group_teacher_id } = req.body

        if ( group_name && group_course_id && group_teacher_id ) {
            res.json(await newGroup(req.body))
        } else {
            res.json({ message: 'group not created' })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = {
    GET,
    POST
}
