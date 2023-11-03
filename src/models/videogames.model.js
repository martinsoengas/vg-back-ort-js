import { DataTypes, Model } from 'sequelize';
import connection from '../config/connection.js';

class Videogame extends Model {}

Videogame.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    developerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Developers',
        key: 'id',
      },
    },
    averageRating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    ratingCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize: connection,
    modelName: 'Videogame',
  }
);

export default Videogame;
