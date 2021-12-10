const pg = require('../../Config/pg')
const { teacher, teacherGroup, user, teachersCourses, newCreateTeacher, deleteTeacher } = require('./model')

const GET = async (req, res) => {
    try {
        let arr = []
        let groupArr = []
        let salary = []
        let grNum = 0
        let grArr = []

        const teachers = await teacher()
        const teacherGroups = await teacherGroup()
        
        for (let a = 0; a < teacherGroups.length; a++) {
            const users = await user(teacherGroups[a].group_id)
            grArr.push(users.length);
        }
        
        for (let i = 0; i < teachers.length; i++) {
            const teachersCourse = await teachersCourses(teachers[i].teacher_uid)
            
            groupArr.push({
                teachers: teachers[i],
                groupArr: teachersCourse,
            });
            
            let num = 0
            
            groupArr[i].groupArr.forEach((e) => {
                num = num + (parseInt(e.course_price) * grArr[grNum])
                grNum++
            })

            salary.push({  
                salary: num * 0.6
            });

            arr.push({
                ...groupArr[i].teachers,
                salary: salary[i].salary,
                groupArr: groupArr[i].groupArr
            });
        }

        groupArr.length ? 
        res.json(arr)
        : res.json({ message: "teachers not found" })
    } catch (e) {
        res.json(e)
    }
}

const POST = async (req, res) => {
    try {
        const { first_name, last_name, phone_number, teacher_course_uid } = req.body

        if ( first_name, last_name, phone_number, teacher_course_uid ) {            
            res.json( await newCreateTeacher(req.body) )
        } else {
            res.json({ message: "teacher not created" })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

const DELETE = async (req, res) => {
    try {
        const { teacher_uid } = req.body
        if (teacher_uid) {
            res.json( await deleteTeacher(teacher_uid) )
        } else {
            res.json({ message: "teacher not deleted" })
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = {
    GET,
    POST,
    DELETE
};
