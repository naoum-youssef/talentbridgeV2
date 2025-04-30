const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || "mongodb+srv://youssefnaoum:$123456@talentbridge.mmpshgs.mongodb.net/?retryWrites=true&w=majority&appName=talentbridge";
        console.log("URI utilisée:", mongoURI);
        const conn = await mongoose.connect(mongoURI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Erreur de connexion à MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;