const artworkModel = {
  column: {
    artwork_comment_id: {
      type: "varchar(200)",
      allowNull: false,
      primaryKey: true,
    },
    artwork_comment_owner_id: {
      type: "varchar(200)",
      allowNull: false,
    },
    artwork_comment_artwork_id: {
      type: "varchar(200)",
      allowNull: false,
    },
    artwork_comment_text: {
      type: "varchar(1000)",
      allowNull: false,
    },

    artwork_comment_publish_date: {
      type: "date",
      allowNull: false,
    },
    artwork_comment_parent_comment: {
      type: "varchar(300)",
      allowNull: false,
    },
  },
  tableName: "artwork_comment",
  databaseName: "art",
};

export default artworkModel;
