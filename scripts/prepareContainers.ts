import { execSync } from "child_process";
import dotenv from "dotenv";

dotenv.config();

const MARIADB_PASSWORD = process.env.MARIADB_PASSWORD;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MARIADB_USER = process.env.MARIADB_USER;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const MARIADB_CONTAINER_NAME = "Maria";
const REDIS_CONTAINER_NAME = "Redis";
const MONGODB_CONTAINER_NAME = "mongodb";

const prepareRedisDBContainer = () => {
  console.log("initial the Redis DB container");
  execSync(
    `docker run -d -p 3232:6379 --rm --name=${REDIS_CONTAINER_NAME} -e REDIS_PASSWORD=${REDIS_PASSWORD} redis:latest`
  );
  console.log("Created ✅");
};

const prepareMariaDBContainer = () => {
  console.log("initial the mariadb container");
  execSync(
    `docker run -d -p 3030:3306 --rm --name=${MARIADB_CONTAINER_NAME} -e MARIADB_ROOT_PASSWORD=${MARIADB_PASSWORD} mariadb:latest`
  );
  console.log("Created ✅");
};

const prepareMongoDBContainer = () => {
  console.log("initial the mongodb container");
  execSync(
    `docker run -d -p 3131:27017 --rm --name=${MONGODB_CONTAINER_NAME}  mongodb/mongodb-community-server:latest`
  );
  console.log("Created ✅");
};

const stopContainerCmd = (name: string) => {
  return `docker stop ${name} && docker rm ${name}`;
};

const killContainers = () => {
  try {
    execSync(stopContainerCmd(MARIADB_CONTAINER_NAME));
  } catch (err) {}
  try {
    execSync(stopContainerCmd(REDIS_CONTAINER_NAME));
  } catch (err) {}
};

const initialDbContainer = async () => {
  console.log("start operation");
  try {
    console.log("Stop and Remove redis db container");
    execSync(stopContainerCmd(REDIS_CONTAINER_NAME));
  } catch (err) {}
  try {
    console.log("Stop and Remove mariadb db container");
    execSync(stopContainerCmd(MARIADB_CONTAINER_NAME));
  } catch (err) {}

  try {
    console.log("Stop and Remove mongodb db container");
    execSync(stopContainerCmd(MONGODB_CONTAINER_NAME));
  } catch (err) {}
  prepareRedisDBContainer();
  // prepareMariaDBContainer();
  prepareMongoDBContainer();
  return { killContainers };
};

export default initialDbContainer;
