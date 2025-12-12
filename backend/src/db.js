import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "modex_booking",
  password: "root",
  port: 5432,
});

export default pool;
