import mysql from 'mysql2'
const pool = mysql.createPool({
  host: process.env.MYSQL,
  user: 'root',
  password: '',
  database: 'hr_tz_areal',
  charset: 'utf8mb4'
}).promise()

export async function getSotrudniki(otdel = '', position = '') {
    let query = "select s.*, o.name as o_name, p.name as p_name from sotrudniki s join otdels o on s.otdel_id = o.id join positions p on s.position_id = p.id";
    let condit = [];
    let params = [];
    
    if (otdel != '') {
        condit.push('o.name = ?');
        params.push(otdel);
    } 
    if (position != '') {
        condit.push('p.name = ?');
        params.push(position);
    }
    if (condit.length > 0) {
        query += ' where ' + condit.join(' and ');
    }
    query += ' order by s.last_name';
    const [rows] = await pool.query(query, params)
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
