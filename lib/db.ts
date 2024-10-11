import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db: any = null;

async function openDb() {
  if (!db) {
    db = await open({
      filename: './mydb.sqlite',
      driver: sqlite3.Database
    });
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        role TEXT
      )
    `);
  }
  return db;
}

export async function getUsers() {
  const db = await openDb();
  return db.all('SELECT * FROM users');
}

export async function getUserById(id: number) {
  const db = await openDb();
  return db.get('SELECT * FROM users WHERE id = ?', id);
}

export async function createUser(user: { name: string; email: string; role: string }) {
  const db = await openDb();
  const result = await db.run(
    'INSERT INTO users (name, email, role) VALUES (?, ?, ?)',
    user.name, user.email, user.role
  );
  return { id: result.lastID, ...user };
}

export async function updateUser(id: number, user: { name: string; email: string; role: string }) {
  const db = await openDb();
  await db.run(
    'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?',
    user.name, user.email, user.role, id
  );
  return { id, ...user };
}

export async function deleteUser(id: number) {
  const db = await openDb();
  await db.run('DELETE FROM users WHERE id = ?', id);
}