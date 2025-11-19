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
getSotrudniki().then(resulr=>{console.log(resulr)});