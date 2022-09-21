const Pool = require("pg").Pool;
require("dotenv").config();

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const proConfig = process.env.DATABASE_URL; //heroku addons

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production" ? proConfig : devConfig,
    ssl: process.env.NODE_ENV === "production" ? {
      rejectUnauthorized: false,
    } : false,
});

const query = async (q) => {
  const client = await pool.connect()
  let response;
  try {
    response = await client.query(q)
  } catch(e) {
    response = {}
    console.error(e.stack)
  }
  client.release()
  return response
}

module.exports = {query};
