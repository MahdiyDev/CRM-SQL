const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '1407',
    database: 'crm'
})

const pg = async (SQL, ...values) => {
    const client = await pool.connect();
    
    try {
        const data = await client.query(SQL, values)
        return data.rows
    } catch (e) {
        console.log(e);
    } finally {
        client.release()
    }
}

module.exports = pg;