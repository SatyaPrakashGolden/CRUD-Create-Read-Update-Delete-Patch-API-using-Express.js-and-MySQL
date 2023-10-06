const pool = require('../../config/db.js');

module.exports = {
  create: (data, callback) => {
    const { first_name, last_name, gender, email, password, number } = data;
    const sql = `INSERT INTO registration (firstName, latName, gender, email, password, number)
                 VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [first_name, last_name, gender, email, password, number];

    pool.query(sql, values, (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  
  getUsers: (callback) => {
    const sql = `SELECT id, firstName, latName, gender, email, number FROM registration`;

    pool.query(sql, (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  getUserByUserId: (id, callBack) => {
    pool.query(
      `select id,firstName,latName,gender,email,number from registration where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from registration where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateUser: (id, data, callback) => {
    const { first_name, last_name, gender, email, password, number } = data;
    const sql = `UPDATE registration SET firstName = ?, latName = ?, gender = ?, email = ?, password = ?, number = ? WHERE id = ?`;
    const values = [first_name, last_name, gender, email, password, number, id];

    pool.query(sql, values, (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  patchUser: (id, data, callback) => {
    const { first_name, last_name, gender, email, number } = data;
    const updateFields = [];
    const values = [];
    if (first_name) {
      updateFields.push('firstName = ?');
      values.push(first_name);
    }
    if (last_name) {
      updateFields.push('latName = ?');
      values.push(last_name);
    }
    if (gender) {
      updateFields.push('gender = ?');
      values.push(gender);
    }
    if (email) {
      updateFields.push('email = ?');
      values.push(email);
    }
    if (number) {
      updateFields.push('number = ?');
      values.push(number);
    }

    if (updateFields.length === 0) {
      return callback(null, { message: 'No fields to update' });
    }

    const sql = `UPDATE registration SET ${updateFields.join(', ')} WHERE id = ?`;
    values.push(id);

    pool.query(sql, values, (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  deleteUser: (id, callback) => {
    pool.query(
      `DELETE FROM registration WHERE id = ?`,
      [id],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  }
};

