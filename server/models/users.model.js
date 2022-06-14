const db = require("../config/db");

function getUsers() {
  const sql = "SELECT * FROM users";
  return new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

function getOneUser(user) {
  console.log(user);
  const sql = "SELECT * FROM users WHERE username = ?";
  return new Promise((resolve, reject) => {
    db.get(sql, user, (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

function userCheck(username) {
  const sql = "SELECT * FROM users WHERE username = ?";

  return new Promise((resolve, reject) => {
    db.get(sql, [username], (error, rows) => {
      if (error) {
        console.log(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

module.exports = {
  getUsers,
  getOneUser,
  userCheck,
};
