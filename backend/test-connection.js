const mysql = require('mysql2/promise');
require('dotenv').config();

async function test() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'nigraani_db'
    });
    console.log('✅ Connection Successful!');
    await connection.end();
  } catch (err) {
    console.error('❌ ERROR:', err.code, '-', err.message);
  }
}

test();
