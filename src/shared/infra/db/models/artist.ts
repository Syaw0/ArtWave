import { v4 as uuid } from "uuid";
const artistModel = {
  column: {
    artist_id: {
      type: "varchar(200)",
      // defaultValue: uuid(),
      allowNull: false,
      primaryKey: true,
    },

    artist_email: {
      type: "varchar(260)",
      allowNull: false,
      unique: true,
    },
    artist_name: {
      type: "varchar(40)",
      allowNull: false,
    },

    artist_biography: {
      type: "varchar(120)",
      allowNull: false,
    },
    artist_profile_picture: {
      type: "varchar(300)",
      allowNull: false,
      defaultValue: "",
    },

    artist_password: {
      type: "char(64)", //sha256
      allowNull: false,
    },
    artist_is_email_verified: {
      type: "Boolean",
      allowNull: false,
      defaultValue: "0",
    },
  },
  tableName: "artist",
  databaseName: "art",
};

export default artistModel;
