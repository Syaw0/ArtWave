import artistModel from "../models/artist";
import { Mariadb } from "./mariadb";
import config from "../config/dbconfig";
import artworkModel from "../models/artwork";
import artworkVoteModel from "../models/artworkVote";
import artworkCommentModel from "../models/artworkComment";

const createModels = () => {
  return {
    artistModel: new Mariadb(
      artistModel.tableName,
      artistModel.databaseName,
      config
    ),
    artworkModel: new Mariadb(
      artworkModel.tableName,
      artworkModel.databaseName,
      config
    ),

    artworkVoteModel: new Mariadb(
      artworkVoteModel.tableName,
      artworkVoteModel.databaseName,
      config
    ),
    artworkCommentModel: new Mariadb(
      artworkCommentModel.tableName,
      artworkCommentModel.databaseName,
      config
    ),
  };
};
const models = createModels();
export default models;

export type OrmType = typeof models;
