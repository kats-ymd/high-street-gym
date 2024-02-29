import mysql from "mysql2/promise"
import * as dotenv from "dotenv"
dotenv.config()

export const db = mysql.createPool({
    // host: "localhost",
    // user: "root",
    // password: "root",
    // database: "high-street-gym"

    // TODO: Revise above using .env file
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})
