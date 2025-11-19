import mysql from 'mysql2'
const pool = mysql.createPool({
  host: process.env.MYSQL,
  user: 'root',
  password: '',
  database: 'hr_tz_areal',
  charset: 'utf8mb4'
}).promise()

export async function getSotrudniki() {
    let query = "select * from sotrudniki";
    const [rows] = await pool.query(query)
    return rows
}

export async function getOtdels() {
    const [rows] = await pool.query('select * from otdels;');
    return rows
}

export async function getPos() {
    const [rows] = await pool.query('select * from positions;');
    return rows
}
