import artistModel from "../models/artist";
import { Mariadb } from "./mariadb";
import config from "../config/dbconfig";

const createModels = () => {
  return {
    artistModel: new Mariadb(
      artistModel.tableName,
      artistModel.databaseName,
      config
    ),
  };
};
const models = createModels();
export default models;

export type OrmType = typeof models;
