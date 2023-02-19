// mongodb is a document database with scalability and flexibitly that you want with the querying and indexing that you need
// mysql is also a database management system

import mysql from "mysql"

export const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Lamadev123",
    database:"blog"
})