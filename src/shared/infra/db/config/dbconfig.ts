import { ConnectionConfig, PoolConfig } from "mariadb";
import dotenv from "dotenv";

dotenv.config();

const MARIADB_PASSWORD = process.env.MARIADB_PASSWORD;
const MARIADB_USER = process.env.MARIADB_USER;

const config: PoolConfig | ConnectionConfig = {
  user: MARIADB_USER,
  password: MARIADB_PASSWORD,
  // database: "art",
  port: 3030,
  host: "localhost",
};

export default config;
