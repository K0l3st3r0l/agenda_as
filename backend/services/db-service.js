const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

// Create database path
const dbPath = path.join(__dirname, '../db/agenda.db');

// Connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    createTables();
  }
});

// Create tables
function createTables() {
  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Clients table
  db.run(`
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Cars table
  db.run(`
    CREATE TABLE IF NOT EXISTS cars (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id INTEGER,
      make TEXT NOT NULL,
      model TEXT NOT NULL,
      year INTEGER,
      license_plate TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (client_id) REFERENCES clients (id)
    )
  `);

  // Jobs table
  db.run(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id INTEGER,
      car_id INTEGER,
      description TEXT NOT NULL,
      scheduled_date DATETIME,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (client_id) REFERENCES clients (id),
      FOREIGN KEY (car_id) REFERENCES cars (id)
    )
  `);

  console.log('Tables created or already exist.');
  createDefaultAdmin();
}

// Create default admin user
async function createDefaultAdmin() {
  const adminExists = await new Promise((resolve, reject) => {
    db.get('SELECT id FROM users WHERE username = ?', ['admin'], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    db.run(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      ['admin', 'admin@agenda.com', hashedPassword, 'admin'],
      function(err) {
        if (err) {
          console.error('Error creating admin user:', err);
        } else {
          console.log('Admin user created successfully');
        }
      }
    );
  }
}

module.exports = db;