import { mongoClient, pool } from "./dbConnectors";
import artistModel from "../src/shared/infra/db/models/artist";
import artworkModel from "../src/shared/infra/db/models/artwork";
import artworkVoteModel from "../src/shared/infra/db/models/artworkVote";
import artworkCommentModel from "../src/shared/infra/db/models/artworkComment";

const prepareArtistModel = async () => {
  const con = await pool.getConnection();
  try {
    console.log(
      `creating ${artistModel.databaseName} database for artist model ⚡️ `
    );
    await con.query(`create database ${artistModel.databaseName}`);
    console.log("successful ✅");
  } catch (err: any) {
    console.log("error ❌ : ", err.text);
  }

  const cols = Object.keys(artistModel.column).map((k: any) => {
    const columns: any = artistModel.column;
    const name = k;
    const type = columns[k].type;
    const allowNull = columns[k].allowNull;
    const defaultValue = columns[k].defaultValue;
    const primaryKey = columns[k].primaryKey;
    const unique = columns[k].unique;

    return `${name} ${type} ${allowNull ? "" : "not null"} ${
      defaultValue == null ? "" : `default("${defaultValue}")`
    } ${!primaryKey ? "" : "PRIMARY KEY"} ${!unique ? "" : "UNIQUE"} `;
  });
  const createTableQuery = `(${cols.join(",")})`;
  try {
    console.log(
      `creating ${artistModel.tableName} table for artist model ⚡️ `
    );
    await con.query(
      `create table ${artistModel.databaseName}.${artistModel.tableName} ${createTableQuery} `
    );
    console.log("successful ✅");
  } catch (err: any) {
    console.log("error ❌ : ", err.text);
  }
  await con.end();
};

const prepareArtworkModel = async () => {
  const con = await pool.getConnection();
  try {
    console.log(
      `creating ${artworkModel.databaseName} database for artist model ⚡️ `
    );
    await con.query(`create database ${artworkModel.databaseName}`);
    console.log("successful ✅");
  } catch (err: any) {
    console.log("error ❌ : ", err.text);
  }

  const cols = Object.keys(artworkModel.column).map((k: any) => {
    const columns: any = artworkModel.column;
    const name = k;
    const type = columns[k].type;
    const allowNull = columns[k].allowNull;
    const defaultValue = columns[k].defaultValue;
    const primaryKey = columns[k].primaryKey;
    const unique = columns[k].unique;

    return `${name} ${type} ${allowNull ? "" : "not null"} ${
      defaultValue == null ? "" : `default("${defaultValue}")`
    } ${!primaryKey ? "" : "PRIMARY KEY"} ${!unique ? "" : "UNIQUE"} `;
  });
  const createTableQuery = `(${cols.join(",")})`;
  try {
    console.log(
      `creating ${artworkModel.tableName} table for artist model ⚡️ `
    );
    await con.query(
      `create table ${artworkModel.databaseName}.${artworkModel.tableName} ${createTableQuery} `
    );
    console.log("successful ✅");
  } catch (err: any) {
    console.log("error ❌ : ", err.text);
  }
  await con.end();
};

const prepareArtworkVoteModel = async () => {
  const con = await pool.getConnection();
  try {
    console.log(
      `creating ${artworkVoteModel.databaseName} database for artist model ⚡️ `
    );
    await con.query(`create database ${artworkVoteModel.databaseName}`);
    console.log("successful ✅");
  } catch (err: any) {
    console.log("error ❌ : ", err.text);
  }

  const cols = Object.keys(artworkVoteModel.column).map((k: any) => {
    const columns: any = artworkVoteModel.column;
    const name = k;
    const type = columns[k].type;
    const allowNull = columns[k].allowNull;
    const defaultValue = columns[k].defaultValue;
    const primaryKey = columns[k].primaryKey;
    const unique = columns[k].unique;

    return `${name} ${type} ${allowNull ? "" : "not null"} ${
      defaultValue == null ? "" : `default("${defaultValue}")`
    } ${!primaryKey ? "" : "PRIMARY KEY"} ${!unique ? "" : "UNIQUE"} `;
  });
  const createTableQuery = `(${cols.join(",")})`;
  try {
    console.log(
      `creating ${artworkVoteModel.tableName} table for artist model ⚡️ `
    );
    await con.query(
      `create table ${artworkVoteModel.databaseName}.${artworkVoteModel.tableName} ${createTableQuery} `
    );
    console.log("successful ✅");
  } catch (err: any) {
    console.log("error ❌ : ", err.text);
  }
  await con.end();
};

const prepareArtworkCommentModel = async () => {
  const con = await pool.getConnection();
  try {
    console.log(
      `creating ${artworkCommentModel.databaseName} database for artist model ⚡️ `
    );
    await con.query(`create database ${artworkCommentModel.databaseName}`);
    console.log("successful ✅");
  } catch (err: any) {
    console.log("error ❌ : ", err.text);
  }

  const cols = Object.keys(artworkCommentModel.column).map((k: any) => {
    const columns: any = artworkCommentModel.column;
    const name = k;
    const type = columns[k].type;
    const allowNull = columns[k].allowNull;
    const defaultValue = columns[k].defaultValue;
    const primaryKey = columns[k].primaryKey;
    const unique = columns[k].unique;

    return `${name} ${type} ${allowNull ? "" : "not null"} ${
      defaultValue == null ? "" : `default("${defaultValue}")`
    } ${!primaryKey ? "" : "PRIMARY KEY"} ${!unique ? "" : "UNIQUE"} `;
  });
  const createTableQuery = `(${cols.join(",")})`;
  try {
    console.log(
      `creating ${artworkCommentModel.tableName} table for artist model ⚡️ `
    );
    await con.query(
      `create table ${artworkCommentModel.databaseName}.${artworkCommentModel.tableName} ${createTableQuery} `
    );
    console.log("successful ✅");
  } catch (err: any) {
    console.log("error ❌ : ", err.text);
  }
  await con.end();
};

const prepareDbBase = async () => {
  // await prepareArtistModel();
  // await prepareArtworkModel();
  // await prepareArtworkVoteModel();
  // await prepareArtworkCommentModel();
  process.exit();
};

export default prepareDbBase;
