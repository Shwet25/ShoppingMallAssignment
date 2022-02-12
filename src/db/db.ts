const { Pool } = require('pg')
import logger from "../logger/logger"


const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  database: 'shoppingmall',
  host: 'localhost',
  port: '5432',
  min_pool_size: 5,
  reserve_pool_size: 5,
  server_idle_timeout: 300,
  idle_transaction_timeout: 300,
  max_client_conn: 10
})


async function query(queryText: String) {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const res = await client.query(queryText);
    await client.query('COMMIT')
    return res;
  } catch (e) {
    await client.query('ROLLBACK')
    logger.error(e)
  } finally {
    client.release()
  }
}




// import { env } from "process";

// const Pool = require('pg').Pool

// // const pool = new Pool({
// //   user: env.DB_USER || 'postgres',
// //   password: env.DB_PASSWORD || 'postgres',
// //   database: env.DB_NAME || 'config',
// //   host: env.DB_HOST || 'localhost',
// //   port: env.DB_PORT || '5432'
// // })





// // const client =pool.connect();



export default query;

