const pg = require('../../Config/pg')

exports.users = async () => {
    const users = await pg(`SELECT *
    FROM users
    inner JOIN groups
    ON users.users_group_id = groups.group_id
    inner JOIN courses
    ON groups.group_course_id = courses.course_uid`)
    return users
}

exports.newUser = async ({ first_name, last_name, paid_price, phone_number, users_group_id }) => {
    const newUser = await pg(`
    insert into users(users_uid, first_name, last_name, paid_price, phone_number, users_group_id)
    values (uuid_generate_v4(), $1, $2, $3, $4, $5)
    returning *
    `, first_name, last_name, paid_price, phone_number, users_group_id)
    return newUser
}

exports.updateUser = async ({ first_name, last_name, paid_price, phone_number, users_group_id, users_uid }) => {
    const updatedUser = await pg(`
    update users
    set first_name = $1, last_name = $2, paid_price = $3, phone_number = $4, users_group_id = $5
    where users_uid = $6 
    returning *
    `, first_name, last_name, paid_price, phone_number, users_group_id, users_uid)
    return updatedUser
}

exports.deleteUser = async (users_uid) => {
    const deleteUser = await pg(`
    delete from users where users_uid = $1 returning *
    `, users_uid)
    return deleteUser
}
