import { createConnection, createPool } from "mariadb";
import { createClient } from "redis";

import dotenv from "dotenv";
import config from "../src/shared/infra/db/config/dbconfig";
import { MongoClient } from "mongodb";
dotenv.config();

const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

export const pool = createPool(config);
export const mariaCon = createConnection(config);

export const redisClient = createClient({
  socket: {
    port: 3232,
    host: "localhost",
  },
  password: REDIS_PASSWORD,
});

export const mongoClient = new MongoClient("mongodb://localhost:3131/");
