import mysql from "mysql2/promise"
import * as dotenv from "dotenv"
dotenv.config()

export const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})


// if .env file is placed under app root folder,
// it works for app but does not work for model function only test
// if placed under backend folder,
// it works for model function only test but does not for app
//
// >>> looks like it depends on what directory you are in
// >>> if running model functions, move to backend directory
