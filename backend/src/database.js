import mysql from "mysql2/promise"

export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "high-street-gym"

    // TODO: Revise above using .env file
})