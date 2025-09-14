import { DataTypes, Model } from "sequelize";
import pgSequelize from "../config/database/pgSequelize";
import oracleSequelize from "../config/database/oracleSequelize";

class customerVolumeUsage extends Model { }
customerVolumeUsage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    remaining_volume: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: oracleSequelize,
    modelName: "customerVolumeUsage",
    tableName: "customer_volume_usage",
    schema: "ebill",
    timestamps: false,
  }
);

export default customerVolumeUsage;