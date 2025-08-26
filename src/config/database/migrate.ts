import customerVolumeUsage from "../../models/customerVolumeUsage";


export const migrate = async () => {
    try {
        // sync() will create the table if it doesn't exist and alter:true will update the table to match your model without dropping it
        await customerVolumeUsage.sync({ alter: true });
        console.log("Table customer_volume_usage is ready.");
    } catch (err) {
        console.error("Migration failed:", err);
    }
};