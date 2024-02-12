import pool from '../utils/database.mjs';

class EntryModel {
  static getAllEntries() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM entries', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static getEntryById(id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM entries WHERE id = ?', [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  static updateEntryById(id, updatedEntry) {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE entries SET title = ?, content = ? WHERE id = ?', [updatedEntry.title, updatedEntry.content, id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static deleteEntryById(id) {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM entries WHERE id = ?', [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}

export default EntryModel;
