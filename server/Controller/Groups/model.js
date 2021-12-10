const pg = require('../../Config/pg')

exports.groups = async () => {
    const groups = await pg(`select * from groups`)
    return groups
}

exports.newGroup = async ({ group_name, group_course_id, group_teacher_id }) => {
    const newGroup = await pg(`
    insert into groups(group_id, group_name, group_course_id, group_teacher_id)
    values (uuid_generate_v4(), $1, $2, $3)
    returning *
    `, group_name, group_course_id, group_teacher_id)
    return newGroup
}
