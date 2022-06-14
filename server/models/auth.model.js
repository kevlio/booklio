const db = require("../config/db");

function addUser(user) {
  const sql =
    "INSERT INTO users(username, activation_code, email, password) VALUES (?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    db.run(
      sql,
      [user.username, user.activationCode, user.email, user.password],
      (error) => {
        if (error) {
          console.error(error.message);
          reject(error);
        }
        resolve();
      }
    );
  });
}

module.exports = {
  addUser,
};
