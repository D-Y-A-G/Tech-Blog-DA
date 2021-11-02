const { Sequelize, Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Blogpost extends Model {}

Blogpost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    blog_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    post_date: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    blog_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "blogpost",
  }
);

module.exports = Blogpost;
