import { Pool } from 'pg';

// const db = new Pool({
//   host: process.env.HOST,
//   port: +process.env.PORTDB,
//   database: process.env.DATABASE,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
// });

const db = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'dbDelivery',
  user: 'postgres',
  password: '12345',
});

export default db;
