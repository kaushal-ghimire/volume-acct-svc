import { DataTypes, Model } from "sequelize";
import pgSequelize from "../config/database/pgSequelize";

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
    sequelize: pgSequelize,
    modelName: "customerVolumeUsage",
    tableName: "customer_volume_usage",
    schema: "public",
    timestamps: false,
  }
);

export default customerVolumeUsage;


// import pool from "../config/database";


// export const createUsage = async ({ user_name, remaining_volume }: { user_name: string; remaining_volume: number }
// ) => {
//   const query = `
//     INSERT INTO customer_volume_usage (user_name, remaining_volume, created_at, updated_at)
//     VALUES ($1, $2, NOW(), NOW())
//     RETURNING *;
//   `;
//   const values = [user_name, remaining_volume];
//   const result = await pool.query(query, values);
//   return result.rows[0];
// };

// export const getAllUsage = async () => {
//   const query = 'SELECT * FROM customer_volume_usage ORDER BY id DESC;';
//   const result = await pool.query(query);
//   return result.rows;
// };