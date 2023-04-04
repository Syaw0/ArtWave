const artworkVoteModel = {
  column: {
    artwork_vote_id: {
      type: "varchar(200)",
      allowNull: false,
      primaryKey: true,
    },
    artwork_vote_artist_id: {
      type: "varchar(200)",
      allowNull: false,
    },
  },
  tableName: "artwork_vote",
  databaseName: "art",
};

export default artworkVoteModel;
