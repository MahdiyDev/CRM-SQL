const pg = require('../../Config/pg')

exports.course = async () => {
    const course = await pg (`select * from courses`)
    return course
}

exports.newCourse = async ({ course_name, course_price }) => {
    const newCourse = await pg(`
    insert into courses(course_uid, course_name, course_price)
    values (uuid_generate_v4(), $1, $2) returning *
    `, course_name, course_price)
    return newCourse
}

exports.deleteCourse = async (id) => {
    const deleteCourse = await pg(`
    delete from courses where course_uid = $1 returning *
    `, id)
    return deleteCourse
}
