import { Pool } from 'pg';

// const db = new Pool({
//   host: process.env.HOST,
//   port: +process.env.PORTDB,
//   database: process.env.DATABASE,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
// });
/*
const db = new Pool({
  host: 'ec2-3-230-238-86.compute-1.amazonaws.com',
  port: 5432,
  database: 'd9dmtfaqasu48s',
  user: 'lipzvdhtieiiim',
  password: '89321d78d7d0dfa64f7bc11498413f74bccb1b3c18b436a1dc66919ffe65bdc6',
  ssl: {
     rejectUnauthorized: false
     }
});
/*
const db = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'appdomicilio',
  user: 'postgres',
  password: '12345',
});
*/
const db = new Pool({
  host: 'ec2-3-230-238-86.compute-1.amazonaws.com',
  port: 5432,
  database: 'd9dmtfaqasu48s',
  user: 'lipzvdhtieiiim',
  password: '89321d78d7d0dfa64f7bc11498413f74bccb1b3c18b436a1dc66919ffe65bdc6',
  ssl: {
    rejectUnauthorized: false
  }
  });

export default db;
