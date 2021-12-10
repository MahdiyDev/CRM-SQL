const pg = require('../../Config/pg')

exports.teacher = async () => {
    const teachers = await pg(`
        select teacher_uid, first_name,
        last_name, phone_number, course_name from teachers
        inner join courses
        on teachers.teacher_course_uid = courses.course_uid
        order by first_name
    `)
    return teachers
}

exports.teacherGroup = async () => {
    const teacherGroups = await pg(`
        select * from teachers
        inner join groups
        on groups.group_teacher_id = teachers.teacher_uid
        order by first_name
    `)
    return teacherGroups
}

exports.user = async (teacherGroups) => {
    const users = await pg(`
    select * from users
    inner join groups 
    on groups.group_id = users.users_group_id
    where group_id = $1
    `, teacherGroups)
    return users
}

exports.teachersCourses = async (teachers) => {
    const teachersCourse = await pg(`
    select group_id, group_name, course_name, course_price from teachers
    inner join courses
    on teachers.teacher_course_uid = courses.course_uid
    inner join groups
    on teachers.teacher_uid = groups.group_teacher_id
    where teacher_uid = $1
    `, teachers)
    return teachersCourse
}

exports.newCreateTeacher = async ({ first_name, last_name, phone_number, teacher_course_uid }) => {
    const newTeacher = await pg(`
        insert into teachers(teacher_uid, first_name, last_name, phone_number, teacher_course_uid)
        values (uuid_generate_v4(), $1, $2, $3, $4) returning *
    `, first_name, last_name, phone_number, teacher_course_uid)

    return newTeacher
}

exports.deleteTeacher = async (teacher_uid) => {
    const deleteTeacher = await pg(`
    delete from teachers where teacher_uid = $1 returning *
    `, teacher_uid)
    return deleteTeacher
}
