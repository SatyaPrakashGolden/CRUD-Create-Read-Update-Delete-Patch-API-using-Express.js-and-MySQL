// const mysql = require("mysql");
// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: process.env.DB_HOST || "localhost", 
//   user: process.env.DB_USER || "root", 
//   password: process.env.DB_PASSWORD || "", 
//   database: process.env.MYSQL_DB || "test", 
//   port: parseInt(process.env.DB_PORT) || 3306, 
// });

// pool.getConnection((err, connection) => {
//   if (err) {
//     console.error("Error connecting to the database:", err.message);
//   } else {
//     console.log("Connected to the database");
//     connection.release(); 
//   }
// });

// module.exports = pool;
const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.MYSQL_DB || "test",
  port: parseInt(process.env.DB_PORT) || 3306,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
    connection.release();
  }
});

module.exports = pool;
