const { Pool } = require("pg");
const pool = new Pool();

//Spins up a connection to the Postgres database

module.exports ={
    query: (text, params) => pool.query(text,params)
}