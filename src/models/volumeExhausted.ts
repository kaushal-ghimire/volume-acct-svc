// models/VolumeExhausted.ts
import { DataTypes } from "sequelize";
import oracleSequelize from "../config/database/oracleSequelize";

const VolumeExhausted = oracleSequelize.define("VolumeExhausted", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    user_name: {
        type: DataTypes.STRING
    },
    insert_date: {
        type: DataTypes.DATE
    }
}, {
    tableName: "VOLUME_EXHAUSTED",
    schema: "EBILL",   // adjust if needed
    timestamps: false
});

export default VolumeExhausted;
