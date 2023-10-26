// COMMANDE : npx sequelize-cli model:generate --name Reservation --attributes date:date,name:string,note:string,status:integer,userId:integer,spotId:integer,roomId:integer

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reservation.init({
    date: DataTypes.DATE,
    name: DataTypes.STRING,
    note: DataTypes.STRING,
    status: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    spotId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};