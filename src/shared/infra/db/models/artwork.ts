const artworkModel = {
  column: {
    artwork_id: {
      type: "varchar(200)",
      allowNull: false,
      primaryKey: true,
    },
    artwork_owner_id: {
      type: "varchar(200)",
      allowNull: false,
    },
    artwork_description: {
      type: "varchar(1000)",
      allowNull: false,
      defaultValue: "",
    },

    artwork_publish_date: {
      type: "date",
      allowNull: false,
    },
    artwork_image_source: {
      type: "varchar(300)",
      allowNull: false,
      defaultValue: "",
    },
  },
  tableName: "artwork",
  databaseName: "art",
};

export default artworkModel;
