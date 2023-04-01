import { pool } from "./dbConnectors";
import artistModel from "../src/shared/infra/db/models/artist";

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
};

const prepareDbBase = async () => {
  await prepareArtistModel();
  process.exit();
};

export default prepareDbBase;
