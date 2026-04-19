const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function seed() {
  // 1. Initial connection (without database selected)
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  });

  console.log('🔗 Connected to MySQL server...');

  try {
    // 2. Create the Database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'nigraani_db'}`);
    console.log(`✅ Database "${process.env.DB_NAME || 'nigraani_db'}" created or already exists.`);

    // 3. Switch to the database
    await connection.query(`USE ${process.env.DB_NAME || 'nigraani_db'}`);

    // 4. Read and run the SQL script
    const sqlPath = path.join(__dirname, '..', 'scripts', 'setup_db.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Split by semicolon but preserve those inside quotes/functions if possible 
    // (Simple split is usually enough for standard DDL)
    // Note: This simple split works for your setup_db.sql structure.
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    console.log('🏗️  Creating tables...');
    for (const statement of statements) {
      await connection.query(statement);
    }

    console.log('🎉 SUCCESS: All tables created and initial data seeded!');
  } catch (err) {
    console.error('❌ FAILED:', err.message);
  } finally {
    await connection.end();
  }
}

seed();
