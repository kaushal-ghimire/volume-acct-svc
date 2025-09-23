// models/CustomerEbill.ts
import { DataTypes, Model, Optional } from "sequelize";
import oracleSequelize from "../config/database/oracleSequelize";

interface CustomerEbillAttributes {
    user_name: string;
    dur_min_left: number | null;
}

interface CustomerEbillCreation extends Optional<CustomerEbillAttributes, "dur_min_left"> { }

class CustomerEbill extends Model<CustomerEbillAttributes, CustomerEbillCreation>
    implements CustomerEbillAttributes {
    public user_name!: string;
    public dur_min_left!: number | null;
}

CustomerEbill.init(
    {
        user_name: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        dur_min_left: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        sequelize: oracleSequelize,
        tableName: "CUSTOMER_EBILL",
        schema: "EBILL",
        timestamps: false
    }
);

export default CustomerEbill;
