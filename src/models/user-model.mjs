import promisePool from '../utils/database.mjs';

const listAllUsers = async () => {
  try {
    const sql = 'SELECT user_id, username, user_level FROM Users';
    const [rows] = await promisePool.query(sql);
    //console.log(rows);
    return rows;
  } catch (error) {
    console.error('listAllUsers', error);
    return {error: 500, message: 'db error'};
  }
};


const selectUserById = async (id) => {
    try {
      const sql = 'SELECT * FROM Users WHERE user_id=?';
      const params = [id];
      const [rows] = await promisePool.query(sql, params);
      //console.log(rows);
      // if nothing is found with the user id, result array is empty []
      if (rows.length === 0) {
        return {error: 404, message: 'user not found'};
      }
      // Remove password property from result
      delete rows[0].password;
      return rows[0];
    } catch (error) {
      console.error('listAllUsers', error);
      return {error: 500, message: 'db error'};
    }
  };


  const insertUser = async (user) => {
    try {
      const sql = 'INSERT INTO Users (username, password, email) VALUES (?, ?, ?)';
      const params = [user.username, user.password, user.email];
      const [result] = await promisePool.query(sql, params);
    //console.log(result);

      return {message: 'new user crated', user_id: result.insertId};
    } catch (error) {
      console.error('insertUser', error);
      return {error: 500, message: 'db error'};
    }
  };

  const updateUserById = async (user) => {
    try {
        const sql = 'UPDATE Users SET username=? , password=?, email=? WHERE user_id=?';
        const params = [user.username, user.password, user.email, user.user_id];
        const [result] = await promisePool.query(sql, params);
      //console.log(result);

        return {message: 'user data updated', user_id: result.updateUserById};
      } catch (error) {
        console.error('updateUserById', error);
        return {error: 500, message: 'db error'};
      }
  };

  const deleteUserById = async (id) => {
    try {
        const sql = 'DELETE FROM  Users WHERE user_id=?';
        const params = [id];
        const [result] = await promisePool.query(sql, params);
      //console.log(result);
      if (result.affectedRows === 0) {
        return {error: 404, message: 'user not found'};
      }

        return {message: 'user deleted', user_id: Id};
      } catch (error) {
        console.error('updateUserById', error);
        return {error: 500, message: 'db error'};
      }
  };

export {listAllUsers, selectUserById, insertUser, updateUserById, deleteUserById};
