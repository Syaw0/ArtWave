import artistModel from "../models/artist";
import config from "../config/dbconfig";
import artworkModel from "../models/artwork";
import artworkVoteModel from "../models/artworkVote";
import artworkCommentModel from "../models/artworkComment";
import { Mongodb } from "./mongodb";

const createModels = () => {
  return {
    artistModel: new Mongodb(
      artistModel.tableName,
      artistModel.databaseName,
      config
    ),
    artworkModel: new Mongodb(
      artworkModel.tableName,
      artworkModel.databaseName,
      config
    ),

    artworkVoteModel: new Mongodb(
      artworkVoteModel.tableName,
      artworkVoteModel.databaseName,
      config
    ),
    artworkCommentModel: new Mongodb(
      artworkCommentModel.tableName,
      artworkCommentModel.databaseName,
      config
    ),
  };
};
const models = createModels();
export default models;

export type OrmType = typeof models;
