/**
 * Arquivo: config/database.js
 * Descrição: arquivo responsável pelas 'connectionStrings da aplicação: PostgreSQL.
 * Data: 04/03/2020
 * Author: Glaucia Lemos
 */

//  {
// 	"product_name": "Mi Band 7",
// 	"quantity": 1,
// 	"price": 600
// }

const dotenv = require('dotenv');
const { Client } = require('pg')

dotenv.config();

const { env } = process

exports.query = async (q) => {
  const client = new Client({
    user: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    host: env.DATABASE_HOST,
    database: env.DATABASE_NAME,
    port: env.DATABASE_PORT
  })
  client.connect()
  let response;
  try {
    response = await client.query(q)
  } catch(e) {
    response = {}
    console.error(e.stack)
  }
  client.end()
  return response
}



