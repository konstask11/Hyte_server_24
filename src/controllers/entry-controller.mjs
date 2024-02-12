import promisePool from '../utils/database.mjs';

const listAllEntries = async () => {
  try {
    const [rows] = await promisePool.query('SELECT user_id, entry_date, mood, weight, sleep_hours, notes FROM DiaryEntries');
    console.log('rows', rows);
    return rows;
  } catch (error) {
    console.error('error', error);
    return {error: "Something is wrong"};
  }
};

const findEntryById = async (id) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM DiaryEntries WHERE entry_id=?', [id]);
    console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const addEntry = async (entry) => {
  const {user_id, entry_date, mood, weight, sleep_hours, notes} = entry;
  const sql = `INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [user_id, entry_date, mood, weight, sleep_hours, notes];
  try {
    const rows = await promisePool.query(sql, params);
    console.log('rows', rows);
    return {entry_id: rows[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};
const updateEntryById = async (entry) => {
    try {
        const sql = 'UPDATE DiaryEntries SET entry_date=?, mood=?, weight=?, sleep_hours=?, notes=? WHERE user_id=?';
        const params = [entry.entry_date, entry.mood, entry.weight, entry.sleep_hours, entry.notes, entry.user_id];
        const [result] = await promisePool.query(sql,params);
        console.log(result);
        return {message: 'entry data updated', user_id: entry.user_id};
    } catch (error) {
        console.error('updatedEntryById', error);
        return {error: 500, message: 'db error'};
    }
};
const deleteEntryById = async(id) => {
    try {
        const sql = 'DELETE FROM DiaryEntries WHERE user_id=?';
        const params = [id];
        const [result] = await promisePool.query(sql, params);
        console.log(result);
        if(result.affectedRows === 0) {
            return {error: 404, message: 'entry not found'};
        }
        return {message: 'entry deleted', entry_id: id};
    } catch (error) {
        console.error('deleteEntryById', error);
        return {error: 500, message: 'db error'};
    }
};
export {listAllEntries, findEntryById, addEntry, updateEntryById, deleteEntryById};
