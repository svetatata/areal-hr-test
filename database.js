import mysql from 'mysql2'
const pool = mysql.createPool({
  host: process.env.MYSQL,
  user: 'root',
  password: '',
  database: 'hr_tz_areal',
  charset: 'utf8mb4'
}).promise()

export async function getSotrudniki(otdel = '', position = '', searchQ = '') {
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
    if (searchQ != '') {
        condit.push('(s.last_name LIKE ? OR s.first_name LIKE ? OR s.middle_name LIKE ?)');
        const searchP = '%' + searchQ + '%';
        params.push(searchP, searchP, searchP);
    }
    if (condit.length > 0) {
        query += ' where ' + condit.join(' and ');
    }
    query += ' order by s.last_name';
    const [rows] = await pool.query(query, params)
    return rows
}
export async function createSotrudnik(
    last_name,
    first_name,
    middle_name,
    birth,
    passport,
    phone,
    address,
    otdel_id,
    position_id,
    salary,
    date_priema
) {
    let query = 'insert into sotrudniki (last_name, first_name, middle_name, birth, passport, phone, address, otdel_id, position_id, salary, date_priema) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const [res] = await pool.query(query, [
    last_name, first_name, middle_name, birth, passport,
    phone, address, otdel_id, position_id, salary, date_priema
    ])
    return res
}
export async function updateSotrudnik(
    id,
    last_name,
    first_name,
    middle_name,
    birth,
    passport,
    phone,
    address,
    otdel_id,
    position_id,
    salary,
    date_priema
) {
    let query = 'update sotrudniki set last_name = ?, first_name = ?, middle_name = ?, birth = ?, passport = ?, phone = ?, address = ?, otdel_id = ?, position_id = ?, salary = ?, date_priema = ? where id = ?';
    const [res] = await pool.query(query, [
        last_name, first_name, middle_name, birth, passport, phone, address, otdel_id, position_id, salary, date_priema, id
    ])
    return res
}
export async function getOtdels() {
    const [rows] = await pool.query('select * from otdels;');
    return rows
}

export async function getPos() {
    const [rows] = await pool.query('select * from positions;');
    return rows
}
