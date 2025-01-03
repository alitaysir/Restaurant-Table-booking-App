import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("Database connected");
        });

        mongoose.connection.on('error', (error) => {
            console.error("Database connection error:", error);
        });

        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.error("Failed to connect to database:", error);
        process.exit(1);
    }
};

export default connectDB;
