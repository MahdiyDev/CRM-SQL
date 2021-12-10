const { course, newCourse, deleteCourse } = require("./model")

const GET = async (req, res) => {
    try {
        (await course()).length ? res.json(await course()) : res.json({ message: "course not found" })
    } catch (e) {
        res.json(e)
    }
}

const POST = async (req, res) => {
    try {
        const { course_name, course_price } = req.body

        if (course_name && course_price) {
            res.json(await newCourse(req.body))
        } else {
            res.json({ message: "course not created" })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

const DELETE = async (req, res) => {
    try {
        const { id } = req.params
        if (id) {
            res.json(await deleteCourse(id))
        } else {
            res.json({ message: 'course not deleted' })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = {
    GET,
    POST,
    DELETE
}
